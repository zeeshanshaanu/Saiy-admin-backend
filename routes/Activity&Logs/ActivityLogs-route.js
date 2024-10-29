import express from 'express';
import checkUserAuth from '../../middleware/authMiddleware.js';
import { getAllEntities } from '../../controllers/ActivityLogs.js';


////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

router.get('', checkUserAuth, getAllEntities);

////////////////////////  **************************  /////////////////////////////
export default router;