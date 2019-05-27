import {
  GET_USER_PROFILE_BY_ID,
  GET_USER_PROFILE_BY_ID_SUCCESS,
  EDIT_USER_PROFILE,
  EDIT_USER_PROFILE_SUCCESS,

  VERIFY_MOBILE_NO,
  VERIFY_MOBILE_NO_SUCCESS,

  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,

  USER_CRITERIA,
  USER_CRITERIA_SUCCESS,

  USER_WORK,
  USER_WORK_SUCCESS,

  USER_EDUCATION,
  USER_EDUCATION_SUCCESS,

  USER_DOMICILE,
  USER_DOMICILE_SUCCESS,

  UPDATE_BASIC,
  UPDATE_BASIC_SUCCESS,


} from '../constants/ActionTypes';

export const getuserprofilebyid = (user_id) => {
  console.log(user_id)
  return {
    type: GET_USER_PROFILE_BY_ID,
    payload: user_id
  };
};
export const getuserprofilebyidsuccess = (user) => {
  return {
    type: GET_USER_PROFILE_BY_ID_SUCCESS,
    payload: user
  };
};


export const edit_user_profile = (user) => {

  return {
    type: EDIT_USER_PROFILE,
    payload: user
  };
};
export const edit_user_profile_success = (user) => {
  return {
    type: EDIT_USER_PROFILE_SUCCESS,
    payload: user
  };
};


export const verify_mobile_no = (no) => {

  return {
    type: VERIFY_MOBILE_NO,
    payload: no
  };
};
export const verify_mobile_no_success = (data) => {
  return {
    type: VERIFY_MOBILE_NO_SUCCESS,
    payload: data
  };
};


export const your_criteria = (data) => {

  return {
    type: USER_CRITERIA,
    payload: data
  };
};
export const your_criteria_success = (data) => {
  return {
    type: USER_CRITERIA_SUCCESS,
    payload: data
  };
};

export const user_work = (data) => {

  return {
    type: USER_WORK,
    payload: data
  };
};
export const user_work_success = (data) => {
  return {
    type: USER_WORK_SUCCESS,
    payload: data
  };
};

export const verify_otp_no = (no) => {

  return {
    type: VERIFY_OTP,
    payload: no
  };
};
export const verify_otp_no_success = (data) => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: data
  };
};

export const user_education = (data) => {

  return {
    type: USER_EDUCATION,
    payload: data
  };
};
export const user_education_success = (data) => {
  return {
    type:USER_EDUCATION_SUCCESS,
    payload: data
  };
};

export const user_domicile = (data) => {

  return {
    type: USER_DOMICILE,
    payload: data
  };
};

export const user_domicile_success = (data) => {
  return {
    type:USER_DOMICILE_SUCCESS,
    payload: data
  };
};

export const udate_basic_info = (data) => {

  return {
    type: UPDATE_BASIC,
    payload: data
  };
};

export const udate_basic_info_success = (data) => {
  return {
    type:UPDATE_BASIC_SUCCESS,
    payload: data
  };
};


