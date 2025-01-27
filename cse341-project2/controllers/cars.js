const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Cars']
    mongodb
    .getDatabase()
    .db()
    .collection('cars')
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
    //#swagger.tags=['Cars']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
      }
    const carId = new ObjectId(req.params.id);
    mongodb
    .getDatabase()
    .db()
    .collection('cars')
    .find({ _id: carId })
    .toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};

const createCar = async (req, res) => {
    //#swagger.tags=['Cars']
    const car = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        numberOfseats: req.body.numberOfseats,
        fuelType: req.body.fuelType
    };

    const response = await mongodb.getDatabase().db().collection('cars').insertOne(car);
    if (response.acknowledged) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the car');
    }
};

const updateCar = async (req, res) => {
    //#swagger.tags=['Cars']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
      }

    const carId = new ObjectId(req.params.id);
    const car = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        numberOfseats: req.body.numberOfseats,
        fuelType: req.body.fuelType
    };
    const response = await mongodb.getDatabase().db().collection('cars').replaceOne({ _id: carId }, car);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the car.');
    }
};

const deleteCar = async (req, res) => {
    //#swagger.tags=['Cars']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
      }
      
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: carId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error occurred while deleting the car.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};



