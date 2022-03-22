import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import categoryRouter from './routes/CategoryRoute';
import errorHandler from './middlewares/ErrorHandler';
import productRouter from './routes/ProductRoute';
import userRouter from './routes/UserRoute';
import authRouter from './routes/AuthRoute';
import adressRouter from './routes/AdressRoute';

const app = express();

const PORT = process.env.NODE_PORT || 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);
app.use(userRouter);
app.use(adressRouter);
app.use(categoryRouter);
app.use(productRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
