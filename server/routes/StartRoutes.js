import express from 'express';
// import { list, show, create, update, delete } from '../controllers/AddressController';
import { list, show, create, remove, listPending, commit } from '../controllers/StartController';
const router = express.Router();

//Getting the data... the entire list
router.get(`/projects/:pending/:dateRange/:enteredBy/:jobNumber/:address/:requestedBy/:client/:city/:subdivision/:status`
  , list);

//Getting the data... just one entity
router.get('/projects/:id', show);

//posting new entries to the database
router.post('/projects', create);

//deleting entries from the database
router.delete('/projects/:id', remove);

//Getting the projects... those pending for the user
router.get('/pending/:userID', listPending);

//Getting the projects... those pending for the user
router.put('/commits/:userID', commit);

export default router;
