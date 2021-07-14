'use strict';

// DOM Selectors

const bookCards = document.querySelectorAll('.book-card');
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

  form.reset();
  hideForm();
}

function displayBooks() {}

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
  formContainer.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function validateBook(arr) {
  console.log(arr);
  const [title, author, pages, readStatus] = arr;

  if (!title) {
    const titleError = 1;
  }
}

const book1 = new Book(
  'One Hundred Years of Solitude',
  'Gabriel Garcia Marquez',
  315,
  true
);

// Event Listeners
bookCards.forEach((book) => {
  book.addEventListener('mouseover', hoverOnBook);
  book.addEventListener('mouseout', hoverOnBook);
});

btnAddBook.addEventListener('click', showForm);

btnSubmit.addEventListener('click', addBookToLibrary);

overlay.addEventListener('click', hideForm);
