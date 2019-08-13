import express from 'express';
// import { list, show, create, update, delete } from '../controllers/AddressController';
import { list, show, create, remove, listPending, commit, listDups } from '../controllers/ProjectController';
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
router.put('/commits/:userID/:create', commit);

//Getting the data... the entire list
router.get(`/dups/:test/:address/:subdivision/:phase/:section/:block/:lot`
  , listDups);

export default router;
