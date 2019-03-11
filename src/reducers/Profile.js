import {
  GET_USER_PROFILE_BY_ID_SUCCESS,

} from "constants/ActionTypes";

const INIT_STATE = {
  get_user_by_id: '',
  loader:false
 
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_BY_ID_SUCCESS: {
   
      return {
        ...state,
        loader: false,
        get_user_by_id: action.payload.data,
     
      }
    }
   
    default:
      return state;
  }
}
