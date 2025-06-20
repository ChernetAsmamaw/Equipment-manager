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

## Screen Shots
![image](https://github.com/user-attachments/assets/b3087973-407d-4d3a-ba11-d483e9208165)
![image](https://github.com/user-attachments/assets/8775092d-2950-46af-a1b0-0c85f25d6135)
![image](https://github.com/user-attachments/assets/36e02083-8c00-4741-88b7-03e3c47f036a)
![image](https://github.com/user-attachments/assets/bbc5e68e-6443-4f5e-989c-df843dc23997)
![image](https://github.com/user-attachments/assets/91a65831-c2f8-472a-b08c-fdec084d6cca)

