import { saveToStorage, getLibraryFromStorage } from '../localStorage';

let myLibrary = getLibraryFromStorage() || [];

class Book {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.bookID = `ID${Math.random().toString(16).slice(2)}`;
  }
}

export function getLibrary() {
  return myLibrary;
}

export function addBookToLibrary(book) {
  const { title, author, status } = book;

  // Create book from constructor
  const newBook = new Book(title, author, status);

  // Push to library array & set to local storage
  myLibrary.push(newBook);
  saveToStorage(myLibrary, 'library');
}

export function toggleStatus(id, newStatus) {
  const targetBook = myLibrary.find((book) => (book.bookID = id));

  targetBook.status = newStatus;
  saveToStorage(myLibrary, 'library');
}

export function deleteBook(id) {
  myLibrary = myLibrary.filter((book) => book.bookID !== id);

  saveToStorage(myLibrary, 'library');
}

export function getLibraryLogs() {
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
