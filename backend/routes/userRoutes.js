import express from 'express';
import * as userController from '../controllers/userController.js';
import { checkUserAuth } from '../middleware/checkUserAuth.js';

const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.authUser);
router.get('/confirm/:token', userController.confirmUser);

router.get('/profile', checkUserAuth, userController.profile);

export default router;