import express from 'express';
import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js';

const router = express.Router();

router.post('/', async function (req, res) {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 10)
    const ret = await userModel.add(user);
    user = {
        id: ret[0],
        ...user
    }
    delete user.password;
    res.status(201).json(user);
})

export default router;
