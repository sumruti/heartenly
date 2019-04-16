import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import {signupUser} from "../apis/Signup";
import {loginUser} from "../apis/SignIn";
import {forgot_password} from "../apis/ForgotPassword";
import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider
} from "../firebase/firebase";
import {
  SIGNIN_FACEBOOK_USER,
  SIGNIN_GITHUB_USER,
  SIGNIN_GOOGLE_USER,
  SIGNIN_TWITTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  FORGOT_PASSWORD
} from "../constants/ActionTypes";
import {showAuthMessage,showSuccessMessage, userSignInSuccess, userSignOutSuccess, userSignUpSuccess , forgot_Password_success} from "../actions/Auth";
import {
  userFacebookSignInSuccess,
  userGithubSignInSuccess,
  userGoogleSignInSuccess,
  userTwitterSignInSuccess
} from "../actions/Auth";

const createUserWithEmailPasswordRequest = async (email, password) =>
  await  auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

/*const createUserWithEmailPasswordRequest = async (email) =>
  await  auth.createUserWithEmailAndPassword(email)
    .then(authUser => authUser)
    .catch(error => error); */   

const signInUserWithEmailPasswordRequest = async (email, password) =>
  await  auth.signInWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

const signOutRequest = async () =>
  await  auth.signOut()
    .then(authUser => authUser)
    .catch(error => error);


const signInUserWithGoogleRequest = async () =>
  await  auth.signInWithPopup(googleAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithFacebookRequest = async () =>
  await  auth.signInWithPopup(facebookAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithGithubRequest = async () =>
  await  auth.signInWithPopup(githubAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithTwitterRequest = async () =>
  await  auth.signInWithPopup(twitterAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);


function* forgotPassword({payload}) {
   const {email} = payload;

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)){
      yield put(showAuthMessage("The email address is badly formatted."));
      return false
    }

  try {
    const forgot_pass = yield call(forgot_password, email);

     console.log(forgot_pass.data);
   
     
    if (forgot_pass.data.status==false) {
      yield put(showAuthMessage(forgot_pass.data.message));
    } else {
      yield put(showSuccessMessage(forgot_pass.data.message));
      yield put(forgot_Password_success(forgot_pass.data.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }

}    

function* createUserWithEmailPassword({payload}) {
  const {username,status, email, mobileNo, password} = payload;
  
  if(!username.trim()){
    yield put(showAuthMessage("Please enter Username."));
    return false
  }
  if(!status){
      yield put(showAuthMessage("Please enter Status."));
      return false
  }
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)){
    yield put(showAuthMessage("The email address is badly formatted."));
    return false
  }

  if (!mobileNo.trim()) {
      yield put(showAuthMessage("Please enter phone number"));
      return false
  } 
  if(!password.trim()){
      yield put(showAuthMessage("Please enter password "));
      return false
  }

  try {
    const signUpUser = yield call(signupUser, username,status,email,mobileNo, password);

     console.log(signUpUser.data);
     
    if (signUpUser.data.status==false) {
      yield put(showAuthMessage(signUpUser.data.message));
    } else {
      localStorage.setItem('user_id', signUpUser.data.user_id);
      yield put(userSignUpSuccess(signUpUser.data.user_id));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithGoogle() {
  try {
    const signUpUser = yield call(signInUserWithGoogleRequest);
    console.log(signUpUser.user.email, '',signUpUser.user.uid,signUpUser.user.displayName)
    const signInUser = yield call(loginUser, signUpUser.user.email, '',signUpUser.user.uid,signUpUser.user.displayName,'GOOGLE');

    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signInUser.data.user_id);
      yield put(userGoogleSignInSuccess(signInUser.data.user_id));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* signInUserWithFacebook() {
  try {
    const signUpUser = yield call(signInUserWithFacebookRequest);
        const signInUser = yield call(loginUser, signUpUser.user.email, '',signUpUser.user.uid,signUpUser.user.displayName,'FACEBOOK');

    console.log(signUpUser)
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signInUser.data.user_id);
      yield put(userFacebookSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* signInUserWithGithub() {
  try {
    const signUpUser = yield call(signInUserWithGithubRequest);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userGithubSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* signInUserWithTwitter() {
  try {
    const signUpUser = yield call(signInUserWithTwitterRequest);
    if (signUpUser.message) {
      if (signUpUser.message.length > 100) {
        yield put(showAuthMessage('Your request has been canceled.'));
      } else {
        yield put(showAuthMessage(signUpUser.message));
      }
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userTwitterSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithEmailPassword({payload}) {
  const {UserEmailMobile, password} = payload;
  //var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!UserEmailMobile){
    yield put(showAuthMessage("Please enter Username/Email/Mobile No"));
    return false
  }
  if(!password){
      yield put(showAuthMessage("Please enter password"));
      return false
    }  
    
  try {
    const signInUser = yield call(loginUser, UserEmailMobile, password , '','','EMAIL');

    if (signInUser.data.status==false) {
      yield put(showAuthMessage(signInUser.data.message));
    } else {
      localStorage.setItem('user_id', signInUser.data.user_id);
      yield put(userSignInSuccess(signInUser.data.user_id));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      localStorage.removeItem('user_id');
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* forgotpassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

export function* signInWithGoogle() {
  yield takeEvery(SIGNIN_GOOGLE_USER, signInUserWithGoogle);
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_FACEBOOK_USER, signInUserWithFacebook);
}

export function* signInWithTwitter() {
  yield takeEvery(SIGNIN_TWITTER_USER, signInUserWithTwitter);
}

export function* signInWithGithub() {
  yield takeEvery(SIGNIN_GITHUB_USER, signInUserWithGithub);
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
    fork(createUserAccount),
    fork(forgotpassword),
    fork(signInWithGoogle),
    fork(signInWithFacebook),
    fork(signInWithTwitter),
    fork(signInWithGithub),
    fork(signOutUser)]);
}