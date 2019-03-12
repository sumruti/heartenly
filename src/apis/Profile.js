import axios from "axios";
import config from "../config.json";

export function getuserbyid(user_id) {
  return axios.post(config.ApiUrl+'users/GetUserById',{user_id:user_id});
};