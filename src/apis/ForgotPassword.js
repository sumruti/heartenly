import axios from "axios";
import config from "../config.json";

export function forgot_password(email) {
  return axios.post(config.ApiUrl+'users/forgotpassword',{email:email});
};