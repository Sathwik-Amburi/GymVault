const AWS = require('aws-sdk');

// IAM user credentials with policy to allow all S3 actions 
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

// Launch AWS Resources
const S3 = new AWS.S3({
    signatureVersion: 'v4',
    region: process.env.AWS_REGION,
    params: {Bucket: process.env.S3_BUCKET}
})

module.exports = {S3}