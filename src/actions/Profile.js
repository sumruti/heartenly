import {
  GET_USER_PROFILE_BY_ID,
  GET_USER_PROFILE_BY_ID_SUCCESS

} from 'constants/ActionTypes';

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

