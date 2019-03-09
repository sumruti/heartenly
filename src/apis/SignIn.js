import axios from "axios";
import config from "../config.json";

export function loginUser(email,password) {
  return axios.post(config.ApiUrl+'users/login',{email:email,password:password});
};