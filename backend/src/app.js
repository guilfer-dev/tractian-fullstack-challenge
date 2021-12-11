import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import config from './config.js'

import UserRoutes from './routes/UserRoutes.js'
import AuthenticationRoutes from './routes/AuthenticationRoutes.js'
import CompanyRoutes from './routes/CompanyRoutes.js'
import UnitRoutes from './routes/UnitRoutes.js'
import AssetRoutes from './routes/AssetRoutes.js'

const port = config.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", UserRoutes);
app.use("/", AuthenticationRoutes);
app.use("/", CompanyRoutes);
app.use("/", UnitRoutes);
app.use("/", AssetRoutes);

mongoose.connect(`${config.MONGO_AUTH}/tractian`)
    .then(console.log("Database connection: Success"))
    .catch(err => console.error("Database connection: Error", err));

app.listen(port, console.log(`Server available on port :${port}`));