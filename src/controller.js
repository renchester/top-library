import {
  getLibrary,
  addBookToLibrary,
  toggleStatus,
  deleteBook,
  getLibraryLogs,
} from './model/model';

import LibraryView from './view';

import './css/style.css';

// Main Library Controllers

const ctrlChangeBookStatus = (id, newStatus) => {
  toggleStatus(id, newStatus);

  ctrlDisplayBooks();
};

const ctrlDeleteBook = (id) => {
  deleteBook(id);

  ctrlDisplayBooks();
};

const ctrlDisplayBooks = () => {
  const myLibrary = getLibrary();
  const libraryLogs = getLibraryLogs();

  LibraryView.displayBooks(myLibrary, libraryLogs);
  LibraryView.addHandlerChangeBookStatus(ctrlChangeBookStatus);
  LibraryView.addHandlerDeleteBook(ctrlDeleteBook);
};

const ctrlAddBookToLibrary = (newBook) => {
  addBookToLibrary(newBook);

  ctrlDisplayBooks();
};

const init = () => {
  ctrlDisplayBooks();
  LibraryView.addHandlerAddBook(ctrlAddBookToLibrary);
};

init();
