export function saveToStorage(myLibrary, title) {
  localStorage.setItem(title, JSON.stringify(myLibrary));
}

export function getLibraryFromStorage() {
  const lib = JSON.parse(localStorage.getItem('library'));

  if (!lib || lib.length <= 0) return null;

  return lib;
}
