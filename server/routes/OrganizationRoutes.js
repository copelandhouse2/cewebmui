import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { listOrgs, saveOrgs, findOrgs, deleteOrg, listMasterData, listReportData }
  from "../controllers/OrganizationController";

const router = express.Router();

//Getting the geotech list
router.get("/orgs", listOrgs);

//Getting the geotech list
router.get("/orgsearch/:findString", findOrgs);

//Saving the geotech: includes inserts and updates.
router.post("/orgs", saveOrgs);

//Removing the geotech
router.delete("/orgs/:id", deleteOrg);

//Getting the geotech list
// router.get("/geomasterdata/:id", listMasterData);

//Getting the geotech list
// router.get("/georeportdata/:id", listReportData);

export default router;
