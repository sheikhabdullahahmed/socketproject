import express from 'express'

import { getprofile, login, updatelocation } from './auth.controller.js'
import {singup} from './auth.controller.js'
import {protect} from '../../middleware/auth.middleware.js'


const router = express.Router()

router.post('/register', singup)
router.post('/login', login)
router.get('/profile',protect, getprofile)
router.get('/updatep',protect, updatelocation)



export default router; 
