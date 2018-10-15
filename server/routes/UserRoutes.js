import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, show, showByName, create, signUp, signIn, update, remove } from "../controllers/UserController";
const router = express.Router();

//Getting the data... the entire list
router.get("/users", list);

//Getting the data... just one entity
router.get("/users/:id", show);

//Getting the data... just one entity
router.get("/users/:username", showByName);

//posting new entries to the database
router.post("/users", create);

//posting new entries to the database
router.post("/signUp", signUp);

//posting new entries to the database
router.post("/signIn/:username", signIn);

//putting update entries to the database
router.put("/users/:id", update);

//deleting entries from the database
router.delete("/users/:id", remove);

export default router;
