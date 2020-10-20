import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, find, show, save, update, remove } from "../controllers/ClientController";
const router = express.Router();

//Getting the data... the entire list
router.get("/clients", list);

//Getting the geotech list
router.get("/clientsearch/:findString", find);

//Getting the data... just one entity
router.get("/clients/:id", show);

//posting new and updated entries to the database
router.post("/clients", save);

//putting update entries to the database
router.put("/clients/:id", update);

//deleting entries from the database
router.delete("/clients/:id", remove);

export default router;
