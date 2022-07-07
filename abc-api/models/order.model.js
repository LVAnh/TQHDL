import generate from './generic.model.js';
import db from '../utils/db.js';

const orderModel = generate('orders', 'order_id');
orderModel.findWithAge = async function (){
    return db.select('*')
        .from('orders')
        .join('users', {'users.user_id': 'orders.customer_id'});

}
export default orderModel
