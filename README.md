# thinQCodingChallenge

## Description of the Application
I used Calendarific's public API to create a table filled with some information about U.S. Holidays in 2019; namely, the holiday's name, the date on which the holiday occurs, and the holiday's type (e.g., Observance). The table can be filtered by specific characters, by a specific month, and by a specific type of holiday.

## High-level Description of the Implementation
### Setting up the Database
  * MySQL was used as the primary database.
  * The following files were used to set up the database:
    * create_db.js
    * create_table.js
    * delete_column.js
    * delete_table.js
        * the above two files were used for debugging, but also provide ways to delete a column and/or table.
### Requesting from a Public API
  * The following files were used to access a public API (calendarific)
    * add_to_table.js
      * Description: The code makes use of promises, such that when a response was received by making a request to that public API, we are then able to populate
          the table in the database without worrying about the problem where the table attempts to get populated before actually receiving a response.
### Client and Server Communication
  * The following files were used to set up the server and client code as well as to establish communication between the two:
    * server.js
      * Description: this file was used to set up the server. ExpressJS was used for easy and simple implementation. Sockets were included so that the server could receive signals from the client, who wants to request some information, so that it knows to retrieve that information from the database and sending that to the client.
    * sockets.js
      * Description: the file is part of the client-side code. The purpose of this file is to send requests to the server, asking for some specific information, and using that information to update the UI accordingly.
### Front-End Design
  * The following files were used as a template for the application:
    * index.html
    * styles.css
      * These files made use of bootstrap to achieve an aesthetic look.
