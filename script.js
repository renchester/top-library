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

// State

let myLibrary = [];

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

  myLibrary.push(book);
  displayBooks();

  form.reset();
  hideForm();
}

function delBookFromLibrary(e) {
  const bookToDelete = myLibrary.find(
    (book) =>
      `${book.author.split(' ').splice(-1, 1)}-${book.title}` ===
      e.target.closest('.book-card').dataset.id
  );

  const indexToDelete = myLibrary.indexOf(bookToDelete);

  myLibrary.splice(indexToDelete, 1);

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
        <div class="book">
          <p class="book-title">${book.title}</p>
          <p class="book-author">${book.author}</p>
          <div class="book-hover hidden">
            <div class="book-window">
              <p class="pages-wrapper">
                <span class="book-pages">${book.pages}</span> pages read since
              </p>
              <p class="book-start">July 30, 2021</p>
            </div>
            <button class="btn btn-del-book">
              <span class="material-icons icons-delete"> close </span>
            </button>
          </div>
        </div>
        <!-- <div class="book-info">
          <p class="book-has-read">60%</p>
        </div> -->
      </div>`
    )
  );

  addHover();
}

function addHover() {
  const bookCards = document.querySelectorAll('.book-card');
  const btnDelBook = document.querySelector('.btn-del-book');

  bookCards.forEach((book) => {
    book.addEventListener('mouseover', hoverOnBook);
    book.addEventListener('mouseout', hoverOnBook);
  });

  btnDelBook.addEventListener('click', delBookFromLibrary);
}

function hoverOnBook(e) {
  const book = document.querySelector('.book-hover');
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

function deleteErrors() {
  document
    .querySelectorAll('.error-message')
    .forEach((el) => (el.textContent = ''));
}

const book1 = new Book(
  'One Hundred Years of Solitude',
  'Gabriel Garcia Marquez',
  315,
  true
);

// Event Listeners

btnAddBook.addEventListener('click', showForm);

btnSubmit.addEventListener('click', addBookToLibrary);

overlay.addEventListener('click', hideForm);
