// require("dotenv").config({path: __dirname+'./../.env'});
// require("dotenv").config();
import { env } from "./envVars";

import '@babel/polyfill';

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
import bodyParser from "body-parser";
import path from "path";

import { MysqlSeed, geotechs, geoMasterData } from "./seedData.js"  //not working form some reason

// MongoDB connection
// mongoose.set("debug", true);
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://public:public@ds257858.mlab.com:57858/checkpoint2");

console.log('MODE', env.REACT_APP_MODE);
connect(env.REACT_APP_MODE, function(err) {
  if(!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

tconnect(env.REACT_APP_MODE, function(err) {
  if(!err) {
    console.log("Trello is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

TrelloSeed.boards( (err, resp) => {
  if(!err) {
    console.log("Got Board info. \n\n", resp);
  } else {
    console.log("Error getting board info. \n\n", err.message);
  }
});

// Calling seed data
MysqlSeed.queryGeos();
MysqlSeed.queryMasterData();
// (async () => {
//   try {
//     geotechs = await MysqlSeed.queryGeos2();
//     geoMasterData = await MysqlSeed.queryMasterData2(1);
//     console.log('seed data: geotechs', geotechs);
//     console.log('seed data: geoMasterData', geoMasterData);
//   } catch (err) {
//     console.log('seed error', err);
//   }
//
// })();

const app = express();
app.use(bodyParser.json());

// console.log('dir', __dirname);
const wwwPath = path.join(__dirname, "www");
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

const port = env.REACT_APP_MODE === 'PROD'?
  env.REACT_APP_PORT || 3001 : env.REACT_APP_PORT_TEST || 5001;

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
