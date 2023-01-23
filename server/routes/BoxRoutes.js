import express from "express";
// import { list, show, create, update, delete } from "../controllers/AddressController";
import { authenticate, getToken } from "../controllers/BoxController";
const router = express.Router();

//Authenticating Trello
// Called from CE Webtools Browser.  This call in turn calls Box.
router.get("/boxauth/:id", authenticate);

// Box redirect url points to this route.  This call in turn calls
// CE Webtools Browser Router which then saves the token in client storage.
router.get("/boxcode", getToken);

export default router;
