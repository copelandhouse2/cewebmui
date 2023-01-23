import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { authenticate, getCard, getTrelloSeed } from "../controllers/TrelloController";
const router = express.Router();

//Authenticating Trello
router.get("/trello/authenticate/:token", authenticate);

router.get("/trello/card/:token/:cardID", getCard);

router.get("/trello/seed/:token", getTrelloSeed);

export default router;
