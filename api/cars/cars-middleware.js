const Car = require("../cars/cars-model.js");

const checkCarId = async(req, res, next) => {
  try {
    const { id } = req.params
    const car = await Car.getById(id)
    if(!car){
      res.status(404).json(`car with car ${id} is not found`)
    } else {
      req.car = car
      next()
    }
  } catch(error) {
    res.status(500).json({  message: error.message })
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body 
  if(vin && make && model && mileage){
    next()
  } else {
    res.status(400).json(`vin is missing!`)
  }
}

const checkVinNumberValid = (req, res, next) => {
  if(!req.body.vin) return next({
    status: 400, 
    message: 'vin is missing',
  })
  if(!req.body.make) return next({
    status: 400, 
    message: 'make is missing',
  })
  if(!req.body.model) return next({
    status: 400, 
    message: 'model is missing',
  })
  if(!req.body.mileage) return next({
    status: 400, 
    message: 'mileage is missing',
  })
  next()
}

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body
  if(vin.unique() === true){
    next()
  } else {
    res.status(400).json(`vin ${vin} already exists`)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
