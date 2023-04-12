import LibraryController from './controllers/libraryController';
import AuthController from './controllers/authController';

import './css/style.css';

const init = () => {
  LibraryController.initializeLibrary();
  AuthController.initializeAuth();
};

init();
