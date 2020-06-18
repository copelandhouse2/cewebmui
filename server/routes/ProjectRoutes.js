import express from 'express';
// import { list, show, create, update, delete } from '../controllers/AddressController';
import { list, show, create, remove, listPending, listSearch, commit, listDups, getHistory } from '../controllers/ProjectController';
const router = express.Router();

//Getting the data... the entire list
router.get(`/projects/:pending/:dateRange/:enteredBy/:jobNumber/:address/:requestedBy/:client/:city/:subdivision/:status`
  , list);

//Getting the projects... those pending for the user
router.get('/pending/:userID', listPending);

//Getting the projects... those pending for the user
router.get('/recents/:ver/:enteredBy/:filter', listSearch);

//Searching for projects with the v2.0+ software
router.get('/find/:ver/:find', listSearch);
router.get(`/find/:ver/:jobNumber/:address/:dateRange/:client/:subdivision/:city/:enteredBy/:requestedBy/:status`
  , listSearch);

//Getting the data... just one entity
router.get('/projects/:id', show);

//posting new entries to the database
router.post('/projects', create);
router.post('/projects/:v2', create);

//deleting entries from the database
router.delete('/projects/:id', remove);

//Getting the projects... those pending for the user
router.put('/commits/:userID/:create', commit);
router.put('/commits/:userID/:create/:v2', commit);

//Getting the data... the entire list
router.get(`/dups/:test/:address/:subdivision/:phase/:section/:block/:lot`
  , listDups);

router.get('/projecthistory/:id', getHistory);

export default router;
