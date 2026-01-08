import express from 'express'
import { createroom, joinroom } from './room.controller.js'
import {protect} from '../../middleware/auth.middleware.js'



const router = express.Router()

router.post('/roomcreat',protect, createroom)
// masla ya ta kay may /:roomId dey rahaha ta is tarha nhi ho taha 
// /rooms/join/:id is tarh aho ta ha 
router.get('/join/:roomId',protect, joinroom)
// router.post('/register', )




export default router; 
