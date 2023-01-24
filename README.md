## The Odin Project

# Project: Library

**Live version** of the webapp can be found [here](https://renchester.github.io/top-library/)

This library app allows users to create a list of books that they are either reading, has read, or to be read. Built with HTML, CSS, and vanilla Javascript (also using the localStorage API to store user-input books).

### Features

Users are provided with a form that asks for the book's title and author, as well as the book's 'read' status. This information is stored in an array `myLibrary` which is then stored in the browser's local storage--made available for the next time the user wants to add a new book or change the book's status. A log of the library contents is also provided for an overview of the user's reading habits.

### Display

The books input by the user is displayed in a table with the book's title and author. The status of the book may be changed through a selection which will change the book's _status_ property in the `myLibrary` array. Next to the selection is a _delete_ button which allows the user to delete the book from the library.

![view of the page](img/library-view.png)

Developed by _Renchester Ramos_
