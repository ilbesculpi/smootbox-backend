const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const { CitiesService } = require('../services');

const mongoose = require('mongoose');
const db = mongoose.connection;
const citiesService = new CitiesService(db);

// Define AWS Constants
const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET;
const S3_BUCKET_BASE_URL = process.env.AWS_S3_BUCKET_BASE_URL;

/**
 * Handles PUT /cities/:id/picture
 * Response : {}
 */
 module.exports.uploadCityPicture = async (req, res, next) => {

    try {
        // console.log('files', req.files);
        const file = req.files.picture;
        const id = req.params.id;
        // Upload picture
        const destPath = `content/cities/${id}/${file.name}`;
        const result = await uploadFileToS3(file, destPath);
        // Update database record
        citiesService.updateCity(id, { pictureUrl: result.url })

        res.send(200, {
            success: 'ok',
            result: result
        });
    }
    catch(error) {
        console.error('Error uploading file:', error.message);
        console.error(error.stack);
        res.send(error.code || 500, {
            message: `Error uploading file`,
            error: error.message
        });
    }
    return next();
};

const uploadFileToS3 = async (file, path) => {

    // Read File
    const fileContent = fs.readFileSync(file.path);
    
    const objectParams = {
        Bucket: S3_BUCKET_NAME,
        Key: path,
        Body: fileContent,
        ACL: 'public-read'
    };

    // Create an S3 client service object
    const s3 = new S3Client({ region: AWS_REGION });
    const results = await s3.send(new PutObjectCommand(objectParams));
    console.log("Successfully uploaded data to " + S3_BUCKET_NAME + "/" + path);
    return {
        url: `${S3_BUCKET_BASE_URL}/${path}`
    };
};
