import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, show, find, create, save, update, remove } from "../controllers/CityController";
const router = express.Router();

//Getting the data... the entire list
router.get("/cities", list);

//Searching for subdivisions
router.get("/citysearch/:findString", find);

//Getting the data... just one entity
router.get("/cities/:id", show);

//posting new entries to the database
router.post("/cities", save);

//posting new entries to the database
// router.post("/cities", create);

//putting update entries to the database
// router.put("/cities/:id", update);

//deleting entries from the database
router.delete("/cities/:id", remove);

export default router;
