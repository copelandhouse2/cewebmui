import express from "express";
import { list, show, create, update, remove } from "../controllers/JobNumberSeqController";
const router = express.Router();

//Getting the data... the entire list
router.get("/jobnumberseqs", list);

//Getting the data... just one entity
router.get("/jobnumberseqs/:id", show);

//posting new entries to the database
router.post("/jobnumberseqs", create);

//putting update entries to the database
router.put("/jobnumberseqs/:id", update);

//deleting entries from the database
router.delete("/jobnumberseqs/:id", remove);

export default router;
