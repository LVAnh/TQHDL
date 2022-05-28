import generate from './generic.model.js';
import db from '../utils/db.js';

let userModel = generate('users', 'user_id');
userModel.findByUsername = async function (username) {
    const rows = await db('users').where('username',username);
    if(rows.length === 0){
        return null
    }
    return rows[0]
}
userModel.isValidRefreshToken = async function (userId, refreshToken) {
    const rows = await db('users').where('user_id',userId).andWhere('rfToken',refreshToken);
    return rows.length !== 0
}
export default userModel
