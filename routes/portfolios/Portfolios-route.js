import express from 'express';
import checkUserAuth from '../../middleware/authMiddleware.js';
import {
    CreatePortofolio,
    DeletePortfolio,
    GetPortfolois,
    UpdatePortfolio
} from '../../controllers/Portfolio-Controller.js';
<<<<<<< HEAD
=======
import { upload } from '../../helpers/ImageUpload-cloudinary.js';
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa

////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
const router = express.Router();

<<<<<<< HEAD
router.post('', checkUserAuth, CreatePortofolio);
router.get('/:id?', checkUserAuth, GetPortfolois)
router.put('/:id', checkUserAuth, UpdatePortfolio)
=======
router.post('', checkUserAuth,
    upload.fields([
        { name: 'image', maxCount: 1 },
    ]),
    CreatePortofolio);

router.put('/:id', checkUserAuth, upload.fields([
    { name: 'image', maxCount: 1 },
]), UpdatePortfolio);

router.get('/:id?', checkUserAuth, GetPortfolois)
>>>>>>> a52f732fc4de94ae5f65aff28d668999b3436caa
router.delete('/:id', checkUserAuth, DeletePortfolio);

////////////////////////  **************************  /////////////////////////////
export default router;