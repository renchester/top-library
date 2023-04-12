// Local storage functions
function saveToStorage(myLibrary, title) {
  localStorage.setItem(title, JSON.stringify(myLibrary));
}

function getLibraryFromStorage() {
  const lib = JSON.parse(localStorage.getItem('library'));

  if (!lib || lib.length <= 0) return null;

  return lib;
}

const LocalLibraryModel = (() => {
  let myLibrary;

  myLibrary = getLibraryFromStorage() || [];

  class Book {
    constructor(title, author, status) {
      this.title = title;
      this.author = author;
      this.status = status;
      this.bookID = `ID${Math.random().toString(16).slice(2)}`;
    }
  }

  function getLibrary() {
    return myLibrary;
  }

  function addBookToLibrary(book) {
    const { title, author, status } = book;

    // Create book from constructor
    const newBook = new Book(title, author, status);

    // Push to library array & set to local storage
    myLibrary.push(newBook);
    saveToStorage(myLibrary, 'library');
  }

  function toggleStatus(id, newStatus) {
    const targetBook = myLibrary.find((book) => book.bookID === id);

    targetBook.status = newStatus;
    saveToStorage(myLibrary, 'library');
  }

  function deleteBook(id) {
    myLibrary = myLibrary.filter((book) => book.bookID !== id);

    saveToStorage(myLibrary, 'library');
  }

  function getLibraryLogs() {
    const booksRead = myLibrary.filter((book) => book.status === 'read').length;
    const booksReading = myLibrary.filter(
      (book) => book.status === 'reading',
    ).length;
    const booksUnread = myLibrary.filter(
      (book) => book.status === 'unread',
    ).length;
    const libraryLength = myLibrary.length;

    return {
      booksRead,
      booksReading,
      booksUnread,
      libraryLength,
    };
  }

  return {
    getLibrary,
    addBookToLibrary,
    toggleStatus,
    deleteBook,
    getLibraryLogs,
  };
})();

export default LocalLibraryModel;
