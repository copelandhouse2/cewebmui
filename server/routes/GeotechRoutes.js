import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { listGeos, createGeo, listMasterData, listReportData }
  from "../controllers/GeotechController";

const router = express.Router();

//Getting the geotech list
router.get("/geos", listGeos);

//Saving the geotech
router.post("/geos", createGeo);

//Getting the geotech list
router.get("/geomasterdata/:id", listMasterData);

//Getting the geotech list
router.get("/georeportdata/:id", listReportData);

export default router;
