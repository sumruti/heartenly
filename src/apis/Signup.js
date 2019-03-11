import axios from "axios";
import config from "../config.json";

export function signupUser(name,email,password) {
  return axios.post(config.ApiUrl+'users/signup/',{name:name,email:email,password:password});
};