/* eslint-disable no-use-before-define */
import {
  getLibrary,
  addBookToLibrary,
  toggleStatus,
  deleteBook,
  getLibraryLogs,
} from '../model/libraryModel';

import LibraryView from '../view/view';
import '../css/style.css';

const LibraryController = (() => {
  const ctrlDisplayBooks = () => {
    const myLibrary = getLibrary();
    const libraryLogs = getLibraryLogs();

    LibraryView.displayBooks(myLibrary, libraryLogs);
    LibraryView.addHandlerChangeBookStatus(ctrlChangeBookStatus);
    LibraryView.addHandlerDeleteBook(ctrlDeleteBook);
  };

  const ctrlChangeBookStatus = (id, newStatus) => {
    toggleStatus(id, newStatus);

    ctrlDisplayBooks();
  };

  const ctrlDeleteBook = (id) => {
    deleteBook(id);

    ctrlDisplayBooks();
  };

  const ctrlAddBookToLibrary = (newBook) => {
    addBookToLibrary(newBook);

    ctrlDisplayBooks();
  };

  const initializeLibrary = () => {
    ctrlDisplayBooks();

    LibraryView.addHandlerAddBook(ctrlAddBookToLibrary);
  };

  return {
    initializeLibrary,
  };
})();

export default LibraryController;
