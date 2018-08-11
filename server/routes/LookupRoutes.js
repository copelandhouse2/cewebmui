import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, show } from "../controllers/LookupController";
const router = express.Router();

//Getting the data... the entire list
router.get("/lookups/:type", list);

//Getting the data... just one entity
// router.get("/lookups/:type/:code", show);

export default router;
