'use strict';

// DOM Selectors

const bookCards = document.querySelectorAll('.book-card');
const btnAddBook = document.querySelector('.btn-add-book');

const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form-book');
const btnSubmit = document.querySelector('.btn-submit');

const overlay = document.querySelector('.overlay');

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
  formContainer.classList.remove('hidden');

  const bookTitle = document.getElementById('input-title').value;
  const bookAuthor = document.getElementById('input-author').value;
  const bookPages = document.getElementById('input-pages').value;
  const bookHasRead = document.getElementById('input-read').value;

  const book = new Book(bookTitle, bookAuthor, bookPages, bookHasRead);
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

function toggleFormDisplay(e) {
  if (e.target.classList.contains('form-book')) return;
  formContainer.classList.add('hidden');
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
btnAddBook.addEventListener('click', addBookToLibrary);

btnSubmit.addEventListener('click', addBookToLibrary);

formContainer.addEventListener('click', toggleFormDisplay);
