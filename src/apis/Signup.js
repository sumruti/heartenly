import axios from "axios";
import config from "../config.json";

export function signupUser(email,password) {
  return axios.post(config.ApiUrl+'users/signup/',{email:email,password:password});
};