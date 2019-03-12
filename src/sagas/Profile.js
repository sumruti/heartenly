import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import {getuserbyid} from "../apis/Profile";

import {
  GET_USER_PROFILE_BY_ID
} from "../constants/ActionTypes";

import {getuserprofilebyidsuccess } from "../actions/Profile";


  

function* get_user_by_id({payload}) {
  const {user_id} = payload;


  try {
    const signUpUser = yield call(getuserbyid, user_id);
      yield put(getuserprofilebyidsuccess(signUpUser.data));
   
  } catch (error) {
    //yield put(showAuthMessage(error));
  }
}



export function* createUserAccount() {
  yield takeEvery(GET_USER_PROFILE_BY_ID, get_user_by_id);
}



export default function* rootSaga() {
  yield all([
    fork(createUserAccount)])
  
}