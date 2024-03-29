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
  currentClient: {},
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
  designers: [],
  inspectors: [],  // contacts with the role INSEPCTION
  contacts: [],  // all people in contacts table.
  // jobnumberseqs: [],
  lookups: [],  // This is all the lookups.
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
  inspTypeLookup: [],
  inspReasonLookup: [],
  reportTypesLookup: [],
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
    content: "",
    ynDialog: false,
    yesFunc: false,
    noFunc: false,
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
  inspections: {
    // first two manage the search for inspections
    find: null,  // This value tracks the value in filter
    filter: [],  // These are the choices after 4+ char are entered.
    choice_id: null,  // value is set based on selected value from filter
    choice_type: null,  // value is set based on selected value from filter
    date_range: 1,  // user chooses.  This adjusts the inspections returned based on date.
    results: [],  // inspections returned based on choice id and date range.
    pastProjectSpecific: [],  // used for Inspection Dialog to show past inspections
    selected:{
      id: null,
      project: {},
    }
  },
  preferences:{
    system:{},
    user:{}
  },
  organizations: [],
  orgSearch: {
    find: null,
    findResults: [],
  },
  trelloToken: null,
  trelloInfo: [],
};
