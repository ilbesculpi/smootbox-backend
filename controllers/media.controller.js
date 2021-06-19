const { CitiesService, StorageService } = require('../services');

const mongoose = require('mongoose');
const db = mongoose.connection;
const citiesService = new CitiesService(db);
const storageService = new StorageService();



/**
 * Handles PUT /cities/:id/picture
 * Response : {}
 */
 module.exports.uploadCityPicture = async (req, res, next) => {

    try {

        //console.log('files', req.files);
        const file = req.files.picture;
        const id = req.params.id;
        console.log('uploadCityPicture', { cityId: id });
        console.log('file', {
            name: file.name,
            type: file.type,
            path: file.path,
            size: file.size
        });

        // Upload picture
        const destPath = `content/cities/${id}/${file.name}`;
        const result = await storageService.uploadFile(file, destPath);

        // Update database record
        citiesService.updateCity(id, { pictureUrl: result.url })

        res.send(200, {
            success: 'ok',
            result: result
        });
    }
    catch(error) {
        console.log('Error uploading file:', error.message);
        console.log(error.stack);
        res.send(error.code || 500, {
            message: `Error uploading file`,
            error: error.message
        });
    }
    return next();
};

