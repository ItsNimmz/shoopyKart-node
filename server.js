const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const sequelize = require('./utils/database');

app.use(express.static(path.join(__dirname, 'uploads')));


//routes
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');

//models
const Product = require('./models/product');
const User = require('./models/user');

app.use('/api', authRoute);
app.use('/api', homeRoute);
app.use('/api', userRoute);
app.use('/api', adminRoute);

const forceSync = false;
const PORT = 3000;

sequelize.sync({ force: forceSync })
    .then(async(result) => {
        if (forceSync) {
            const password = await bcrypt.hash('123456', bcrypt.genSaltSync(12));
            const user = await User.create({
                name: 'admin',
                username: 'Admin',
                email: 'admin@gmail.com',
                password: password,
                user_role: 'admin'
            });
        }
        return result;
    })
    .then(res => {
        app.listen(PORT)
    })
    .catch(err => console(err));