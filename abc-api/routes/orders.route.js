import express from 'express';
import storeModel from '../models/order.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const list = await storeModel.findAll();
    res.json(list);
})
router.get('/age', async function (req, res) {
    const list = await storeModel.findWithAge();
    res.json(list);
})

router.get('/:id', async function (req, res) {
    const id = req.params.id || 0;
    const store = await storeModel.findById(id);
    if (store === null) {
        return res.status(204).end();
    }

    res.json(store);
})

export default router;
