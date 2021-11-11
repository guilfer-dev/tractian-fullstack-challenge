import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import 'dotenv/config'

import AssetRoutes from './routes/AssetRoutes.js'
import CompanyRoutes from './routes/CompanyRoutes.js'
import UnitRoutes from './routes/UnitRoutes.js'
import UserRoutes from './routes/UserRoutes.js'

const port = process.env.PORT
const app = express();

app.use(cors());
app.use(express.json());

app.use("/assets", AssetRoutes)
app.use("/companies", CompanyRoutes)
app.use("/units", UnitRoutes)
app.use("/users", UserRoutes)
app.use("/auth", UserRoutes)


mongoose.connect(process.env.MONGO_AUTH + '/tractian')
    .then(console.log("Database connection Success."))
    .catch(e => console.error("Mongo Connection Error", err));

app.listen(port, console.log(`Connected to port :${port}`));