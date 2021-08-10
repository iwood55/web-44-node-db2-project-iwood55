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

const checkVinNumberValid = (req, res, next) => {
  if(vin.validate(res.body.id)) {
    next()
  }else{
    next({
      status: 400,
      message: `vin ${req.body.vin} is missing`
    })
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body
  if(vin.unique() === true){
    next()
  } else {
    res.status(400).json(`vin already exists`)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
