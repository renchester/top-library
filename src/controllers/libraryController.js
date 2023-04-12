/* eslint-disable no-use-before-define */

import LocalLibraryModel from '../model/localLibraryModel';
import CloudLibraryModel from '../model/cloudLibraryModel';

import LibraryView from '../view/view';
import '../css/style.css';

const LibraryController = (() => {
  let isSignedIn;
  let currentModel;
  let currentUserId;

  const ctrlDisplayBooks = async () => {
    // Only the cloud library makes use of the currentUserId
    // For local storage, the userId is 'local' and does not get used
    const myLibrary = await currentModel.getLibrary(currentUserId);

    const libraryLogs = currentModel.getLibraryLogs(myLibrary);

    LibraryView.displayBooks(myLibrary, libraryLogs);
    LibraryView.addHandlerChangeBookStatus(ctrlChangeBookStatus);
    LibraryView.addHandlerDeleteBook(ctrlDeleteBook);
  };

  const ctrlChangeBookStatus = (bookId, newStatus) => {
    currentModel.toggleStatus(bookId, newStatus, currentUserId);

    ctrlDisplayBooks();
  };

  const ctrlDeleteBook = (id) => {
    currentModel.deleteBook(id, currentUserId);

    ctrlDisplayBooks();
  };

  const ctrlAddBookToLibrary = (newBook) => {
    // Only the cloud library makes use of the currentUserId
    currentModel.addBookToLibrary(newBook, currentUserId);

    ctrlDisplayBooks();
  };

  const initializeLibrary = (userId, signInStatus = false) => {
    isSignedIn = signInStatus;
    currentUserId = userId;
    currentModel = isSignedIn ? CloudLibraryModel : LocalLibraryModel;

    ctrlDisplayBooks();

    LibraryView.addHandlerAddBook(ctrlAddBookToLibrary);
  };

  return {
    initializeLibrary,
  };
})();

export default LibraryController;
