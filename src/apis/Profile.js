import axios from "axios";
import $ from "jquery";
import config from "../config.json";

export function getuserbyid(user_id) {
  return axios.post(config.ApiUrl+'users/GetUserById',{user_id:user_id});
};

export function edituserprofile(user_id,username,useremail,fullName,gender,DOB,religion,status,wanna_find,child,address,pictures,CameraImg) {
       console.log(pictures,'0000')
       var formData = new FormData();    //formdata object
		formData.append('user_id', user_id);   //append the values with key, value pair
		formData.append('username', username);
		formData.append('useremail', useremail);
		formData.append('fullName', fullName);
		formData.append('gender', gender);
		formData.append('DOB', DOB);
		formData.append('religion', religion);
		formData.append('status', status);
		formData.append('wanna_find', wanna_find);
		formData.append('child', child);
		formData.append('address', address);
		//formData.append('pictures', pictures);
		//formData.append('pictures', pictures);
			formData.append('pictures', pictures);
		
		/*$.each(pictures, function(i, file) {
	    formData.append('pictures', file);
	   });*/
	//var file = dataURLtoFile(CameraImg, 'stat.png');
	//console.log(file)
	//var file = dataURLtoFile(CameraImg, 'CameraImg.png');
	//console.log(file,'-------------------------------------------------');
	//return false;

  return axios.post(config.ApiUrl+'users/edit_user_profile',formData);
};


export function verfyMoNo(mobile,user_id) {
  return axios.post(config.ApiUrl+'users/mobile',{mobile:mobile,user_id:user_id});
};

export function verfyotp(otp,user_id) {
  return axios.post(config.ApiUrl+'users/verifyotp',{otp:otp,user_id:user_id});
};

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}