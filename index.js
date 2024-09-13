const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const PORT = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static('public'));
app.set('view engine','ejs');

// Routes
const foodRoute = require('./controller/foodController')
const categoryRoute = require('./controller/categoryController')
const userRoute = require('./controller/userController')
const authRoute = require('./controller/authController')

// middleware
app.use("/foods", foodRoute);
app.use("/category", categoryRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.get('/', async (req, res, foodRoute) => {
  await res.render('pages/index');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
