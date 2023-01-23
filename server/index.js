// require("dotenv").config({path: __dirname+'./../.env'});
// require("dotenv").config();
import { env } from "./envVars";

import '@babel/polyfill/noConflict';

import express from "express";
// import mongoose from "mongoose";
import { TEST_MODE, PROD_MODE, connect } from "./mysqldb";
import { TEST, PROD, tconnect, TrelloSeed } from "./trello";
import SessionRoutes from "./routes/SessionRoutes";
import ProjectRoutes from "./routes/ProjectRoutes";
import ClientRoutes from "./routes/ClientRoutes";
import CityRoutes from "./routes/CityRoutes";
import SubdivisionRoutes from "./routes/SubdivisionRoutes";
import JobNumberSeqRoutes from "./routes/JobNumberSeqRoutes";
import LookupRoutes from "./routes/LookupRoutes";
import ContactRoutes from "./routes/ContactRoutes";
import UserRoutes from "./routes/UserRoutes";
import GeotechRoutes from "./routes/GeotechRoutes";
import OrganizationRoutes from "./routes/OrganizationRoutes";
import AvffRoutes from "./routes/AvffRoutes";
import InspectionRoutes from "./routes/InspectionRoutes";
import TrelloRoutes from "./routes/TrelloRoutes";
import BoxRoutes from "./routes/BoxRoutes";
import CommentRoutes from "./routes/CommentRoutes";

import bodyParser from "body-parser";
import path from "path";

import { MysqlSeed, geotechs, geoMasterData } from "./seedData.js"  //not working form some reason

// MySQL Database Connection
console.log('MODE', env.REACT_APP_MODE);
connect(env.REACT_APP_MODE, function(err) {
  if(!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

// Calling seed data from MySQL
MysqlSeed.queryGeos();
MysqlSeed.queryMasterData();


const app = express();
app.use(bodyParser.json());

const wwwPath = path.join(__dirname, "www");
console.log('wwwPath', wwwPath);
app.use("/", express.static(wwwPath));

app.use(SessionRoutes);
app.use(ProjectRoutes);
app.use(ClientRoutes);
app.use(ContactRoutes);
app.use(CityRoutes);
app.use(SubdivisionRoutes);
app.use(JobNumberSeqRoutes);
app.use(LookupRoutes);
app.use(UserRoutes);
app.use(GeotechRoutes);
app.use(OrganizationRoutes);
app.use(AvffRoutes);
app.use(InspectionRoutes);
app.use(TrelloRoutes);
app.use(BoxRoutes);
app.use(CommentRoutes);

const port = env.REACT_APP_MODE === 'PROD'?
  env.REACT_APP_PORT || 3001 : env.REACT_APP_PORT_TEST || 5001;

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

export default app;
