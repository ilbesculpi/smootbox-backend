const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');

// Define AWS Constants
const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET;
const S3_BUCKET_BASE_URL = process.env.AWS_S3_BUCKET_BASE_URL;

class StorageService {

    async uploadFile(file, path) {

        // Read File
        const fileContent = fs.readFileSync(file.path);

        console.log('uploading file to S3', {
            region: AWS_REGION,
            bucket: S3_BUCKET_NAME,
            key: path
        });

        const objectParams = {
            Bucket: S3_BUCKET_NAME,
            Key: path,
            Body: fileContent,
            ACL: 'public-read'
        };

        // Create an S3 client service object
        const s3 = new S3Client({ region: AWS_REGION });
        const result = await s3.send(new PutObjectCommand(objectParams));
        console.log("Successfully uploaded data to " + S3_BUCKET_NAME + "/" + path);
        return {
            url: `${S3_BUCKET_BASE_URL}/${path}`
        };
    };
}

module.exports = StorageService;
