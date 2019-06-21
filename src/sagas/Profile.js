import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import swal from 'sweetalert';
import {getuserbyid,edituserprofile,verfyMoNo , verfyotp,criteria,userworkdetails,usereducationdetails,
  userDomiciles,basicInfo} from "../apis/Profile";

import {
  GET_USER_PROFILE_BY_ID,
  EDIT_USER_PROFILE,
  VERIFY_MOBILE_NO,
  VERIFY_OTP,
  USER_CRITERIA,
  USER_WORK,
  USER_EDUCATION,
  USER_DOMICILE,
  UPDATE_BASIC

  
} from "../constants/ActionTypes";

import {getuserprofilebyidsuccess , edit_user_profile_success,verify_mobile_no_success , 
      verify_otp_no_success , your_criteria_success ,user_work_success,user_education_success,
      user_domicile_success,udate_basic_info_success
    } from "../actions/Profile";

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
  const {user_id,username,useremail,fullName,gender,DOB,religion,status,wanna_find,child,address,pictures,CameraImg} = payload;


  try {
      const profile_update = yield call(edituserprofile, user_id, username,useremail,fullName,gender,DOB,religion,status,wanna_find,child,address,pictures,CameraImg);
      const getUserDetail = yield call(getuserbyid, user_id);
      yield put(getuserprofilebyidsuccess(getUserDetail));
      yield put(edit_user_profile_success(profile_update.data.message));
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* verify_mobile_no({payload}) {
  const {otp,user_id} = payload;



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
      yield put(verify_otp_no_success(profile_update.data));
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* edit_criteria({payload}) {
  const {user_id,Until,Years,Minimaleducation,tribe,skin_Color,height,Width,Daily,Lifestyle,minimumincome,
    criteriacouple,physical,Eyeglasses,Veli,Smoke,Alcohol,Tattoo,Piercing,hobby} = payload;


  try {
     const user_criteria = yield call(criteria, user_id,Until,Years,Minimaleducation,tribe,skin_Color,height,Width,Daily,Lifestyle,minimumincome,criteriacouple
      ,physical,Eyeglasses,Veli,Smoke,Alcohol,Tattoo,Piercing,hobby);
      yield put(your_criteria_success(user_criteria.data.message));
      swal(user_criteria.data.message);
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* edit_work({payload}) {
  const {user_id,Work,income} = payload;
  

  try {
      const user_works = yield call(userworkdetails, user_id,Work,income);
      yield put(user_work_success(user_works.data.message));
      swal(user_works.data.message);
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* edit_user_education({payload}) {
  const {user_id ,  Lasteducation, Departement} = payload;
  

  try {
      const user_educations= yield call(usereducationdetails, user_id, Lasteducation,Departement);
      yield put(user_education_success(user_educations.data.message));
      swal(user_educations.data.message);
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* edit_user_Domicile({payload}) {
  const {user_id,currentcity,Homestatus,Hometown} = payload;
  
  try {
      const user_Domicile= yield call(userDomiciles, user_id, currentcity,Homestatus,Hometown);
      yield put(user_domicile_success(user_Domicile.data.message));
       swal(user_Domicile.data.message);
      
   
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* edit_basic_info({payload}) {
  const {user_id,status,religion,interestedIn,nickName,fullName,email,phone,DOB} = payload;
  try {
      const user_basic_info= yield call(basicInfo, user_id,status,religion,interestedIn,nickName,fullName,email,phone,DOB);
      yield put(udate_basic_info_success(user_basic_info.data.message));
      swal(user_basic_info.data.message);
   
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

export function* usercriteria() {
  yield takeEvery(USER_CRITERIA, edit_criteria);
}
export function* userwork() {
  yield takeEvery(USER_WORK, edit_work);
}

export function* usereducation() {
  yield takeEvery(USER_EDUCATION, edit_user_education);
}
export function* userDomicile() {
  yield takeEvery(USER_DOMICILE, edit_user_Domicile);
}
export function* editbasicinfo() {
  yield takeEvery(UPDATE_BASIC, edit_basic_info);
}



export default function* rootSaga() {
  yield all([
    fork(createUserAccount),
    fork(EditUserProfile),
    fork(VerifyMobileNo),
    fork(VerifyOTP),
    fork(usercriteria),
    fork(userwork),
    fork(usereducation),
    fork(userDomicile),
    fork(editbasicinfo),
    ])
  
}