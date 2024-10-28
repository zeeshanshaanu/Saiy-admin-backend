import express from 'express';
import checkUserAuth from '../../middleware/authMiddleware.js';
import {
    CreatePortofolio,
    DeletePortfolio,
    GetPortfolois,
    UpdatePortfolio
} from '../../controllers/Portfolio-Controller.js';

////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

router.post('', checkUserAuth, CreatePortofolio);
router.get('/:id?', checkUserAuth, GetPortfolois)
router.put('/:id', checkUserAuth, UpdatePortfolio)
router.delete('/:id', checkUserAuth, DeletePortfolio);

////////////////////////  **************************  /////////////////////////////
export default router;