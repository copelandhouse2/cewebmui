import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, show, showByName, create, signUp, signIn
  , authenticate, update, remove, getSettings, updateSettings
  , getPreferences, updatePreferences }
  from "../controllers/UserController";

const router = express.Router();

//Getting the data... the entire list
router.get("/users", list);

//Getting the data... just one entity

router.get("/users/settings/:userID", getSettings);
router.get("/users/preferences/:userID", getPreferences);

//Getting the data... just one entity
router.get("/users/:username", showByName);

//posting new entries to the database
router.post("/users", create);

//posting new entries to the database
router.post("/signUp", signUp);

//posting new entries to the database
router.post("/signIn", signIn);

//posting new entries to the database
router.get("/authenticate/:authToken", authenticate);

//putting update entries to the database
router.put("/users/:id", update);

//putting update entries to the database
router.put("/users/settings/:userID", updateSettings);
router.put("/users/preferences/:userID", updatePreferences);

//deleting entries from the database
router.delete("/users/:id", remove);

export default router;
