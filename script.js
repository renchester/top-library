'use strict';

// DOM Selectors

const bookCards = document.querySelectorAll('.book-card');
const btnAddBook = document.querySelector('.btn-add-book');

// State

let myLibrary = [];

function Book(title, author, pages, hasRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(e) {
  console.log(e);
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
