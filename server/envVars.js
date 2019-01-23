export const env = {
  SECRET: 'job311',  //Job 31:1
  PORT: '3001',
  HOST: '127.0.0.1',
  DBUSER: 'ceadmin',
  DBPASSWORD: 'Cmc131313',
  TRELLO_KEY: '8cf71593e2ebc58a2911081c788bd744',
  TRELLO_TOKEN: 'fc64a5cb6719806ef4603be9773edf91ad476a64ab71c571da6938163e86a0ab'
}

export const trello = {
  LIST_VOL='5999e5c3d0c8d288bd29b894',
  LIST_CUS='',
  LIST_TEST='58224c17dec8267fc73d049f',
  LABELS=[
    {id: '584875b284e677fd36a93486', name: 'SOILS HOLD'},
    {id: '595a624e1314a33999757c0f', name: 'DRAW DESIGN'},
    {id: '5a46babfd2c5d12039d522d1', name: 'STARTS'},
    {id: '5a6bc4cbe465b273feaa96b0', name: 'LENNAR-V'},
    {id: '5a720ed18cb78e6030d83ec7', name: '(FND) ROUGH DRAFT DONE'},
    {id: '5ac6964f978fe2f7bceaf09d', name: 'PERMIT SET'},
    {id: '5b1a9f3915ab7e17ca7859f4', name: 'CREATE MASTER'},
    {id: '5c35035e20482a455d936f68', name: 'Need Framing & Lateral Plans'}
  ],
  MEMBERS=[

  ],
  CUSTOMFIELDS=[
    {
        "id": "5a986713d6afbd6de1cedad7",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "6c84f2ffbfbcc75b0551f4071809fb939c56505a98b9b7919dda94f31b04af8b",
        "display": {
            "cardFront": true
        },
        "name": "Start Date",
        "pos": 16384,
        "type": "date"
    },
    {
        "id": "5a986713d6afbd6de1cedad9",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "dbe582d1c6428c37786479834c941e1134903a51ac5bc5aea40a8a55344d17ef",
        "display": {
            "cardFront": true
        },
        "name": "Original Due Date",
        "pos": 32768,
        "type": "date"
    },
    {
        "id": "5b6988259a8f472f27c570e6",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "2e4141568b45fd5b4c842227f368b62db242e1e36ea1e14b8e6a9b3ad5fab780",
        "display": {
            "cardFront": true
        },
        "name": "Design Due Date",
        "pos": 147456,
        "type": "date"
    },
    {
        "id": "5b7f19463ef76a50c1e10db4",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "b030e3ce6993ed9a62e927f1bfc8d5cedb0b50700ce453e03891aa7468ebb1ae",
        "display": {
            "cardFront": true
        },
        "name": "Phase",
        "pos": 163840,
        "options": [
            {
                "id": "5b7f19463ef76a50c1e10db6",
                "idCustomField": "5b7f19463ef76a50c1e10db4",
                "value": {
                    "text": "In Process"
                },
                "color": "green",
                "pos": 16384
            },
            {
                "id": "5b7f19463ef76a50c1e10db7",
                "idCustomField": "5b7f19463ef76a50c1e10db4",
                "value": {
                    "text": "In Review"
                },
                "color": "black",
                "pos": 32768
            },
            {
                "id": "5b7f19463ef76a50c1e10db8",
                "idCustomField": "5b7f19463ef76a50c1e10db4",
                "value": {
                    "text": "Done"
                },
                "color": "lime",
                "pos": 49152
            },
            {
                "id": "5b7f19463ef76a50c1e10db9",
                "idCustomField": "5b7f19463ef76a50c1e10db4",
                "value": {
                    "text": "Revision"
                },
                "color": "orange",
                "pos": 65536
            }
        ],
        "type": "list"
    },
    {
        "id": "5b7f19463ef76a50c1e10dba",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "a34ec752ad71e7f9b78ea747c7a40745ed48f11ba831b5b320d360b58cea5549",
        "display": {
            "cardFront": true
        },
        "name": "On -Board Date",
        "pos": 180224,
        "type": "date"
    },
    {
        "id": "5b7f3d6ace74683c5118a6c3",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "c38abc1e5a4a54bab617b8a04352adfc48eae620d9d28975df53ccbef9d97720",
        "display": {
            "cardFront": true
        },
        "name": "Roof Type",
        "pos": 196608,
        "options": [
            {
                "id": "5b7f3d6ace74683c5118a6c5",
                "idCustomField": "5b7f3d6ace74683c5118a6c3",
                "value": {
                    "text": "Truss"
                },
                "color": "purple",
                "pos": 16384
            },
            {
                "id": "5b7f3d6ace74683c5118a6c6",
                "idCustomField": "5b7f3d6ace74683c5118a6c3",
                "value": {
                    "text": "Stick"
                },
                "color": "purple",
                "pos": 32768
            }
        ],
        "type": "list"
    },
    {
        "id": "5b7f3d6ace74683c5118a6c7",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "6309f9742d857497c3b44d21c3aff3b7ab030777bc5fc75e8ca9f441a77c158f",
        "display": {
            "cardFront": true
        },
        "name": "Foundation Type",
        "pos": 212992,
        "options": [
            {
                "id": "5b7f3d6ace74683c5118a6c8",
                "idCustomField": "5b7f3d6ace74683c5118a6c7",
                "value": {
                    "text": "Post Tension"
                },
                "color": "green",
                "pos": 16384
            },
            {
                "id": "5b7f3d6ace74683c5118a6c9",
                "idCustomField": "5b7f3d6ace74683c5118a6c7",
                "value": {
                    "text": "Steel"
                },
                "color": "green",
                "pos": 32768
            },
            {
                "id": "5b7f3d6ace74683c5118a6ca",
                "idCustomField": "5b7f3d6ace74683c5118a6c7",
                "value": {
                    "text": "Pier and Beam"
                },
                "color": "green",
                "pos": 49152
            }
        ],
        "type": "list"
    },
    {
        "id": "5b92fd41e8082c5be8c2af23",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "4c9bdc4a6ff3974ecf88132ee7e496541e34ae25b732301cc559188f2f0738b2",
        "display": {
            "cardFront": true
        },
        "name": "Client ID",
        "pos": 229376,
        "type": "number"
    },
    {
        "id": "5b9834b64903976cc3fc0b72",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "afdab929adb52d58fe30123620cbe1637b2d482bf0a519e9531ee6994af11ec0",
        "display": {
            "cardFront": true
        },
        "name": "Contact",
        "pos": 245760,
        "type": "text"
    },
    {
        "id": "5b9834b64903976cc3fc0b74",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "1200ed8591063814d37965f801c9b3c1e7935f4aa250713d4eafb4c60b7421a4",
        "display": {
            "cardFront": true
        },
        "name": "Subdivision",
        "pos": 262144,
        "type": "text"
    },
    {
        "id": "5ba0e7b6374ed48a809aa6c3",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "580c9a347c2c5ab8a91cbccd346fc0341118c1e722ee492ecc4a0c11e394901d",
        "display": {
            "cardFront": true
        },
        "name": "Folder",
        "pos": 262144,
        "type": "text"
    },
    {
        "id": "5b9834b64903976cc3fc0b75",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "cf2d810333262f2ad120d9e2af5787e9f9072a30e2511988dffafabbb670c17e",
        "display": {
            "cardFront": true
        },
        "name": "Builder",
        "pos": 278528,
        "type": "text"
    },
    {
        "id": "5ba0e7f39bd29f20c66fb56c",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "ffcf91b6975d65efdff74df654bea15a3239088674a4a167bdb1b580fc0b8333",
        "display": {
            "cardFront": true
        },
        "name": "Billing",
        "pos": 278528,
        "type": "text"
    },
    {
        "id": "5bb79c4462f900256a83e418",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "9c8febe58163f7aa5f3bd9f6dabd68ee02f6cc3adf1fe94632b5a129d130f5eb",
        "display": {
            "cardFront": false
        },
        "name": "Ym (C,E)",
        "pos": 294912,
        "type": "text"
    },
    {
        "id": "5bb79c4462f900256a83e41a",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "fb6c566110b5213c6203660775cf883d40135cc19e110ac9263f8936e5195b98",
        "display": {
            "cardFront": false
        },
        "name": "Em (C,E)",
        "pos": 311296,
        "type": "text"
    },
    {
        "id": "5bb79c4462f900256a83e41b",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "4ee6ae4a3651d6df1300709189f7bf48d3383f300a2a73395835252369df7b2c",
        "display": {
            "cardFront": true
        },
        "name": "Design P.I.",
        "pos": 327680,
        "type": "text"
    },
    {
        "id": "5bb79c4462f900256a83e41c",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "9a2a40653a591d5ea87d8c25eada531bcb3c4b3b40b6ed898d619625a75743f9",
        "display": {
            "cardFront": true
        },
        "name": "SQFT",
        "pos": 344064,
        "type": "number"
    },
    {
        "id": "5bb79c4462f900256a83e41d",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "6fc841f4b305f5f22497f318a90b539e6d2cb139eeb1c87adf9b8c29e8e9e836",
        "display": {
            "cardFront": true
        },
        "name": "# Storys",
        "pos": 360448,
        "options": [
            {
                "id": "5bb79c4462f900256a83e41e",
                "idCustomField": "5bb79c4462f900256a83e41d",
                "value": {
                    "text": "1"
                },
                "color": "sky",
                "pos": 16384
            },
            {
                "id": "5bb79c4462f900256a83e41f",
                "idCustomField": "5bb79c4462f900256a83e41d",
                "value": {
                    "text": "2"
                },
                "color": "pink",
                "pos": 32768
            },
            {
                "id": "5bb79c4462f900256a83e420",
                "idCustomField": "5bb79c4462f900256a83e41d",
                "value": {
                    "text": "3"
                },
                "color": "none",
                "pos": 49152
            }
        ],
        "type": "list"
    },
    {
        "id": "5bbe2344a6638e50d0917930",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "4dc3be456c8ad22b0713866b8bbf19843589a043b2cf8971d34e79700f522d23",
        "display": {
            "cardFront": true
        },
        "name": "Block, Lot",
        "pos": 376832,
        "type": "text"
    },
    {
        "id": "5bc73ee0dc534219ee22ed6d",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "e8620327b22fc5e743a35720260ad7f03a0edaef6e64e3c47f37f04f09ce4747",
        "display": {
            "cardFront": true
        },
        "name": "Status",
        "pos": 393216,
        "options": [
            {
                "id": "5bc73ee0dc534219ee22ed6f",
                "idCustomField": "5bc73ee0dc534219ee22ed6d",
                "value": {
                    "text": "In Process"
                },
                "color": "green",
                "pos": 16384
            },
            {
                "id": "5bc73ee0dc534219ee22ed70",
                "idCustomField": "5bc73ee0dc534219ee22ed6d",
                "value": {
                    "text": "In Review"
                },
                "color": "black",
                "pos": 32768
            },
            {
                "id": "5bc73ee0dc534219ee22ed71",
                "idCustomField": "5bc73ee0dc534219ee22ed6d",
                "value": {
                    "text": "Ready For Corrections"
                },
                "color": "pink",
                "pos": 40960
            },
            {
                "id": "5bc73ee0dc534219ee22ed72",
                "idCustomField": "5bc73ee0dc534219ee22ed6d",
                "value": {
                    "text": "Done"
                },
                "color": "lime",
                "pos": 49152
            },
            {
                "id": "5bc73ee0dc534219ee22ed73",
                "idCustomField": "5bc73ee0dc534219ee22ed6d",
                "value": {
                    "text": "Revision"
                },
                "color": "orange",
                "pos": 65536
            },
            {
                "id": "5bc73ee0dc534219ee22ed74",
                "idCustomField": "5bc73ee0dc534219ee22ed6d",
                "value": {
                    "text": "Warranty"
                },
                "color": "yellow",
                "pos": 81920
            }
        ],
        "type": "list"
    },
    {
        "id": "5bd1dfaaadca5c8ed35e5a7f",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "9af8c16ef5959c9f710f70782092a7d03219ef49a903766883be460b3dda5d79",
        "display": {
            "cardFront": false
        },
        "name": "Job Number",
        "pos": 409600,
        "type": "number"
    },
    {
        "id": "5bd762bd613f2c87c6b286d0",
        "idModel": "57f2fd06aade19f31077c457",
        "modelType": "board",
        "fieldGroup": "9705c59bcb515186b92da7dd1bd6cbefb9912bff640dd32b4feaaf561d069653",
        "display": {
            "cardFront": true
        },
        "name": "Floor Type",
        "pos": 425984,
        "options": [
            {
                "id": "5bd762bd613f2c87c6b286d2",
                "idCustomField": "5bd762bd613f2c87c6b286d0",
                "value": {
                    "text": "Truss"
                },
                "color": "red",
                "pos": 16384
            },
            {
                "id": "5bd762bd613f2c87c6b286d3",
                "idCustomField": "5bd762bd613f2c87c6b286d0",
                "value": {
                    "text": "TJI"
                },
                "color": "lime",
                "pos": 32768
            },
            {
                "id": "5bd762bd613f2c87c6b286d4",
                "idCustomField": "5bd762bd613f2c87c6b286d0",
                "value": {
                    "text": "Stick"
                },
                "color": "sky",
                "pos": 49152
            }
        ],
        "type": "list"
    }
]
}
