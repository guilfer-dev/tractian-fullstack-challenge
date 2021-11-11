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

app.use(cors());
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/auth", AuthenticationRoutes);
app.use("/companies", CompanyRoutes);
app.use("/units", UnitRoutes);
app.use("/assets", AssetRoutes);


mongoose.connect(process.env.MONGO_AUTH + '/tractian')
    .then(console.log("Database connection Success."))
    .catch(e => console.error("Mongo Connection Error", err));

app.listen(port, console.log(`Connected to port :${port}`));