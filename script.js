'use strict';

function Book(title, author, status) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.bookID = `ID${Math.random().toString(16).slice(2)}`;
}

const myLibrary = [
  {
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    status: 'read',
    bookID: '123456',
  },
  {
    title: 'Phantom',
    author: 'Simon White',
    status: 'read',
    bookID: '654321',
  },
];

/*

DISPLAY FUNCTIONS

*/

function printBookHTML(book) {
  return `<tr class="book-row" data-id="${book.bookID}">
              <td class="book-title">${book.title}</td>
              <td class="book-author">${book.author}y</td>
              <td class="book-status status-${book.status}">
                <select name="book_new-status" id="book_${
                  book.bookID
                }new-status"
                class="select--new-status">
                  <option value="read" ${
                    book.status === 'read' ? 'selected' : ''
                  } >Read</option>
                  <option value="reading"  ${
                    book.status === 'reading' ? 'selected' : ''
                  }>Currently Reading</option>
                  <option value="unread"  ${
                    book.status === 'unread' ? 'selected' : ''
                  }>Unread</option>
                </select>
              </td>  
              <td class="book-delete">Delete</td>
            </tr>`;
}

function clearHTML(el) {
  el.innerHTML = '';
}

function clearValue(...inputArr) {
  inputArr.forEach((input) => (input.value = ''));
}

function displayBooks() {
  const libTable = document.querySelector('.library-table');
  const tableBody = libTable.querySelector('tbody');
  const libraryHTMl = [];

  // Clear table body
  clearHTML(tableBody);

  // Generate HTML of the books to display
  myLibrary.forEach((book) => {
    const bookHTML = printBookHTML(book);
    libraryHTMl.push(bookHTML);
  });

  // Insert to tableBody
  tableBody.insertAdjacentHTML('afterbegin', libraryHTMl.join(''));

  // Add event handlers
  document
    .querySelectorAll('.select--new-status')
    .forEach((btn) => btn.addEventListener('change', toggleStatus));

  document
    .querySelectorAll('.book-delete')
    .forEach((btn) => btn.addEventListener('click', deleteBook));
}

/*

MAIN LIBRARY FUNCTIONS

*/

function addBookToLibrary(e) {
  e.preventDefault();

  // Get values from form input
  const inputTitle = document.querySelector('#book_title');
  const inputAuthor = document.querySelector('#book_author');
  const inputStatus = document.querySelector('#book_status');

  // Guard clause
  if (!inputTitle.value || !inputAuthor.value) return;

  // Create book from constructor
  const newBook = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputStatus.value,
  );

  // Push to library array
  myLibrary.push(newBook);

  // Clear form
  clearValue(inputTitle, inputAuthor);

  // Display books
  displayBooks();

  // Add event handlers to newly generated buttons
  document
    .querySelectorAll('.select--new-status')
    .forEach((btn) => btn.addEventListener('change', toggleStatus));

  document
    .querySelectorAll('.book-delete')
    .forEach((btn) => btn.addEventListener('click', deleteBook));
}

function toggleStatus(e) {
  const parentID = e.target.closest('.book-row').dataset.id;
  const targetIndex = myLibrary.findIndex((book) => book.bookID === parentID);
  const targetBook = myLibrary[targetIndex];

  const oldStatus = targetBook.status;
  const newStatus = e.target.value;

  targetBook.status = newStatus;

  // Toggle display
  e.target
    .closest('.book-status')
    .classList.replace(`status-${oldStatus}`, `status-${newStatus}`);

  displayBooks();
}

function deleteBook(e) {
  const parentID = e.target.closest('.book-row').dataset.id;
  const targetIndex = myLibrary.findIndex((book) => book.bookID === parentID);

  delete myLibrary[targetIndex];

  displayBooks();
}

// Event Handlers

const btnAddBook = document.querySelector('.btn--add-book');
btnAddBook.addEventListener('click', addBookToLibrary);

// init
displayBooks();
