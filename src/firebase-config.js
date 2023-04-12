const config = {
  apiKey: 'AIzaSyAN0ICcOaD42kHYVZrX51ja-8-g2YEG2wY',
  authDomain: 'library-eac1c.firebaseapp.com',
  projectId: 'library-eac1c',
  storageBucket: 'library-eac1c.appspot.com',
  messagingSenderId: '294407295025',
  appId: '1:294407295025:web:591a5f987c44a457334510',
};

export default function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js",
    );
  } else {
    return config;
  }
}
