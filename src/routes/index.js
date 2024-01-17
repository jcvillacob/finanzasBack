const express = require('express');
const userRouter = require('./userRoutes');
const categoryRouter = require('./categoryRoutes');
const accountRouter = require('./accountRoutes');
const budgetRouter = require('./budgetRoutes');
const transactionRouter = require('./transactionRoutes');
const loginRouter = require('./loginRoutes');

const app = express();

// Montar los routers
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/accounts', accountRouter);
app.use('/budgets', budgetRouter);
app.use('/transactions', transactionRouter);


// Para el login
app.use('/login', loginRouter);


module.exports = app;
