import axios from "axios";
import config from "../config.json";

export function loginUser(UserEmailMobile,password) {
  return axios.post(config.ApiUrl+'users/login',{UserEmailMobile:UserEmailMobile,password:password});
};