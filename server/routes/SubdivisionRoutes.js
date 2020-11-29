import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, show, find, create, save, remove } from "../controllers/SubdivisionController";
const router = express.Router();

//Getting the data... the entire list
router.get("/subdivisions", list);

//Searching for subdivisions
router.get("/subdivisionsearch/:findString", find);

//Getting the data... just one entity
router.get("/subdivisions/:id", show);

//posting new entries to the database
router.post("/subdivisionadd", create);
router.post("/subdivisions", save);

//deleting entries from the database
router.delete("/subdivisions/:id", remove);

export default router;
