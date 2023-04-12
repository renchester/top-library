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

  function initializeAuth() {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const photoURL = getProfilePhotoURL();
        const name = getUserName();

        LibraryView.displayUserDetails(name, photoURL);
      } else {
        LibraryView.hideUserDetails();
      }
    });

    LibraryView.addHandlerSignIn(signIn);
    LibraryView.addHandlerSignOut(signOutUser);
  }

  return {
    signIn,
    signOutUser,
    initializeAuth,
  };
})();

export default AuthController;

// export function getUserDetails() {
//   if (user) {
//     const { displayName, email, photoURL, emailVerified, uid } = user;

//     return {
//       displayName,
//       email,
//       photoURL,
//       emailVerified,
//       uid,
//     };
//   }

//   return null;
// }
