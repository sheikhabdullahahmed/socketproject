import express from 'express'
import { createroom, joinroom } from './room.controller.js'
import {protect} from '../../middleware/auth.middleware.js'



const router = express.Router()

router.post('/roomcreat',protect, createroom)
router.get('/:roomId',protect, joinroom)
// router.post('/register', )




export default router; 
