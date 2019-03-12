import axios from "axios";
import config from "../config.json";

export function signupUser(username,status,email,mobileNumber,password) {
	
  return axios.post(config.ApiUrl+'users/signup',{username:username,status:status,email:email,mobileNumber:mobileNumber,password:password});
};