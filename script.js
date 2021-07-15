'use strict';

// DOM Selectors

const bookContainer = document.querySelector('.book-container');
const btnAddBook = document.querySelector('.btn-add-book');

const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form-book');
const btnSubmit = document.querySelector('.btn-submit');

const overlay = document.querySelector('.overlay');

const bookTitle = document.getElementById('input-title');
const bookAuthor = document.getElementById('input-author');
const bookPages = document.getElementById('input-pages');
const bookHasRead = document.getElementById('input-read');

const bookCount = document.querySelector('.log-count.total');
const booksRead = document.querySelector('.log-count.read');
const booksReading = document.querySelector('.log-count.reading');
const booksTBR = document.querySelector('.log-count.tbr');

// State

let myLibrary = [];
let idNum = 0;

function Book(title, author, pages, hasRead = 'read') {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(e) {
  e.preventDefault();

  const arr = [];
  form
    .querySelectorAll('.input-field')
    .forEach((field) => arr.push(field.value));

  if (!validateBook(arr)) return;

  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookHasRead.value
  );

  if (checkDuplication(book)) return;

  myLibrary.push(book);
  setLocalStorage();
  displayBooks();

  form.reset();
  hideForm();
}

function delBookFromLibrary(e) {
  const bookToDelete = matchBook(e);

  const indexToDelete = myLibrary.indexOf(bookToDelete);

  myLibrary.splice(indexToDelete, 1);

  setLocalStorage();
  displayBooks();
}

function displayBooks() {
  bookContainer.innerHTML = '';

  if (!myLibrary.length) return;

  myLibrary.forEach((book) =>
    bookContainer.insertAdjacentHTML(
      'afterbegin',
      ` 
      <div class="book-card" data-id="${book.author.split(' ').splice(-1, 1)}-${
        book.title
      }">
        <div class="book ${book.hasRead === 'read' ? 'book-has-read' : ''}">
          <p class="book-title">${book.title}</p>
          <p class="book-author">${book.author}</p>
          <div class="book-hover hidden">
            <div class="book-window">
              <p class="pages-wrapper">
                <span class="book-pages">${book.pages}</span> pages ${
        book.hasRead === 'tbr' ? 'to read' : book.hasRead
      }
              </p>
            </div>
            <button class="btn btn-del-book">
              <span class="material-icons icons-delete"> close </span>
            </button>
          </div>
        </div>
         <div class="book-info">
          <div class="toggle-read">
            <label for="read-status" class="toggle-label"
              ><span class="toggle-on">Mark as read:</span></label
            >
            <input type="checkbox" name="read-status" id="read-status" ${
              book.hasRead === 'read' ? 'checked' : ''
            }/>
          </div>
        </div>
      </div>`
    )
  );

  updateLogs();
  addBookEvents();
}

function updateLogs() {
  const readArr = myLibrary.filter((book) => book.hasRead === 'read');
  const readingArr = myLibrary.filter((book) => book.hasRead === 'reading');
  const tbrArr = myLibrary.filter((book) => book.hasRead === 'tbr');

  bookCount.textContent = myLibrary.length;
  booksRead.textContent = readArr.length;
  booksReading.textContent = readingArr.length;
  booksTBR.textContent = tbrArr.length;
}

function addBookEvents() {
  const bookCards = document.querySelectorAll('.book-card');

  bookCards.forEach((book) => {
    book.addEventListener('mouseover', hoverOnBook);
    book.addEventListener('mouseout', hoverOnBook);
  });

  bookCards.forEach((book) =>
    book
      .querySelector('.btn-del-book')
      .addEventListener('click', delBookFromLibrary)
  );

  bookCards.forEach((book) =>
    book.querySelector('#read-status').addEventListener('input', markAsRead)
  );
}

function hoverOnBook(e) {
  const book = e.target.closest('.book-card').querySelector('.book-hover');
  if (e.type === 'mouseover') {
    book.classList.remove('hidden');
  } else if (e.type === 'mouseout') {
    book.classList.add('hidden');
  }
}

function hideForm(e) {
  formContainer.classList.add('hidden');
  overlay.classList.add('hidden');
}

function showForm(e) {
  deleteErrors();
  formContainer.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function validateBook(arr) {
  const [title, author, pages, hasRead] = arr;

  deleteErrors();

  if (!title) {
    document.querySelector(
      '.error-message.error-title'
    ).textContent = `Title input is invalid.`;
  }

  if (!author) {
    document.querySelector(
      '.error-message.error-author'
    ).textContent = `Author input is invalid.`;
  }

  if (!hasRead || hasRead === 'none') {
    document.querySelector(
      '.error-message.error-read'
    ).textContent = `Read status input is invalid.`;
  }

  if (!title || !author || !hasRead) {
    return false;
  } else if (title && author && hasRead) {
    return true;
  }
}

function checkDuplication(book) {
  if (
    Array.from(document.querySelectorAll('.book-card')).find(
      (bookCard) =>
        bookCard.dataset.id ===
        `${book.author.split(' ').splice(-1, 1)}-${book.title}`
    )
  ) {
    alert("You've already added this book!");
    form.reset();
    return true;
  } else return false;
}

function deleteErrors() {
  document
    .querySelectorAll('.error-message')
    .forEach((el) => (el.textContent = ''));
}

function markAsRead(e) {
  const bookCard = e.target.closest('.book-card');
  const book = bookCard.querySelector('.book');
  const bookToMark = matchBook(e);
  const indexToMark = myLibrary.indexOf(bookToMark);

  book.classList.toggle('book-has-read');

  bookToMark.hasRead = bookToMark.hasRead !== 'read' ? 'read' : 'reading';

  myLibrary.splice(indexToMark, 1, bookToMark);

  setLocalStorage();
  displayBooks();
}

function matchBook(e) {
  return myLibrary.find(
    (book) =>
      e.target.closest('.book-card').dataset.id ===
      `${book.author.split(' ').splice(-1, 1)}-${book.title}`
  );
}

function setLocalStorage() {
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

function getLocalStorage() {
  let data = JSON.parse(localStorage.getItem('books'));

  if (!data) return;

  myLibrary = data;

  displayBooks();
}

getLocalStorage();

// Event Listeners

btnAddBook.addEventListener('click', showForm);

btnSubmit.addEventListener('click', addBookToLibrary);

overlay.addEventListener('click', hideForm);
