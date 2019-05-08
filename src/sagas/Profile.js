import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import {getuserbyid,edituserprofile,verfyMoNo , verfyotp} from "../apis/Profile";

import {
  GET_USER_PROFILE_BY_ID,
  EDIT_USER_PROFILE,
  VERIFY_MOBILE_NO,
  VERIFY_OTP
} from "../constants/ActionTypes";

import {getuserprofilebyidsuccess , edit_user_profile_success,verify_mobile_no_success , verify_otp_no_success} from "../actions/Profile";
import {showAuthMessage } from "../actions/Auth";


  

function* get_user_by_id({payload}) {
  const {user_id} = payload;


  try {
    const signUpUser = yield call(getuserbyid, user_id);
      yield put(getuserprofilebyidsuccess(signUpUser));
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* edit_user_profile({payload}) {
//  console.log(payload);
  const {user_id,username,useremail,fullName,gender,DOB,religion,status,wanna_find,child,address,pictures,CameraImg} = payload;

  console.log(payload)

  try {
     const profile_update = yield call(edituserprofile, user_id, username,useremail,fullName,gender,DOB,religion,status,wanna_find,child,address,pictures,CameraImg);
      console.log(profile_update)
      yield put(edit_user_profile_success(profile_update.data.message));
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* verify_mobile_no({payload}) {
//  console.log(payload);
  const {otp,user_id} = payload;
  console.log(payload)



  try {
     const profile_update = yield call(verfyMoNo, otp,user_id);
      yield put(verify_mobile_no_success(profile_update.data.status));
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* verify_otp_no({payload}) {
  console.log(payload);
  const {otp,user_id} = payload;



  try {
     const profile_update = yield call(verfyotp, otp,user_id);
      console.log(profile_update)
      yield put(verify_otp_no_success(profile_update.data));
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}



export function* createUserAccount() {
  yield takeEvery(GET_USER_PROFILE_BY_ID, get_user_by_id);
}

export function* EditUserProfile() {
  yield takeEvery(EDIT_USER_PROFILE, edit_user_profile);
}

export function* VerifyMobileNo() {
  yield takeEvery(VERIFY_MOBILE_NO, verify_mobile_no);
}

export function* VerifyOTP() {
  yield takeEvery(VERIFY_OTP, verify_otp_no);
}



export default function* rootSaga() {
  yield all([
    fork(createUserAccount),
    fork(EditUserProfile),
    fork(VerifyMobileNo),
    fork(VerifyOTP),
    ])
  
}