import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, show, create, remove } from "../controllers/StartController";
const router = express.Router();

//Getting the data... the entire list
router.get("/starts", list);


//Getting the data... just one entity
router.get("/starts/:id", show);


//posting new entries to the database
router.post("/starts", create);

//deleting entries from the database
router.delete("/starts/:id", remove);

export default router;
