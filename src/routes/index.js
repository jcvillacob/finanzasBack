const express = require('express');
const userRouter = require('./userRoutes');
const categoryRouter = require('./categoryRoutes');

const app = express();

// Montar los routers
app.use('/users', userRouter);
app.use('/categories', categoryRouter);


module.exports = app;
