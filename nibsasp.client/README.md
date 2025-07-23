NIBS Internal Project Tracking Application

SETUP:
Download Repo, should include 2 projects with the SLN file. A client and ASP Server. 
Right click the top level "Solution nibsASP" and select properties, ensure that Mutiple Startup projects is selected.
Inside .ENV file in the Client solution, adjust the environment variable of the API URl to port number found after your first start up of application. Port number can be found in URL of the window that opens with Swagger documentation.

OVERVIEW:
ASP Server is written in ASP.NetCore and code in C#.
React Client is written in React 19, using minimal extraneous components to run the UI.
One assumption made toward this project was the requirement of a search/filter for Status within the Data Table.
A small text field is available under the header that will filter results as typed. Initially I had included a sub header search field but that search field would filter ALL fields instead of the requested column. Additional filtering can be added on a per column bases. 
Form validation checks that the fields are filled in, date field will not allow any input but a date, and dropfield only accepts dropdown inputs.

Each row can be edited separatedly from the others without need for a secondary page. A modal opens prepopulated with the data and user only needs to make changes and close modal. Data Table updates without refresh.
Creation requires refresh to fetch and repopulate Data Table with new IDs from creation process. Delete will remove records without refresh. Instead of an edit page a edit modal was included for smoother user experience.
Seamless UI and Data control are a hallmark of React and I wanted to showcase that, rather than creating a CRUD app with various pages, many of the CRUD functions are available as a Single Page Application.
A button located within Description column will take a user to a page specific to that Project, satisfiying the GetByID REST API requirement.

Database setup is included in Migrations Folder that holds migrations scripts using EFCore.