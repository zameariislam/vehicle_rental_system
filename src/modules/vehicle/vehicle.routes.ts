
 import express from 'express'

import { vehicleControllers } from './vehicle.controller'

  const router=express.Router()

  


router.post('/',vehicleControllers.createVehicle)
router.get('/',vehicleControllers.getAllVehicles)
router.put('/:vehicleId',vehicleControllers.updateVehicle)
router.delete('/:vehicleId',vehicleControllers.deleteVehicle)
router.get('/:vehicleId',vehicleControllers.getVehicleById)




 const vehicleRoutes=router 


 export default vehicleRoutes