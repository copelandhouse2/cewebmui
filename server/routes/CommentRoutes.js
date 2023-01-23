import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { list, save, remove } from "../controllers/CommentController";
const router = express.Router();

//Getting the data... based on table and id.
router.get("/comments/:table/:table_id", list);

//posting new entries to the database
router.post("/comments", save);

//deleting entries from the database
router.delete("/comments/:id", remove);

export default router;
