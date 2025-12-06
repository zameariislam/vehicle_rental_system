import express from 'express'

import { bookingControllers } from './booking.controller'

const router= express.Router()

router.post('/',bookingControllers.createBooking)
router.get('/',bookingControllers.getAllBookings)

// router.put('/:userId',userControllers.updateUser)
// router.delete('/:userId',userControllers.deleteUser)






export const  bookingRoutes=router