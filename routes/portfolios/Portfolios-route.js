import express from 'express';
import checkUserAuth from '../../middleware/authMiddleware.js';
import {
    CreatePortofolio,
    DeletePortfolio,
    GetPortfolois,
    UpdatePortfolio
} from '../../controllers/Portfolio-Controller.js';
import { upload } from '../../helpers/ImageUpload-cloudinary.js';

////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

router.post('', checkUserAuth,
    upload.fields([
        { name: 'image', maxCount: 1 },
    ]),
    CreatePortofolio);

router.put('/:id', checkUserAuth, upload.fields([
    { name: 'image', maxCount: 1 },
]), UpdatePortfolio);

router.get('/:id?', checkUserAuth, GetPortfolois)
router.delete('/:id', checkUserAuth, DeletePortfolio);

////////////////////////  **************************  /////////////////////////////
export default router;