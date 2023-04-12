import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import getFirebaseConfig from '../firebase-config';

const CloudLibraryModel = (() => {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  class Book {
    constructor(title, author, status) {
      this.title = title;
      this.author = author;
      this.status = status;
      this.bookID = `ID${Math.random().toString(16).slice(2)}`;
    }
  }

  const bookConverter = {
    toFirestore: (book) => ({
      title: book.title,
      author: book.author,
      status: book.status,
      bookID: book.bookID,
      timestamp: serverTimestamp(),
    }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Book(
        data.title,
        data.author,
        data.status,
        data.bookID,
        data.timestamp,
      );
    },
  };

  async function getLibrary(userId) {
    const myLibrary = [];

    const ref = query(
      collection(db, `users/${userId}/library`),
      orderBy('timestamp', 'desc'),
    );
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((book) => myLibrary.push(book.data()));

    return myLibrary;
  }

  async function addBookToLibrary(book, userId) {
    const { title, author, status } = book;

    const newBook = new Book(title, author, status);

    try {
      const ref = doc(
        db,
        `users/${userId}/library`,
        newBook.bookID,
      ).withConverter(bookConverter);

      await setDoc(ref, newBook);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error adding book:', e);
    }
  }

  async function toggleStatus(bookId, newStatus, userId) {
    try {
      const ref = doc(db, `users/${userId}/library`, bookId).withConverter(
        bookConverter,
      );
      await updateDoc(ref, {
        status: newStatus,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error setting book status:', e);
    }
  }

  async function deleteBook(bookId, userId) {
    try {
      const ref = doc(db, `users/${userId}/library`, bookId).withConverter(
        bookConverter,
      );
      await deleteDoc(ref);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error deleting book:', e);
    }
  }

  function getLibraryLogs(libraryArray) {
    const booksRead = libraryArray.filter(
      (book) => book.status === 'read',
    ).length;
    const booksReading = libraryArray.filter(
      (book) => book.status === 'reading',
    ).length;
    const booksUnread = libraryArray.filter(
      (book) => book.status === 'unread',
    ).length;
    const libraryLength = libraryArray.length;

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

export default CloudLibraryModel;
