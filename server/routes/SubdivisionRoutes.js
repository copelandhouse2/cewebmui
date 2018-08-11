import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, show, create, remove } from "../controllers/SubdivisionController";
const router = express.Router();

//Getting the data... the entire list
router.get("/subdivisions", list);


//Getting the data... just one entity
router.get("/subdivisions/:id", show);


//posting new entries to the database
router.post("/subdivisions", create);

//deleting entries from the database
router.delete("/subdivisions/:id", remove);

export default router;
