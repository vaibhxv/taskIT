import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { checkUserAuth } from '../middleware/checkUserAuth.js';

const router = express.Router();


router.get('/', checkUserAuth ,taskController.findalltasks)
router.put('/:id', taskController.updateTasks)
router.post('/', checkUserAuth ,taskController.postnewtask)
router.delete('/:id', taskController.deleteTasks)



export default router;