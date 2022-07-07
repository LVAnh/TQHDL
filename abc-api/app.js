import express from 'express'
import morgan from 'morgan'
import categoryRouter from './routes/category.route.js'
import ordersRouter from './routes/orders.route.js'
import productRouter from './routes/product.route.js'
import userModel from "./models/user.model.js";
import productsModel from "./models/products.model.js";
import orderModel from "./models/order.model.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    })
);
//generatorUser()
//generatorProduct()
//generatorOrder()
app.use('/api/categories', categoryRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productRouter);


app.get('/', function (req, res) {
    res.json({
        msg: "Hello from NodeJs"
    })
})

app.post('/', function (req, res) {
    res.status(201).json({
        msg: 'data created'
    });
});

app.get('/err', function (req, res) {
    throw new Error('Error!');
})

app.use(function (req, res) {
    res.status(404).json({
        error: 'Endpoint not found.'
    });
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({
        error: 'Something wrong!'
    });
});
const PORT = process.env.PORT || 3030
app.listen(PORT, function () {
    console.log("ABC")
})


async function generatorUser() {
    for (let i = 0; i < 100; i++) {
        const gender = Math.floor(Math.random() * 10) % 2
        await userModel.add({
            username: `user${i + 2}`,
            password: "123456",
            name: gender === 0 ? "Nguyễn Văn A" : "Trần Thị B",
            age: Math.floor(Math.random() * 30) + 15,
            gender: gender === 0 ? "male" : "female"
        })
    }
}

async function generatorProduct() {
    await productsModel.add({category_id:1,shop_id:1,name:'Thịt gà',quantity:10,sales:10,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:100000})
    await productsModel.add({category_id:1,shop_id:1,name:'Thịt heo',quantity:10,sales:7,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:70000})
    await productsModel.add({category_id:1,shop_id:1,name:'Thịt bò',quantity:3,sales:3,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:200000})
    await productsModel.add({category_id:1,shop_id:1,name:'Trứng gà',quantity:100,sales:80,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,21),price:3000})
    await productsModel.add({category_id:2,shop_id:1,name:'Rau cải ngọt',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:5000})
    await productsModel.add({category_id:2,shop_id:1,name:'Rau cải cay',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:5000})
    await productsModel.add({category_id:2,shop_id:1,name:'Rau cải thìa',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:5000})
    await productsModel.add({category_id:2,shop_id:1,name:'Bí xanh',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Rau cần',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Rau xà lách',quantity:2,sales:1,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Rau ngót',quantity:2,sales:1,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Bắp cải',quantity:2,sales:1,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Bắp cải thảo',quantity:2,sales:1,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Tỏi khô',quantity:5,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Hành khô khô',quantity:5,sales:4,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Chôm chôm',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Nho',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Mận',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Xoài',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Táo',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Cam',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:2,shop_id:1,name:'Dưa hấu',quantity:2,sales:2,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,6,6),exp:new Date(2022,6,8),price:10000})
    await productsModel.add({category_id:8,shop_id:1,name:'Cocacola',quantity:120,sales:60,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,5,1),exp:new Date(2022,11,1),price:10000})
    await productsModel.add({category_id:8,shop_id:1,name:'Pepsi',quantity:120,sales:80,origin:"HCM",import_time:new Date(2022,6,6),dom:new Date(2022,5,1),exp:new Date(2022,11,1),price:10000})
}
async function generatorOrder() {
    const products = await productsModel.findAll()
    const users = await userModel.findAll()

    for(let i = 0; i < products.length; i++){
        for(let i = 0; i < products[i].sales; i++){
            const userIndex = Math.floor(Math.random() * (users.length-3))+2;

            await orderModel.add({
                customer_id: users[userIndex].user_id,
                product_id: products[i].product_id,
                quantity: 1,
                price: products[i].price,
                order_date: new Date(2022,6,7),
                delivery_date: new Date(2022,6,7),
                date_of_receipt: new Date(2022,6,7)
            })
        }
    }
}

