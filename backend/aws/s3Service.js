const { S3 } = require("./configSDK");

class s3Service {

    retrieveGetSignedURL = (key) => {
        const params = { Bucket: process.env.S3_BUCKET, Key: key, Expires: 60 * 5 }
        const url = S3.getSignedUrl('getObject', params)
        return url
    }

    retrievePutSignedURL = (key, type) => {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Expires: 60 * 5,
            ContentType: type
        }
        const url = S3.getSignedUrl('putObject', params)
        return url
    }


    emptyS3Directory = async (dir) => {
        const bucket = process.env.S3_BUCKET

        const listParams = {
            Bucket: bucket,
            Prefix: dir
        };

        const listedObjects = await S3.listObjectsV2(listParams).promise();

        if (listedObjects.Contents.length === 0) return;

        const deleteParams = {
            Bucket: bucket,
            Delete: { Objects: [] }
        };

        listedObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key });
        });

        await S3.deleteObjects(deleteParams).promise();

        if (listedObjects.IsTruncated) await emptyS3Directory(dir);

    }
}

s3Service = new s3Service()

module.exports = s3Service

