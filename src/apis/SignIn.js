import axios from "axios";
import config from "../config.json";

export function loginUser(UserEmailMobile,password,googleemailid,username,role) {
	console.log(UserEmailMobile,'-',password,'-',googleemailid,'username')
  return axios.post(config.ApiUrl+'users/login',{UserEmailMobile:UserEmailMobile,password:password,googleemailid:googleemailid,username:username,role:role});
};