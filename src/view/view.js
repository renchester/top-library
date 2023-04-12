const LibraryView = (() => {
  const btnAddBook = document.querySelector('.btn--add-book');
  const btnSignIn = document.querySelector('.btn--sign-in');
  const btnSignOut = document.querySelector('.btn--sign-out');
  const accountDetailsEl = document.querySelector('.library--user');

  function clearHTML(el) {
    el.innerHTML = '';
  }

  function hideEl(el) {
    el.classList.add('hidden');
  }

  function showEl(el) {
    el.classList.remove('hidden');
  }

  function addHandlerAddBook(handler) {
    btnAddBook.addEventListener('click', (e) => {
      e.preventDefault();

      // Get values from form input
      const formEl = document.querySelector('.form--add-book');
      const formData = new FormData(formEl);

      const inputTitle = formData.get('book_title');
      const inputAuthor = formData.get('book_author');
      const inputStatus = formData.get('book_status');

      // Guard clause
      if (!inputTitle || !inputAuthor) return;

      const newBook = {
        title: inputTitle,
        author: inputAuthor,
        status: inputStatus,
      };

      handler(newBook);
      formEl.reset();
    });
  }

  function addHandlerChangeBookStatus(handler) {
    document.querySelectorAll('.select--new-status').forEach((btn) =>
      btn.addEventListener('change', (e) => {
        const parentID = e.target.closest('.book-row').dataset.id;
        const newStatus = e.target.value;

        handler(parentID, newStatus);
      }),
    );
  }

  function addHandlerDeleteBook(handler) {
    document.querySelectorAll('.book-delete').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const parentID = e.target.closest('.book-row').dataset.id;

        handler(parentID);
      }),
    );
  }

  function addHandlerSignIn(handler) {
    btnSignIn.addEventListener('click', () => {
      handler();
    });
  }

  function addHandlerSignOut(handler) {
    btnSignOut.addEventListener('click', () => {
      handler();
    });
  }

  function printUserDetails(name, photoURL) {
    return `
       <img src=${photoURL} alt="User profile for ${name}" class="library--prof-pic" />
       <h2 class="library-welcome">Hello, ${name}!</h2>
    `;
  }

  function displayUserDetails(name, photoURL) {
    // Toggle sign buttons
    hideEl(btnSignIn);
    showEl(btnSignOut);

    clearHTML(accountDetailsEl);
    accountDetailsEl.insertAdjacentHTML(
      'afterbegin',
      printUserDetails(name, photoURL),
    );
    showEl(accountDetailsEl);
  }

  function hideUserDetails() {
    hideEl(btnSignOut);
    showEl(btnSignIn);

    hideEl(accountDetailsEl);
    clearHTML(accountDetailsEl);
  }

  const emptyBookRow = `
                <tr class="book-row" data-id="123456">
                  <td>
                    <div class="book-row--empty">
                      You have not added any books yet
                    </div>
                  </td>
                </tr>`;

  function printBookHTML(book) {
    return `<tr class="book-row" data-id="${book.bookID}">
              <td class="book-title">${book.title}</td>
              <td class="book-author">${book.author}</td>
              <td class="book-status">
                <select name="book_new-status" id="book_${
                  book.bookID
                }new-status"
                class="select--new-status status-${book.status}">
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
              <td class="wrapper--book-delete">
                  <button class="book-delete">Delete</button>
              </td>
            </tr>`;
  }

  function updateLogs(libraryLogs) {
    const { booksRead, booksReading, booksUnread, libraryLength } = libraryLogs;

    const readEl = document.querySelector('.log-read');
    const readingEl = document.querySelector('.log-reading');
    const unreadEl = document.querySelector('.log-unread');
    const booksEl = document.querySelector('.log-amount');

    readEl.textContent = booksRead || '0';
    readingEl.textContent = booksReading || '0';
    unreadEl.textContent = booksUnread || '0';
    booksEl.textContent = libraryLength || '0';
  }

  function displayBooks(myLibrary, libraryLogs) {
    const libTable = document.querySelector('.library-table');
    const tableBody = libTable.querySelector('tbody');
    const libraryHTML = [];

    if (!myLibrary) return;

    // Clear table body
    clearHTML(tableBody);

    // Generate HTML of the books to display
    myLibrary.forEach((book) => {
      const bookHTML = printBookHTML(book);
      libraryHTML.push(bookHTML);
    });

    // Insert to tableBody
    if (libraryHTML.length < 1) {
      tableBody.insertAdjacentHTML('afterbegin', emptyBookRow);
    } else {
      tableBody.insertAdjacentHTML('afterbegin', libraryHTML.join(''));
    }

    // Update library logs
    updateLogs(libraryLogs);
  }

  return {
    addHandlerSignIn,
    addHandlerSignOut,
    addHandlerAddBook,
    addHandlerChangeBookStatus,
    addHandlerDeleteBook,
    displayBooks,
    displayUserDetails,
    hideUserDetails,
  };
})();

export default LibraryView;
