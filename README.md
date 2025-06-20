# Equipment Management System
A comprehensive equipment management solution built with SAP RAP (RESTFUL ABAP Programming) backend and SAP UI5 frontend, featuring custom workflow actions for maintenance task management.

## Architecture
- **Business Object**: Equipment with associated maintenance tasks
- **OData V4 Service**: RESTful API with annotations
- **Actions**: Custom RAP actions for status transitions
  - `reopenTask`: DONE → OPEN
  - `startProgress`: OPEN → IN_PROGRESS  
  - `completeTask`: OPEN/IN_PROGRESS → DONE
- **Fiori Elements**: List Report and Object Pages
- **Custom Extensions**: Workflow button with status change dialog
