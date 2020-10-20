import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { listGeos, saveGeos, findGeos, deleteGeo, listMasterData, listReportData }
  from "../controllers/GeotechController";

const router = express.Router();

//Getting the geotech list
router.get("/geos", listGeos);

//Getting the geotech list
router.get("/geosearch/:findString", findGeos);

//Saving the geotech: includes inserts and updates.
router.post("/geos", saveGeos);

//Removing the geotech
router.delete("/geos/:id", deleteGeo);

//Getting the geotech list
router.get("/geomasterdata/:id", listMasterData);

//Getting the geotech list
router.get("/georeportdata/:id", listReportData);

export default router;
