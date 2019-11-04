import express from 'express';
// import { list, show, create, update, delete } from '../controllers/AddressController';
import { listControls, listRelationships, listChildren } from '../controllers/AvffController';
const router = express.Router();

//Getting the data... the top menu
router.get(`/controls`, listControls);

//Getting the data... the top menu
router.get(`/relationships`, listRelationships);

//Getting the data... the children of a parent entity
router.get('/controls/:parentID', listChildren);

export default router;
