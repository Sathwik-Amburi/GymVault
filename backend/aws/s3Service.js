const { S3 } = require("./configSDK");

class s3Service {

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

    deleteItem = async (key) => {
        const params = { Bucket: process.env.S3_BUCKET, Key: key }
        try {
            await S3.deleteObject(params).promise()
        } catch (error) {
            console.log("Error when deleting item")
        }
    }
}

s3Service = new s3Service()

module.exports = s3Service

