import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import getFirebaseConfig from '../firebase-config';

import LibraryView from '../view/view';
import LibraryController from './libraryController';

const AuthController = (() => {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  async function signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  function signOutUser() {
    signOut(auth);
  }

  function getProfilePhotoURL() {
    return auth.currentUser.photoURL;
  }

  function getUserName() {
    return auth.currentUser.displayName;
  }

  function getUserID() {
    return auth.currentUser.uid;
  }

  function initializeAuth() {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const photoURL = getProfilePhotoURL();
        const name = getUserName();
        const userID = getUserID();

        LibraryView.displayUserDetails(name, photoURL);
        LibraryController.initializeLibrary(userID, !!authUser);
      } else {
        LibraryView.hideUserDetails();
        LibraryController.initializeLibrary('local', !!authUser);
      }
    });

    LibraryView.addHandlerSignIn(signIn);
    LibraryView.addHandlerSignOut(signOutUser);
  }

  return {
    signIn,
    signOutUser,
    initializeAuth,
    getUserID,
  };
})();

export default AuthController;
