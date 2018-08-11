import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { show } from "../controllers/SessionController";
const router = express.Router();

//Getting the data... the entire list
router.get("/session/:username", show);

export default router;
