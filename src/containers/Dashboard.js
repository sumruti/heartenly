import React from 'react';
import {connect} from 'react-redux';
//import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IntlMessages from '../util/IntlMessages';
import { Link } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {DatePicker} from 'material-ui-pickers';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ImageUploader from 'react-images-upload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Camera from 'react-camera';
import {
  auth

} from "../firebase/firebase";
import {showAuthMessage} from "../actions/Auth";
import Congratulation from "./Congratulation";
//import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

import 'react-html5-camera-photo/build/css/index.css';
import Fab from '@material-ui/core/Fab';
import $ from 'jquery';
import ReactPhoneInput from '@material-ui/core/Fab';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import  './style.css'
import config from "../config.json";
import axios from "axios";
import swal from 'sweetalert';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import firebase from 'firebase'
import CircularProgress from '@material-ui/core/CircularProgress';


import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


import {
getuserprofilebyid,
edit_user_profile,
verify_mobile_no,
verify_otp_no
} from '../actions/Profile';
import {
  showAuthLoader,

} from '../actions/Auth';

const client = {
            sandbox:    'ATA2wLy0lWaVAtUOy8CewhsR_foLHtbTPAfxYxSTMll3pCy2Zh4qmf1-RjDUJxQ10My9MW6oZJBXsnB0',
            production: 'ECeGB8nDV3nf1xNjA-nTYU2XDnFb3yCJ2Wl03my9a2C0bU8CgYcgv9SDiQ_WDv0VxiKK9OdWOtMvi7Aj',
        }
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

function getSteps() {
  return [<IntlMessages id="sidebar.PersonalData"/>, <IntlMessages id="sidebar.Relationship"/>, <IntlMessages id="sidebar.Photos"/>,<IntlMessages id="sidebar.VerifyMobileNo"/>,<IntlMessages id="sidebar.MembershipActivation"/>,<IntlMessages id="sidebar.choosePyaments"/>];
}
const style = {
  preview: {
    position: 'relative',
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  }
};





class Dashboard extends React.Component {
  constructor() {
    super();
     this.state = {
      activeStep: 0,
      username:'',
      useremail:'',
      fullName:'',
      gender:'',
      DOB:moment().format("YYYY-MM-DD"),
      address:'',
      religion:'',
      wanna_find:'',
      status:'',
      child:'',
      showMessage:'',
      alertMessage:'',
      pictures: [],
      showCamra:false,
      CameraImg:'',
      VerifyMobile:'',
      paymentMethod:'SGD',
      VerifyOTP:'',
      MobileverifyStatus:'',
      flag:'',
      stopcamra:false,
      ProfilePreviewUrl:'',
      open: false,
      img_id:'',
      PlanPrice:'',
      planName:'',
      verificationId:'',
      confirmationResult:'',
      loader_ : false,
      loader:false
    };
        // this.onDrop = this.onDrop.bind(this);
          this.takePicture = this.takePicture.bind(this);
  }

   componentDidMount() {
      var user_id = localStorage.getItem('user_id');
      this.props.getuserprofilebyid({user_id});
       /*navigator.geolocation.getCurrentPosition(function(position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var altitude = position.coords.altitude;
        var accuracy = position.coords.accuracy;
        var altitudeAccuracy = position.coords.altitudeAccuracy;
        var heading = position.coords.height;
        var speed = position.coords.speed;
        var timestamp = position.timestamp;
        console.log(position)

        // work with this information however you'd like!
    });*/
  

   }
    componentDidUpdate() {
      setTimeout(() => {
        this.setState({showMessage:'',loader_:false})

      }, 3000);
       
  }
  handleChange = address => {

    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleRequestClose = () => {
    this.setState({open: false,showCamra:false});
  };
  handleNext = () => {
    const {username,useremail,fullName,gender,address,DOB,religion,wanna_find,status,child,activeStep,CameraImg,pictures} = this.state;
   
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(useremail)){
       this.setState({alertMessage:"The email address is badly formatted", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
    if(!username.trim()){
       this.setState({alertMessage:"Username cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
    if(username.length >=  4 ){
       this.setState({alertMessage:"", showMessage:''})
    }else{
       
       this.setState({alertMessage:"Username must be minimum 4 characters ", showMessage:'1'})
       return false
    } 
   
    
    if(!fullName.trim()){
       this.setState({alertMessage:"Full Name cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
    if(!gender){
       this.setState({alertMessage:"Gender cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
    

    if(!DOB){
       this.setState({alertMessage:"D/O/B cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
    
    var years = moment().diff(DOB, 'years',false);
    if(years > 16){
      this.setState({alertMessage:"", showMessage:''})
    }else{
       
        this.setState({alertMessage:"D/O/B must be minimum  16 years", showMessage:'1'})
       return false
    }

    if(!address){
       this.setState({alertMessage:"Address cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
    if(!religion){
       this.setState({alertMessage:"Religion cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }

     this.setState({loader_:true});
    
     if(activeStep < 1){
      this.setState({
         activeStep: activeStep + 1,
      });
    }

    if(!status){
       this.setState({alertMessage:"Are you single cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }

     if(!wanna_find){
       this.setState({alertMessage:"What do you wanna find cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }

    if(!child){
       this.setState({alertMessage:"Do you have child cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
   if(activeStep < 2){
      this.setState({
         activeStep: activeStep + 1,
      });
    }
    if(this.props.get_user_by_id.user_img.length == 0){
      this.setState({alertMessage:"Please upload image", showMessage:'1'})
      return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
    if(activeStep < 3){
      this.setState({
         activeStep: activeStep + 1,
      });
    }
  
    if(!this.state.MobileverifyStatus){
      this.setState({alertMessage:"Please verify your mobile number", showMessage:'1'})
      return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }

  /**/
     this.setState({
         activeStep: activeStep + 1,
      });
     localStorage.setItem('redirect_',false)
     //localStorage.removeItem("redirect_");
    var user_id = localStorage.getItem('user_id');
    this.props.edit_user_profile({user_id,username,useremail,fullName,gender,DOB,religion,address,wanna_find,status,child,pictures,CameraImg});
    this.props.getuserprofilebyid({user_id});
  
    
  };

  handleBack = () => {
    const {activeStep} = this.state;
    localStorage.removeItem("redirect_");
    this.setState({
      activeStep: activeStep - 1,
    });
    localStorage.setItem('redirect_',false)
  };

  handleReset = () => {
    localStorage.removeItem("redirect_");
    this.setState({
      activeStep: 0,
    });
  };
   removeLocalS(e){
    localStorage.removeItem("redirect_");
  }
   DOB = (date) => {
          this.setState({DOB: moment(date.target.value).format("MM-DD-YYYY")});
  };

  

componentWillReceiveProps(nextProps) {
    var user_id = localStorage.getItem('user_id');
    var editPro = localStorage.getItem('redirect_');
    var redirect_1 = localStorage.getItem('redirect_1');
     if(editPro!='false' && editPro != null){
       this.setState({activeStep :  parseInt(editPro)});
     }
    //this.props.getuserprofilebyid({ user_id})
    const {get_user_by_id } = nextProps;

    if(get_user_by_id.data != undefined && get_user_by_id.data !='' && get_user_by_id.data.length !=0){
        this.setState({
          address:get_user_by_id.data[0].address ? get_user_by_id.data[0].address : '',
          child:get_user_by_id.data[0].child ? get_user_by_id.data[0].child :'',
          useremail:get_user_by_id.data[0].email ? get_user_by_id.data[0].email :'',
          DOB:get_user_by_id.data[0].DOB ? moment(get_user_by_id.data[0].DOB).format("YYYY-MM-DD") :'',
          fullName:get_user_by_id.data[0].fullName ? get_user_by_id.data[0].fullName :'',
          gender:get_user_by_id.data[0].gender ? get_user_by_id.data[0].gender : '',
          religion:get_user_by_id.data[0].religion ? get_user_by_id.data[0].religion : '',
          status:get_user_by_id.data[0].status ? get_user_by_id.data[0].status :'',
          username:get_user_by_id.data[0].username? get_user_by_id.data[0].username :'',
          wanna_find:get_user_by_id.data[0].wanna_find ? get_user_by_id.data[0].wanna_find :'',
          status:get_user_by_id.data[0].status ? get_user_by_id.data[0].status :'',
          VerifyMobile:get_user_by_id.data[0].mobileNumber ? get_user_by_id.data[0].mobileNumber :'',
          loader:false,
          MobileverifyStatus:get_user_by_id.data[0].mobile_verified_status ? get_user_by_id.data[0].mobile_verified_status :'',


        });

    if(this.state.address != '' && this.state.child != '' && 
      this.state.useremail != '' && this.state.DOB != '' &&
      this.state.fullName != '' && this.state.gender != '' &&
      this.state.religion != '' && this.state.status != '' &&
      this.state.username != '' && this.state.wanna_find != '' && this.state.MobileverifyStatus != '' && editPro == null
     
      ){

        this.setState({activeStep:4})

    }

     /* if(  this.state.MobileverifyStatus == '' ){
             this.setState({activeStep:3})
    }*/

  }
   console.log(this.state.activeStep,'------');
  if(this.state.address != '' && this.state.child != '' && 
      this.state.useremail != '' && this.state.DOB != '' &&
      this.state.fullName != '' && this.state.gender != '' &&
      this.state.religion != '' && this.state.status != '' &&
      this.state.username != '' && this.state.wanna_find != '' && this.state.MobileverifyStatus != ''&& this.state.activeStep == 5  && editPro == null
     
      ){
 
                 this.setState({open: true})

    }

  if(nextProps.verify_mobile==true){
    this.setState({flag:1})
  }
  if(nextProps.OTP.message=="Verified"){
    this.setState({flag:0})
  }
}

onTakePhoto (dataUri) {
  // Do stuff with the dataUri photo...
  var pictures = this.dataURLtoFile(dataUri,"CameraImg.png")
  this.setState({ProfilePreviewUrl:dataUri})  
  const {username,useremail,fullName,gender,address,DOB,religion,wanna_find,status,child,activeStep,CameraImg} = this.state;
  var user_id = localStorage.getItem('user_id');
  this.props.edit_user_profile({user_id,username,useremail,fullName,gender,DOB,religion,address,wanna_find,status,child,pictures,CameraImg});
  this.props.getuserprofilebyid({user_id});
}

dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

onDrop(e) {
      e.preventDefault();
      let reader = new FileReader();
      let pictures = e.target.files[0];
      //this.setState({pictures:e.target.files[0]})

      reader.onloadend = () => {
      this.setState({
      ProfilePreviewUrl: reader.result
      });
      }

      reader.readAsDataURL(pictures,'')
      var user_id = localStorage.getItem('user_id');
       const {username,useremail,fullName,gender,address,DOB,religion,wanna_find,status,child,activeStep,CameraImg} = this.state;
       this.props.edit_user_profile({user_id,username,useremail,fullName,gender,DOB,religion,address,wanna_find,status,child,pictures,CameraImg});
     /* setTimeout(() => {
        this.props.getuserprofilebyid({user_id});
      }, 3000);*/

      this.setState({loader:true});
      
       /*var images = [];
      for (let i = 0; i < picture.length; i++) {
          images.push(picture[i]);
      }
      
        this.setState({
            pictures: images,
        });*/
}

 takePicture() {

    this.camera.capture()
    .then(blob => {
          var reader = new FileReader();
          reader.readAsDataURL(blob); 
            reader.onloadend = () => {
                const {ProfilePreviewUrl,username,useremail,fullName,gender,address,DOB,religion,wanna_find,status,child,activeStep,CameraImg} = this.state;

              var pictures = this.dataURLtoFile(reader.result,"CameraImg.png")
              this.setState({ProfilePreviewUrl:pictures})  
              var user_id = localStorage.getItem('user_id');
              this.props.edit_user_profile({user_id,username,useremail,fullName,gender,DOB,religion,address,wanna_find,status,child,pictures,CameraImg});
              this.setState({showCamra:false,stopcamra:true})

              localStorage.setItem('redirect_',2)
               this.props.showAuthLoader();
               this.setState({loader:true});
            // window.location = "/app/dashboard";

           }
           /*navigator.getUserMedia({audio: false, video: true},
            function(stream) {
                 // can also use getAudioTracks() or getVideoTracks()
                var track = stream.getTracks()[0];  // if only one media track
                // ...
                track.stop();
            },
            function(error){
                console.log('getUserMedia() error', error);
            });*/

           

       })
     var user_id = localStorage.getItem('user_id');
    setTimeout(() => {
       //window.location = "/app/dashboard";
      }, 4000);
  
  }

showCamra(e){
  this.setState({showCamra:true})  
};

getImgId(img_id){
    this.setState({img_id:img_id})
}

DeleteImg(e){

  if(this.state.img_id){
      swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
       
        axios.post(`${config.ApiUrl}users/deleteImage`, {
            img_id: this.state.img_id,
          })
          .then(res => {
            if(res.data.status==true){
                 swal("Poof! Your imaginary file has been deleted!", {
                  icon: "success",
                });
                 var user_id = localStorage.getItem('user_id');
                 this.props.getuserprofilebyid({user_id});
            }
            
          });
      } else {
            swal("Your imaginary file is safe!");
      }
    });

 }else{
      swal("Please select image first");
 }
}

SetAsPrimary(e){

   if(this.state.img_id){
         var user_id = localStorage.getItem('user_id');
          swal({
            title: "Are you sure?",
            text: "You want to set this image as primary!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                    axios.post(`${config.ApiUrl}users/setImgPrimary`, {
                        img_id: this.state.img_id,
                        user_id:user_id
                      })
                      .then(res => {
                        if(res.data.status==true){
                             swal("Your image has been set as primary!", {
                              icon: "success",
                            });
                             var user_id = localStorage.getItem('user_id');
                             this.props.getuserprofilebyid({user_id});
                        }
                        
                      });

            }
          });

      } else{
      swal("Please select image first");
     }
}

SelectPlanGoPlus(price){
   const {activeStep} = this.state;
   this.setState({PlanPrice:price,activeStep: activeStep + 1,open: true,planName:"Plus"})
}

SelectPlanGoSilver(price){
   const {activeStep} = this.state;
   this.setState({PlanPrice:price,activeStep: activeStep + 1,open: true,planName:"Silver"})
}

onSuccess(payment){
   var user_id = localStorage.getItem('user_id');
       // Congratulation, it came here means everything's fine!
         axios.post(`${config.ApiUrl}users/payments`, {
            payment: payment,
            plan:this.state.planName,
            user_id:user_id,
          })
          .then(res => {
            if(res.data.status==true){
                 swal("Payment Successful", {
                  icon: "success",
                });
                 this.props.history.replace('/app/home');

            }
          });
}
onCancel(data){
  console.log('The payment was cancelled!', data);
}

onError(err){
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
}

getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.getPersonaldata();
      case 1:
        return this.relationShip();
      case 2:
        return this.Photos();
      case 3:
        return this.MobileNo();
      case 4:
        return this.Membership();
      case 5:
        return this.choosePyaments();

      default:
        return '';
    }
}

getPersonaldata() {

  return <div>
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <TextField
            id="userName"
            label={<IntlMessages id="sidebar.YourEmail"/>}
            margin="normal"
            value={this.state.useremail}
            onChange={(event) => this.setState({useremail: event.target.value})}
            fullWidth
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <TextField
            id="userName"
            label={<IntlMessages id="sidebar.Username"/>}
            value={this.state.username}
            margin="normal"
            onChange={(event) => this.setState({username: event.target.value})}
            fullWidth
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <TextField
            id="fullName"
            value={this.state.fullName}
            label={<IntlMessages id="sidebar.Fullname"/>}
            onChange={(event) => this.setState({fullName: event.target.value})}
            margin="normal"
            fullWidth
          />
        </div>
      </div>
     
    </div>
    <div className="row">
      <div className="col-md-4">
            <div className="form-group">
              <FormControl component="fieldset" required>
                <FormLabel component="legend"><IntlMessages id="sidebar.gender"/></FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={this.state.gender}

                  className="d-flex flex-row"
                  onChange={(event) => this.setState({gender: event.target.value})}
                >
                  <FormControlLabel value="1" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.male"/>/>
                  <FormControlLabel value="2" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.female"/>/>
                  {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
                </RadioGroup>
              </FormControl>
           </div>
      </div>
      <div className="col-md-4">
            <div className="form-group">
              <TextField
                  id="date"
                  label={<IntlMessages id="sidebar.dob"/>}
                  type="date"
                  margin="normal"
                  onChange={this.DOB}
                  defaultValue={this.state.DOB}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />

           </div>
        </div> 
        <div className="col-md-4">
          <div className="form-group">
            {/*<TextField
                          id="userName"
                          label="Country , Province , city"
                          value={this.state.address}
                          margin="normal"
                          onChange={(event) => this.setState({address: event.target.value})}
                          fullWidth
                        />*/}
            <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <TextField
                              {...getInputProps({
                                placeholder: "Country , Province , city ...",
                                className: 'location-search-input',
                              }) }
                            fullWidth
                            margin="normal"/>
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
          </div>
        </div>
        
      </div>
      <div className="row">
        <div className="col-md-4">
           <FormControl className="w-100 mb-2">
                   <InputLabel htmlFor="age-simple"><IntlMessages id="sidebar.Religion"/></InputLabel>
                   <Select
                         value={this.state.religion}
                         onChange={(event) => this.setState({religion: event.target.value})}
                      >
                       
                        <MenuItem value="Agnostic">Agnostic</MenuItem>
                        <MenuItem value="Atheist">Atheist</MenuItem>
                        <MenuItem value="Baha'i">Baha'i</MenuItem>
                        <MenuItem value="Buddhism">Buddhism</MenuItem>
                        <MenuItem value="Cao Dai">Cao Dai</MenuItem>
                        <MenuItem value="Chinese traditional religion">Chinese traditional religion</MenuItem>
                        <MenuItem value="Christianity">Christianity</MenuItem>
                        <MenuItem value="Hinduism">Hinduism</MenuItem>
                        <MenuItem value="Islam">Islam</MenuItem>
                        <MenuItem value="Jainism">Jainism</MenuItem>
                        <MenuItem value="Juche">Juche</MenuItem>
                        <MenuItem value="Judaism">Judaism</MenuItem>
                        <MenuItem value="Neo-Paganism">Neo-Paganism</MenuItem>
                        <MenuItem value="Nonreligious">Nonreligious</MenuItem>
                        <MenuItem value="Rastafarianism">Rastafarianism</MenuItem>
                        <MenuItem value="Secular">Secular</MenuItem>
                        <MenuItem value="Shinto">Shinto</MenuItem>
                        <MenuItem value="Sikhism">Sikhism</MenuItem>
                        <MenuItem value="Spiritism">Spiritism</MenuItem>
                        <MenuItem value="Tenrikyo">Tenrikyo</MenuItem>
                        <MenuItem value="Unitarian-Universalism">Unitarian-Universalism</MenuItem>
                        <MenuItem value="Zoroastrianism">Zoroastrianism</MenuItem>
                        <MenuItem value="primal-indigenous">primal-indigenous</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
              </FormControl>
        </div>
      </div>
   
  </div>
}

relationShip(){
   return <div>
            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend"><IntlMessages id="sidebar.wannFind"/></FormLabel>
                        <RadioGroup
                          aria-label="wanna_find"
                          name="wanna_find"
                          value={this.state.wanna_find}

                          className="d-flex flex-row"
                          onChange={(event) => this.setState({wanna_find: event.target.value})}
                        >
                          <FormControlLabel value="Love partners" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.Lovepartners"/>/>
                          <FormControlLabel value="Friends" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.Friends"/>/>
                          {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
                        </RadioGroup>
                      </FormControl>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend"><IntlMessages id="sidebar.status"/></FormLabel>
                        <RadioGroup
                          aria-label="status"
                          name="status"
                          value={this.state.status}

                          className="d-flex flex-row"
                          onChange={(event) => this.setState({status: event.target.value})}
                        >
                          <FormControlLabel value="Single" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.Single"/>/>
                          <FormControlLabel value="In Relationship" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.Relationship"/>/>
                          <FormControlLabel value="Engaged" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.Engaged"/>/>
                          <FormControlLabel value="Married" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.Married"/>/>
                          <FormControlLabel value="Divorced" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.Divorced"/>/>
                          <FormControlLabel value="Widowed" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.Widowed"/>/>
                          {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
                        </RadioGroup>
                      </FormControl>
                  </div>
                </div>


                <div className="col-md-4">
                  <div className="form-group">
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend"><IntlMessages id="sidebar.child"/></FormLabel>
                        <RadioGroup
                          aria-label="child"
                          name="child"
                          value={this.state.child}

                          className="d-flex flex-row"
                          onChange={(event) => this.setState({child: event.target.value})}
                        >
                          <FormControlLabel value="0" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.nochild"/>/>
                          <FormControlLabel value="1" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.1child"/>/>
                          <FormControlLabel value="2" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.2child"/>/>
                          <FormControlLabel value="3" control={<Radio color="primary"/>} label=<IntlMessages id="sidebar.3child"/>/>
                          
                          {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
                        </RadioGroup>
                      </FormControl>
                  </div>
                </div>


             </div>
          </div>
}

Photos(){
   return <div>
            <div className="row">
            <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-group">
                      <div className="jr-card ">
                            <div className="jr-card-body d-flex justify-content-center ">
                                  <div className="perview_img">
                                    { this.props.get_user_by_id.primaryimg != '' ?
                                         
                                            <div className="primary_img">
                                               <img src={this.props.get_user_by_id.primaryimg} style={{height: "127px"}}/>: 
                                             </div> :
                                             <div className="primary_img">
                                               <img  src={require('../assets/images/user_img.png')} style={{height: "127px"}}/>
                                             </div> 
                                    }
                                  </div>
                            </div> 
                      </div>    
                  </div>    

                </div>
                <div className="col-md-4"></div>
            </div>
            <div className="row">
             <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                 <div className="upload-btn-wrapper">
                      <Button variant="contained" color="primary"  className="btn jr-btn jr-btn-label right">
                       <i className="zmdi zmdi-image-o zmdi-hc-fw "/>
                      <span><IntlMessages id="sidebar.Gallery"/></span></Button>
                      <input type="file" name="myfile" onChange={(e)=>this.onDrop(e)}/>
                    </div>
                <Button variant="contained" color="primary" className="jr-btn jr-btn-label right" data-toggle="modal" data-target="#myModal" onClick={(e)=>this.showCamra(e)}>
                  <i className="zmdi zmdi-camera zmdi-hc-fw "/>
                  <span><IntlMessages id="sidebar.Camera"/></span>
                </Button>
                <Button variant="contained" color="primary" className="jr-btn jr-btn-label right" onClick={(e)=>this.DeleteImg(e)}>
                  <i className="zmdi zmdi-delete zmdi-hc-fw "/>
                  <span><IntlMessages id="sidebar.Delete"/></span>
                </Button>
               <Button variant="contained" color="primary" className="jr-btn jr-btn-label right" onClick={(e)=>this.SetAsPrimary(e)}>
                  <span> <IntlMessages id="sidebar.Primary"/></span>
                </Button>
                

              </div>
              <div className="col-md-2"></div>
            </div>

      
                   
                   <div className="container">
                      <div className="row">
                         <div className="col-md-12">
                            <ul className="gallery_">
                            { this.props.get_user_by_id.user_img!=undefined &&  
                                this.props.get_user_by_id.user_img.map((item, index) => (
                                  <li onClick={(e)=>this.getImgId(item._id)}><input type="radio" id={"cb"+index} name="radio" defaultChecked ={item.SetAsPrimary == 1}/>
                                    <label htmlFor={"cb"+index}><img src={ item.image } alt="Lights"/></label>
                                  </li>
                                  ))}
                              
                            </ul>
                          </div>
                      </div>
                    </div>

                     <div className="card_box_">
                            {/* Modal */}
                              <Dialog open={this.state.showCamra} onClose={this.handleRequestClose} style={{width:"100"}}>
                                   <DialogContent>
                                    <Camera
                                      style={style.preview}
                                      ref={(cam) => {
                                        this.camera = cam;
                                      }}
                                    >
                                      <div style={style.captureContainer} onClick={this.takePicture}>
                                        <div style={style.captureButton} />
                                      </div>
                                    </Camera>
                                   </DialogContent> 
                                </Dialog>   
                                 
                               
                       </div>   

         
         </div>              
}

MobileNo(){
   return <div>
              <div className="row">
                  <div className="col-md-4"></div>
                      <div className="col-md-4">
                       
                        {this.state.flag == 1 ? 
                           <div className="form-group">
                               <TextField
                                   id="cardHolder"
                                   label="Enter OTP"
                                   margin="normal"
                                   fullWidth
                                   onChange={(event) => this.setState({VerifyOTP: event.target.value})}
                                 />
                                  <Button variant="contained" color="primary" className="jr-btn jr-btn-label right" fullWidth onClick={(e)=>this.sendOTP(e)}>
                                    <span>Send OTP</span>
                                  </Button>
                                  {/*<span className="resend_otp" onClick={(e)=>this.sendmobileNo(e)}>Resend </span>*/}
                            </div>      

                              :
                               <div className="form-group">
                                  <PhoneInput
                                      placeholder="Enter phone number"
                                      value={ this.state.VerifyMobile }
                                      margin="normal"
                                      fullWidth
                                      country="US"
                                      onChange={VerifyMobile => this.setState({ VerifyMobile }) } /> 
                                     {this.state.MobileverifyStatus != 1 ?  
                                        <span className="unverified">Unverified </span>
                                        :
                                        <span className="Verified">Verified </span>
                                      }
                                  <Button variant="contained" color="primary" className="jr-btn jr-btn-label right" fullWidth onClick={(e)=>this.sendmobileNo(e)} disabled={this.state.MobileverifyStatus==1}>
                                    <span>Send</span>

                                  </Button>
                                   <div id="recaptcha-container"></div>  

                               </div>   
                            }
                              
       
                   
                      </div>
                    
                  <div className="col-md-4"></div>
              </div>
            </div>              
}

Membership(){
  return <div>
             <div className="row">
                  <div className="col-md-8"></div>
                      <div className="col-md-2">
                          
                      </div>
                  <div className="col-md-2">
                      <FormControl className="w-100 mb-2">
                   <Select
                         value={this.state.paymentMethod}
                          onChange={(event) => this.setState({paymentMethod: event.target.value})}
                      >
                        <MenuItem value="SGD">SGD</MenuItem>
                        <MenuItem value="IDR">IDR</MenuItem>
                        
                      </Select>
              </FormControl>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-3"></div>
                      <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="box_">
                                    <h5><IntlMessages id="sidebar.Plus"/></h5>
                                    <p> <IntlMessages id="sidebar.Unlinted"/></p>
                                    <h6 style={{ marginTop: "77px"}}>{this.state.paymentMethod}  30K</h6>
                                    <Button variant="contained" color="primary" onClick={(e)=>this.SelectPlanGoPlus("30")}className="jr-btn jr-btn-label bg-teal right" style={{ marginTop: "34px"}}>
                                        <span>Go Plus</span>
                                      </Button>

                                </div>  
                            </div>  
                            <div className="col-md-6">
                                <div className="box_" >
                                   <h5><IntlMessages id="sidebar.Silver"/></h5>
                                   <p> <IntlMessages id="sidebar.One-on-one"/></p>
                                   <p><IntlMessages id="sidebar.One-on-one"/></p>
                                   <h6>{this.state.paymentMethod} 40K</h6>
                                    <Button variant="contained" color="primary" onClick={(e)=>this.SelectPlanGoSilver("40")} className="jr-btn jr-btn-label  bg-teal right" style={{ marginTop: "0px"}}>
                                        <span>Go Silver</span>
                                      </Button>

                                </div>  
                            </div>  
                             <div className="col-md-12">
                                <div className="jr-card ">
                                   <div className="jr-card-body d-flex justify-content-center ">
                                      <div className="bottom_box_" >
                                        <p>What is Lorem Ipsum?</p>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <p>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                      </div>
                                    </div>   
                                </div>   
                            </div>   
                            
                        </div>   
                      </div>
                  <div className="col-md-3"></div>
              </div>
            </div> 
}

choosePyaments(){
  return <div>
             <div className="row">
                  <div className="col-md-8"></div>
                      <div className="col-md-2">
                          
                      </div>
                  <div className="col-md-2">
                      <FormControl className="w-100 mb-2">
                   <Select
                         value={this.state.paymentMethod}
                         onChange={(event) => this.setState({paymentMethod: event.target.value})}
                      >
                        <MenuItem value="SGD">SGD</MenuItem>
                        <MenuItem value="IDR">IDR</MenuItem>
                        
                      </Select>
              </FormControl>
                  </div>
              </div>
              {this.state.paymentMethod != "SGD" ? 
              <div className="row">
                  <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <div className="box">
                               <h1 ><IntlMessages id="sidebar.international"/></h1>
                               <h6>IDR 399K</h6>
                               <p><IntlMessages id="sidebar.SupportBCA"/></p>
                               

                            </div>  
                            <div className="box" >
                              <h1  ><IntlMessages id="sidebar.DebitCredit"/></h1>
                              <h6>IDR 399K</h6>
                              <p><IntlMessages id="sidebar.international"/></p>
                            </div>  
                            <div className="box" >
                              <h1  ><IntlMessages id="sidebar.gopay"/></h1>
                              <h6>IDR 399K</h6>
                              <p><IntlMessages id="sidebar.Payeasily"/></p>
                              <p style={{color: "#ff5858"}}><IntlMessages id="sidebar.alwaysIDR"/></p>
                            </div>  
                            <div className="box" >
                              <h1>Alfamart</h1>
                              <h6>IDR 399K</h6>
                              <p><IntlMessages id="sidebar.Alfamart"/></p>
                            </div>  
                        </div>   
                      </div>
                  <div className="col-md-4"></div>
              </div>
              :
               <div className="row">
                  <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <div className="box">
                               <h1 >Dabit / Credit / PyaPal</h1>
                               <h6>SGD 30K</h6>
                               <p><IntlMessages id="sidebar.international"/></p>
                               <p style={{color: "#ff5858"}}>*only support IDR, SGD, USD, HKD, AUD, CAD, EUR, GBP, NZD, PHP, THB, JPY other selection will use USD</p>
                                            <PaypalExpressBtn env={env} client={client} currency={'SGD'} total={this.state.PlanPrice} onError={this.onError} onSuccess={(e)=>this.onSuccess(e)} onCancel={this.onCancel} />

                            </div>  
                            <div className="box" >
                              <h1><IntlMessages id="sidebar.Wire"/></h1>
                              <h6>SGD 40K</h6>
                              <p><IntlMessages id="sidebar.InternationalWire"/></p>
                            </div>  
                              
                        </div>   
                      </div>
                  <div className="col-md-4"></div>
              </div>
            }
            </div>  
}

sendmobileNo(e){

   var phoneNumber = this.state.VerifyMobile;
    
      var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      var testVerificationCode = "123456";

      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(confirmationResult => {
               var user_id = localStorage.getItem('user_id');
               if(confirmationResult.verificationId){
                 this.setState({verificationId:confirmationResult.verificationId,confirmationResult:confirmationResult})
                 this.props.verify_mobile_no({otp:this.state.verificationId,user_id:user_id})
                 this.props.getuserprofilebyid({user_id});
              }
          }).catch(error => {
               this.setState({alertMessage:error.message,showMessage:'1',flag:'0'})
          })

}

sendOTP(e){
 
      var credential = firebase.auth.PhoneAuthProvider.credential(this.state.verificationId, this.state.VerifyOTP);
  this.state.confirmationResult.confirm(this.state.VerifyOTP).then(result => {
      // User signed in successfully.
      var user = result.user;
       if(user){
           var user_id = localStorage.getItem('user_id');
          this.props.verify_otp_no({otp:this.state.verificationId,user_id:user_id});
          this.props.getuserprofilebyid({user_id});
        }
      // ...
    }).catch(error=> {
      this.setState({alertMessage:error.message,showMessage:'1',flag:'0'})

      // User couldn't sign in (bad verification code?)
      // ...
    });
  
}
 





  render() {
  
    const steps = getSteps();
    const {activeStep,DOB,showMessage,alertMessage,stopcamra , verificationId , loader_,loader} = this.state;
    const {profile_update,verify_mobile , OTP } = this.props;
    var editPro = localStorage.getItem('redirect_');
   /* if(stopcamra){
      window.location = "/"
    }*/
  
 
  return (
       <div className="app-wrapper">
            <div className="dashboard animated slideInUpTiny animation-duration-3">
               <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
                <h2 className="title mb-3 mb-sm-0">{editPro ? <IntlMessages id="sidebar.editProfile" /> : <IntlMessages id="sidebar.dashboard"/>}</h2>
                <Breadcrumb className="mb-0" tag="nav">
                  <BreadcrumbItem  href={null}><IntlMessages id="sidebar.App"/></BreadcrumbItem>
                  <BreadcrumbItem  href={null}>{editPro ? <Link to="/app/Profile" onClick={(e)=>this.removeLocalS(e)}><IntlMessages id="sidebar.Profile"/> </Link> :<IntlMessages id="sidebar.dashboard"/> }</BreadcrumbItem>
                </Breadcrumb>
              </div>

               <div className="jr-card ">
               <div className="jr-card-body d-flex justify-content-center ">
             

                  <div className="w-100">
                      <Stepper activeStep={activeStep} alternativeLabel className="horizontal-stepper-linear">
                        {steps.map((label, index) => {
                          return (
                            <Step key={label} className={`horizontal-stepper ${index === activeStep ? 'active' : ''}`}>
                              <StepLabel className="stepperlabel">{label}</StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                      <div>
                        {this.state.activeStep === steps.length ? (
                          <div>
                            <Typography className="my-2">
                              All steps completed - you&quot;re finished
                            </Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                          </div>
                        ) : (
                          <div>
                            {this.getStepContent(activeStep)}
                            <div>
                              <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className="mr-2"
                              >
                                <IntlMessages id="sidebar.back"/>
                              </Button>
                              {activeStep === 4  || activeStep === 5 ?  '' :
                              <Button variant="contained" color="primary" onClick={this.handleNext} disabled={loader}>
                                {activeStep === steps.length - 1 ? '' : <IntlMessages id="sidebar.next"/>}
                              </Button>
                            }

                               <Link to="/app/home" style={{float: "right",clear:"both"}}>
                                

                              
                                {activeStep === 4 || activeStep === 5 ? <IntlMessages id="sidebar.Skip"/> : ''}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    </div>
                    {showMessage && NotificationManager.error(alertMessage)}
                    {/*{this.props.OTP.status == false && NotificationManager.error(this.props.OTP.message)}
                                        {this.props.OTP.status == true && NotificationManager.success(this.props.OTP.message)}*/}
                    
                    <NotificationContainer/>
                    {loader_ &&
                      <div className="loader-view_">
                        <CircularProgress/>
                      </div>
                    }
                    {loader &&
                      <div className="loader-view_">
                        <CircularProgress/>
                      </div>
                    }
                   
               
         
       
      </div>
                  

             </div>
             <Dialog open={this.state.open} onClose={this.handleRequestClose} style={{width:"100"}}>
                 {/* <DialogTitle>test</DialogTitle>*/}
                  <DialogContent>
                     <Congratulation/>
                
                  </DialogContent>
                 
              </Dialog>
              
       </div>
      
  );
 };
};






const mapStateToProps = ({Profile}) => {
  const {get_user_by_id,edit_user_profile,verify_mobile , OTP,loader } = Profile;
  return {get_user_by_id,edit_user_profile , verify_mobile , OTP ,loader}
};

export default connect(mapStateToProps, {
  getuserprofilebyid,
  showAuthLoader,
  edit_user_profile,
  verify_mobile_no,
  verify_otp_no,
  showAuthMessage
})(Dashboard);

