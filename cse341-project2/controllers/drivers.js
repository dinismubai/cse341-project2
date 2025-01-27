const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Drivers']
    mongodb
    .getDatabase()
    .db()
    .collection('drivers')
    .find()
    .toArray((err, lists) => {
        if (err){
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};            


const getSingle = (req, res) => {
    //#swagger.tags=['Drivers']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
      }

    const driverId = new ObjectId(req.params.id);
    mongodb
    .getDatabase()
    .db()
    .collection('drivers')
    .find({ _id: driverId })
    .toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};

const createDriver = async (req, res) => {
    //#swagger.tags=['Drivers']
    const driver = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        yearsDriving: req.body.yearsDriving,
        email: req.body.email,
        phone: req.body.phone,
        licenseNumber: req.body.licenseNumber
    };

    const response = await mongodb.getDatabase().db().collection('drivers').insertOne(driver);
    if (response.acknowledged) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the driver');
    }
};

const updateDriver = async (req, res) => {
    //#swagger.tags=['Drivers']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
      }

    const driverId = new ObjectId(req.params.id);
    const driver = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        yearsDriving: req.body.yearsDriving,
        email: req.body.email,
        phone: req.body.phone,
        licenseNumber: req.body.licenseNumber
    };
    const response = await mongodb.getDatabase().db().collection('drivers').replaceOne({ _id: driverId }, driver);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the driver.');
    }
};

const deleteDriver = async (req, res) => {
    //#swagger.tags=['Drivers']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
      }
      
    const driverId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('drivers').deleteOne({ _id: driverId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error occurred while deleting the driver.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createDriver,
    updateDriver,
    deleteDriver
};



