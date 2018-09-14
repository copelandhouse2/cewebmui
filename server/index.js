import express from "express";
// import mongoose from "mongoose";
import { TEST_MODE, PROD_MODE, connect } from "./mysqldb";
import { TEST, PROD, tconnect } from "./trello";
import SessionRoutes from "./routes/SessionRoutes";
import StartRoutes from "./routes/StartRoutes";
import ClientRoutes from "./routes/ClientRoutes";
import CityRoutes from "./routes/CityRoutes";
import SubdivisionRoutes from "./routes/SubdivisionRoutes";
import JobNumberSeqRoutes from "./routes/JobNumberSeqRoutes";
import LookupRoutes from "./routes/LookupRoutes";
import UserRoutes from "./routes/UserRoutes";
import bodyParser from "body-parser";
import path from "path";

// MongoDB connection
// mongoose.set("debug", true);
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://public:public@ds257858.mlab.com:57858/checkpoint2");

connect(TEST_MODE, function(err) {
  if(!err) {
    console.log("Database is connected ... \n\n");  
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

tconnect(TEST, function(err) {
  if(!err) {
    console.log("Trello is connected ... \n\n");  
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

const app = express();
app.use(bodyParser.json());

const wwwPath = path.join(__dirname, "www");
app.use("/", express.static(wwwPath));

app.use(SessionRoutes);
app.use(StartRoutes);
app.use(ClientRoutes);
// app.use(ContactRoutes);
app.use(CityRoutes);
app.use(SubdivisionRoutes);
app.use(JobNumberSeqRoutes);
app.use(LookupRoutes);
app.use(UserRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
