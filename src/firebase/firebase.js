import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBkuU8Vl22BQgPfrMdu9IK5Y8cGzOE6mvo',
  authDomain: 'voltaic-charter-228318.firebaseapp.com',
  databaseURL: 'https://voltaic-charter-228318.firebaseio.com',
  projectId: 'voltaic-charter-228318"',
  storageBucket: '',
  messagingSenderId: '50423982952'
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();
export {
  auth,
  database,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};