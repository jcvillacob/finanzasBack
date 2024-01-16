const express = require('express');
const userRouter = require('./userRoutes');
const categoryRouter = require('./categoryRoutes');
const accountRouter = require('./accountRoutes');
const budgetRouter = require('./budgetRoutes');

const app = express();

// Montar los routers
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/accounts', accountRouter);
app.use('/budgets', budgetRouter);


module.exports = app;
