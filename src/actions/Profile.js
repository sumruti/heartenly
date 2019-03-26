import {
  GET_USER_PROFILE_BY_ID,
  GET_USER_PROFILE_BY_ID_SUCCESS,
  EDIT_USER_PROFILE,
  EDIT_USER_PROFILE_SUCCESS,

  VERIFY_MOBILE_NO,
  VERIFY_MOBILE_NO_SUCCESS,

  VERIFY_OTP,
  VERIFY_OTP_SUCCESS

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

