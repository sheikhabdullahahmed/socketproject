import express from 'express'

import { getprofile, login, updatelocation } from './auth.controller.js'
import {singup} from './auth.controller.js'
import {protect} from '../../middleware/auth.middleware.js'


const router = express.Router()

router.post('/register', singup)
router.post('/login', login)
router.get('/profile/:id',protect, getprofile)
router.put('/updatep/:id',protect, updatelocation)



export default router; 
