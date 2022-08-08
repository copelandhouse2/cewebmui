import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, show, filter, filterProjects, save
  , remove, listPrevProjectInspections, editInspection } from "../controllers/InspectionController";
const router = express.Router();

//Getting the inspection data... based on project or inspector
router.get("/inspections/list/:choiceType/:choice/:dateRange", list);
// router.get("/inspections/project/:proj_id/:cur_insp_id", listPrevProjectInspections);
router.get("/inspections/project/:proj_id/:cur_insp_id/:trelloToken", editInspection);

//Getting the data... just one entity
router.get("/inspections/:id", show);

//Searching for inspections address or inspector for filter
router.get("/inspectionfilter/:findString", filter);
router.get("/inspectionfilter/projects/:findString", filterProjects);

// Posting new entries to the database.
// Use trelloToken to create / update trello cards
router.post("/inspections/:trelloToken", save);

// Deleting entries from the database
router.delete("/inspections/:id", remove);

export default router;
