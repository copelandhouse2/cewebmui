# CE Webtools

Copeland Engineering Web Tools.

## v2.1.13 6/13/2023

- Enh: Revisions Screen: Email section with fields: Send Email?, Recipients, Closing Body
- Enh: Settings – Ability to set your preference: Send Email checkbox on or off as the default.
- Enh: Nodemailer plugin. Added and configured to send emails.
- Bug: Recents now updated when you save a revision.

## v2.1.12 3/1/2023

- Enh: Revision Dialog Screen: Now allows you to select multiple scope items for a revision.
- Enh: Project Screen: Now displays creation date and revisions of the scope item
- Enh: Project Screen: Now displays created by, creation date, last updated by, and last update date of the project. Mouse over the job number at the top of screen
- Enh: Custom Project Screen: Added Inspection and Inspection Billing contact
- Enh: Trello Update: Webtools will no longer move an updated card to bottom of current list. It will remain in its spot.

## v2.1.11 1/27/2023

- Enh: Client Details Screen: Ability to assign a main contact and billing contact to a client
- Enh: Custom and Volume Project Screen: Auto-populate main and billing contacts from client screen
- Enh: Custom Project Screen: Added Architect contact
- Bug: Revisions: fix revision query to pull revisions with a blank reason or responsibility
- Bug: City Maintenance: fix city query to pull cities with a blank state or blank country.
- Enh: City Maintenance: Added check to make sure state and country are filled in.
- Enh: Custom and Volume Project Screen: Removed the Save Only button. Rarely used.
- Enh: Revision Price field is now a text field to support per hour rates.

## v2.1.10 8/2/2022

- Alternate Party Billing field in Revision screen

## v2.1.9 4/11/2022

- Webtools Revisions in Trello card description
- Reformatting of Trello card description
- Master frame from custom screen. Now populates Trello custom fields.
- Restore the Delete Client Button. Limitations on Delete… only if client does not have assigned projects or comment history. If there are, you can only inactivate.

## v2.1.8 4/2/2022

- Redesign of the Client Maintenance Screen…
  - New card view and tabs to move between a dashboard, details, and history
  - Client Dashboard showing graphs of project, slab and revision counts per client
  - Client Tracking history. Basically, a comment section to store relationship management information.
- Master Frame choice in Custom Scope Screen
- Revision “Project” scope now says “Project Details” to be more clear
- New Rev Reasons: Address Change, CSI

## v2.1.7 12/10/2021

- Trello authorization fix. Eliminated global Trello call which was causing the last user who refreshes the screen to instantiate the Trello call with their token. Any other user submitting a call will end up using the other person's token, which in Trello looks like the other user requested the change. Now Passing user token to all Trello API calls. Trello call is now instantiated with the user token each time we use Trello API.

## v2.1.6 11/12/2021

- Trello authorization. Now users will authorize Webtools to leverage Trello account. Webtools will submit Trello requests on behalf of the user.
- Inspection Entry screen. Additional tailoring. Now submits Trello updates. After further review with Aaron though, still needs more work.
- Bug fix: Project Entry, in some cases, the city would take previous value entered if city was null on the subdivision. Fixed.
- Bug fix: City Maintenance screen update now works. A previous release must have broken the update feature.
- Project Entry: Classification field is now visible. You can choose the project classification. Also, added choices: Semi-Custom, Land Dev. If you pick Custom, Semi Custom, Land Dev, it defaults to the Custom screen view.
- Search by Fields now includes Last Updated By search field.
- Search Projects Results now has these fields visible: Classification, Creation Date, Last Updated By, Last Updated Date.
- Bug fix: Deleting a project now prompts a warning dialog.

# Known Bugs

- If you set the classification to a value that differs from the scope classifications, then webtools will “whitescreen”. I plan to fix in the next release by decoupling the scope items from the classification. But it is somewhat complicated. Now that the classification field is visible in the Search screen, you can actually adjust the value and fix the classification.

## v2.1.5 7/15/2021

- Project entry screen: subdivision selection now populates city
- Bug fix: Fixed the "white screen" bug. Happens when user opens as volume project, select custom project, then clear.
- Bug fix: Project copy now clears revision information on the newly created project.
- Bug fix: Project copy/edit now updates entered by, requestor, last updated by, created by to reflect the current user. Prior to the fix the copy/edit project did not update these fields and kept the old user info.
- Bug fix: Recent projects list now queries on last updated by.
- New Inspection List screen
- New Inspection Entry / Update screen.

## v2.1.4 11/29/2020

- Bug fix: Now can navigate to project from maintenance screens(Clients, Cities, Subs, Geotechs) via Recents screen. Originally, just showed blank page.
- Added results count on Project search screen.
- Bug fix: Could not add new client, sub, or city via the Add {client, sub, city} dialog boxes.

## v2.1.3 10/26/2020

- Bug fix: Client delete functionality

## v2.1.2 10/20/2020

- Backend developer change: Cleaned up actions / reducers files.
- Login screen now accepts <enter> key to submit
- Ability to add, change, delete clients
- Ability to add, change, delete cities
- Ability to add, change, delete subdivisions
- Ability to add, change, delete geotechs
- New revision reasons: CPR = Construction Phase Remediation
- New masonry choices: 25%, 40%. Support Pacesetter

## v2.1.1 9/6/2020

- Revisions are now in their own table. Will be easier and more accurate to query revisions from other programs like AutoCAD. Ralph, I will provide you the queries.
- Can edit and delete revisions. (this is more of a bug with the current release)
- Now has the ability to capture reason, responsibility, price, and designer.

## v2.1.0 7/21/2020

- Find field: supports the word ‘and’ inside a word like Brand or Andorra. Current release strips this out since ‘and’ is a keyword.
- Removed the Save Acknowledgement popup box (the one with the job number). This has been so annoying to Wyatt and Karie.
- When copying or selecting a card from Find or Recents list, the list automatically disappears.

## v2.0.3 6/30/2020

- Search screen: Freeze top header, side action columns, 1st data column.
- “Investigation Scheduling” added to Trello List drop down.
- Default Foundation scope section for New Volume project.
- Bug fix: Project validation improvement. If custom project, removed city requirement.
- Added validation to test for scope record prior to save / submit.

## v2.0.2 6/24/2020

- Bug fix: In some of the entries, the system didn’t save the scope record but the info was on the Trello card. This suggests that something failed when saving that child scope record. Issue: Pull in an existing project (Find or recents), then remember. All projects after this point lose scope record since ids are present. Scope record just keeps getting updated to the new project.
- Updated Sheets table.

## v2.0.1 6/23/2020

- Additional Options, Comments restored to show up on Trello card. Scope Description, which is a new field also displays if filled in.
- Temporary fix for ACAD tools integration: Populating Plan Type, Elevation at project level. Once Ralph’s changes go into Production, I can remove my code
- Search screen. Ability to change the records returned limit, or remove altogether. Default is 200. Use keyword limit:{number}. Or limit:no to turn off.

## v2.0.0 (Initial Release of new architecture) 6/22/2020

- New architecture (for developers) to manage the fields, field groups and views and actions. Definitions and relationships now stored in tables.
- Projects parent table and scope child table. Now can assign multiple scope items to the project. This is the BIG change.
- Volume Screen and Custom Screen
- Improved Search / Find view. Supports column moving.
- Recents pane
- Bug fix: dups search now does fuzzy search on address.
- Revisions support with history tracking.
