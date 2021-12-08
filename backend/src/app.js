import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import 'dotenv/config'

import UserRoutes from './routes/UserRoutes.js'
import AuthenticationRoutes from './routes/AuthenticationRoutes.js'
import CompanyRoutes from './routes/CompanyRoutes.js'
import UnitRoutes from './routes/UnitRoutes.js'
import AssetRoutes from './routes/AssetRoutes.js'

const port = process.env.PORT
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", UserRoutes);
app.use("/", AuthenticationRoutes);
app.use("/companies", CompanyRoutes);
app.use("/", UnitRoutes);
app.use("/", AssetRoutes);

mongoose.connect(`${process.env.MONGO_AUTH}/tractian`)
    .then(console.log("Database connection: Success"))
    .catch(err => console.error("Database connection: Error", err));

app.listen(port, console.log(`Server available on port :${port}`));