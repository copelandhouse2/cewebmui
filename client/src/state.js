export default {
  pageTitle: '',
  addresses: [],
  search: {
    recents: '1',
    recentsResults: [],
    find: null,
    findResults: [],
  },
  dups: [],
  clients: [],
  clientSearch: {
    find: null,
    findResults: [],
  },
  cities: [],
  citySearch: {
    find: null,
    findResults: [],
  },
  subdivisions: [],
  subSearch: {
    find: null,
    findResults: [],
  },
  users: [],  // People that have approved record in users table.
  requestors: [], // users and contacts with requestor flag = 'Y'.  User can enter "on behalf of".
  designers: [],  //
  contacts: [],  // all people in contacts table.
  // jobnumberseqs: [],
  stateLookup: [],
  countryLookup: [],
  roleLookup: [],
  trelloListLookup: [],
  recordStatusLookup: [],
  projectStatusLookup: [],
  scopeLookup: [],
  classificationLookup: [],
  masonryLookup: [],
  ynLookup: [],
  fndTypeLookup: [],
  garageTypeLookup: [],
  garageEntryLookup: [],
  garageSwingLookup: [],
  floorTypeLookup: [],
  roofTypeLookup: [],
  coveredPatioLookup: [],
  dwellingTypeLookup: [],
  dateSearchLookup: [],
  pitaLookup: [],
  revReasonLookup: [],
  revRespLookup: [],
  geos: [],
  geoSearch: {
    find: null,
    findResults: [],
  },
  geoMasterData: [],
  session: {
    authInProgress: true,
    id: null,
    username: "",
    auth_key: "",
    approved: '',
    authenticated: false,
    token: "",
    contact_id: null,
    first_name: "",
    full_name: "",
    role: "",
    client_id: null,
    client_name: "",
    currentMenuID: null,
    userSettings: {
      accent_color: '#42a5f5',
    },
  },
  message: {
    ok: true,
    type: "",
    status: null,
    title: "",
    content: ""
  },
  showClientDialog: false,
  showContactDialog: false,
  showSubdivisionDialog: false,
  showCityDialog: false,
  avffControls:[],
  avffRelationships:[],
  currentMenu: {},
  currentViews: [],  // could load multiple views.  SINGLE view is default.
  localView: {},  // this is for a temp view used in a popup then discarded.
  currentProject: {},
  saveType: [
    {name: 'save', code: 'save'},
    {name: 'commit', code: 'commit'}
  ],
  projectHistory: [],
  projectRevisions: [],

};
