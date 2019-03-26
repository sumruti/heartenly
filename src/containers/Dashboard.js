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

import {showAuthMessage} from "../actions/Auth";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

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





import {
getuserprofilebyid,
edit_user_profile,
verify_mobile_no,
verify_otp_no
} from '../actions/Profile';


function getSteps() {
  return ['Personal Data', 'Relationship', 'Photos','Verify Mobile No','Membership Activation','choose Pyaments'];
}






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
      ProfilePreviewUrl:'',
      open: false,
      img_id:''
    };
         this.onDrop = this.onDrop.bind(this);
  }

   componentDidMount() {
      var user_id = localStorage.getItem('user_id');
      this.props.getuserprofilebyid({user_id});

   }
  handleRequestClose = () => {
    this.setState({open: false});
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
    if(!fullName.trim()){
       this.setState({alertMessage:"Full Name cannot be left blank", showMessage:'1'})
       return false
    }else{
       this.setState({alertMessage:"", showMessage:''})
    }
    if(!gender.trim()){
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
    
     if(activeStep < 1){
      this.setState({
         activeStep: activeStep + 1,
      });
    }

    /*if(!status){
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
    }*/
   //if(activeStep < 2){
      this.setState({
         activeStep: activeStep + 1,
      });
    //}
    
    var user_id = localStorage.getItem('user_id');
    this.props.edit_user_profile({user_id,username,useremail,fullName,gender,DOB,religion,address,wanna_find,status,child,pictures,CameraImg});
    this.props.getuserprofilebyid({user_id});
    
  };

  handleBack = () => {
    const {activeStep} = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
   
   DOB = (date) => {
          this.setState({DOB: moment(date.target.value).format("MM-DD-YYYY")});
  };

  

   componentWillReceiveProps(nextProps) {
    var user_id = localStorage.getItem('user_id');
    //this.props.getuserprofilebyid({ user_id})
    const {get_user_by_id } = nextProps;
    console.log(get_user_by_id,'--get_user_by_id')
    if(get_user_by_id){

    
    this.setState({
        address:get_user_by_id.data[0].address,
        child:get_user_by_id.data[0].child,
        useremail:get_user_by_id.data[0].email,
        DOB:moment(get_user_by_id.data[0].DOB).format("YYYY-MM-DD"),
        fullName:get_user_by_id.data[0].fullName,
        gender:get_user_by_id.data[0].gender,
        religion:get_user_by_id.data[0].religion,
        status:get_user_by_id.data[0].status,
        username:get_user_by_id.data[0].username,
        wanna_find:get_user_by_id.data[0].wanna_find,
        status:get_user_by_id.data[0].status,
        child:get_user_by_id.data[0].child,
        VerifyMobile:get_user_by_id.data[0].mobileNumber,
        MobileverifyStatus:get_user_by_id.data[0].mobile_verified_status,

    })
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
   onCameraError (error) {
    console.error('onCameraError', error);
  }
 
  onCameraStart (stream) {
    console.log('onCameraStart');
  }
 
  onCameraStop () {
    console.log('onCameraStop');
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
      this.props.getuserprofilebyid({user_id});
       /*var images = [];
      for (let i = 0; i < picture.length; i++) {
          images.push(picture[i]);
      }
      
        this.setState({
            pictures: images,
        });*/
      }

showCamra(e){
          this.setState({showCamra:true,open:true})  
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
            console.log(res)
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
        return 'Uknown stepIndex';
    }
}

getPersonaldata() {

  return <div>
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <TextField
            id="userName"
            label="Your Email"
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
            label="UserName"
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
            label="Full name according to identity card"
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
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={this.state.gender}

                  className="d-flex flex-row"
                  onChange={(event) => this.setState({gender: event.target.value})}
                >
                  <FormControlLabel value="1" control={<Radio color="primary"/>} label="Male"/>
                  <FormControlLabel value="2" control={<Radio color="primary"/>} label="Female"/>
                  {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
                </RadioGroup>
              </FormControl>
           </div>
      </div>
      <div className="col-md-4">
            <div className="form-group">
              <TextField
                  id="date"
                  label="Date of birth"
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
            <TextField
              id="userName"
              label="Country , Province , city"
              value={this.state.address}
              margin="normal"
              onChange={(event) => this.setState({address: event.target.value})}
              fullWidth
            />
          </div>
        </div>
        
      </div>
      <div className="row">
        <div className="col-md-4">
           <FormControl className="w-100 mb-2">
                   <InputLabel htmlFor="age-simple">Religion</InputLabel>
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
                        <FormLabel component="legend">What do you wanna find?</FormLabel>
                        <RadioGroup
                          aria-label="wanna_find"
                          name="wanna_find"
                          value={this.state.wanna_find}

                          className="d-flex flex-row"
                          onChange={(event) => this.setState({wanna_find: event.target.value})}
                        >
                          <FormControlLabel value="Love partners" control={<Radio color="primary"/>} label="Love partners"/>
                          <FormControlLabel value="Friends" control={<Radio color="primary"/>} label="Friends"/>
                          {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
                        </RadioGroup>
                      </FormControl>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">Are you single?</FormLabel>
                        <RadioGroup
                          aria-label="status"
                          name="status"
                          value={this.state.status}

                          className="d-flex flex-row"
                          onChange={(event) => this.setState({status: event.target.value})}
                        >
                          <FormControlLabel value="Single" control={<Radio color="primary"/>} label="Single"/>
                          <FormControlLabel value="In Relationship" control={<Radio color="primary"/>} label="In Relationship"/>
                          <FormControlLabel value="Engaged" control={<Radio color="primary"/>} label="Engaged"/>
                          <FormControlLabel value="Married" control={<Radio color="primary"/>} label="Married"/>
                          <FormControlLabel value="Divorced" control={<Radio color="primary"/>} label="Divorced"/>
                          <FormControlLabel value="Widowed" control={<Radio color="primary"/>} label="Widowed"/>
                          {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
                        </RadioGroup>
                      </FormControl>
                  </div>
                </div>


                <div className="col-md-4">
                  <div className="form-group">
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">Do you have child?</FormLabel>
                        <RadioGroup
                          aria-label="child"
                          name="child"
                          value={this.state.child}

                          className="d-flex flex-row"
                          onChange={(event) => this.setState({child: event.target.value})}
                        >
                          <FormControlLabel value="0" control={<Radio color="primary"/>} label="No I don't"/>
                          <FormControlLabel value="1" control={<Radio color="primary"/>} label="Yes, I have 1 child"/>
                          <FormControlLabel value="2" control={<Radio color="primary"/>} label="Yes, I have 2 child"/>
                          <FormControlLabel value="3" control={<Radio color="primary"/>} label="Yes, I have 3 or more child"/>
                          
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
                      <span>Gallery</span></Button>
                      <input type="file" name="myfile" onChange={(e)=>this.onDrop(e)}/>
                    </div>
                <Button variant="contained" color="primary" className="jr-btn jr-btn-label right" data-toggle="modal" data-target="#myModal" onClick={(e)=>this.showCamra(e)}>
                  <i className="zmdi zmdi-camera zmdi-hc-fw "/>
                  <span>Camera</span>
                </Button>
                <Button variant="contained" color="primary" className="jr-btn jr-btn-label right" onClick={(e)=>this.DeleteImg(e)}>
                  <i className="zmdi zmdi-delete zmdi-hc-fw "/>
                  <span>Delete</span>
                </Button>
               <Button variant="contained" color="primary" className="jr-btn jr-btn-label right" onClick={(e)=>this.SetAsPrimary(e)}>
                  <span>Set as Primary</span>
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
                            <div id="myModal" className="modal fade" role="dialog">
                              <div className="modal-dialog">
                                {/* Modal content*/}
                                <div className="modal-content">
                                  <div className="modal-header">
                                    {/*<button type="button" className="close" data-dismiss="modal">×</button>
                                                                        <h4 className="modal-title">Modal Header</h4>*/}
                                  </div>
                                  <div className="modal-body">
                                    {this.state.showCamra==true ?
                                         <Camera
                                          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                                          onCameraError = { (error) => { this.onCameraError(error); } }
                                          idealFacingMode = {FACING_MODES.ENVIRONMENT}
                                          idealResolution = {{width: 640, height: 480}}
                                          imageType = {IMAGE_TYPES.JPG}
                                          imageCompression = {0.97}
                                          isMaxResolution = {false}
                                          isImageMirror = {false}
                                          isDisplayStartCameraError = {true}
                                          sizeFactor = {1}
                                          onCameraStart = { (stream) => { this.onCameraStart(stream); } }
                                          onCameraStop = { () => { this.onCameraStop(); } }
                                        /> : ''
                                  }
                                  </div>
                                  {/*<div className="modal-footer">
                                                                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                                    </div>*/}
                                </div>
                              </div>
                            </div>
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
                                  <span className="resend_otp" onClick={(e)=>this.sendmobileNo(e)}>Resend </span>
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
                   <InputLabel htmlFor="age-simple">SGD</InputLabel>
                   <Select
                         value={this.state.religion}
                         onChange={(event) => this.setState({religion: event.target.value})}
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
                                    <h5>Plus</h5>
                                    <p> Unlinted chat and messaging.Search other members.Lifetime membership</p>
                                    <h6 style={{ marginTop: "77px"}}>IDR 349K</h6>
                                    <Button variant="contained" color="primary" className="jr-btn jr-btn-label bg-teal right" style={{ marginTop: "34px"}}>
                                        <span>Go Plus</span>
                                      </Button>

                                </div>  
                            </div>  
                            <div className="col-md-6">
                                <div className="box_" >
                                   <h5>Silver</h5>
                                   <p> Everything you get with Plus lifetime membership with:</p>
                                   <p>One-on-one consultation with our relationship coach for 6 month worth SGS 120 (SAVE $20)</p>
                                   <h6>IDR 1399K</h6>
                                    <Button variant="contained" color="primary" className="jr-btn jr-btn-label  bg-teal right" style={{ marginTop: "34px"}}>
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
                               <h1 >Bank Transfer/Virtual Account</h1>
                               <h6>IDR 399K</h6>
                               <p>Support BCA, BNI, Mandiri, BRI and all Indonesian banks with ATM Bersama</p>

                            </div>  
                            <div className="box" >
                              <h1  >Debit/Credit Card</h1>
                              <h6>IDR 399K</h6>
                              <p>We accept international payments from all major credit cards</p>
                            </div>  
                            <div className="box" >
                              <h1  >Go-Pay</h1>
                              <h6>IDR 399K</h6>
                              <p>Pay easily and quickly with Go-Pay</p>
                              <p style={{color: "#ff5858"}}>* always IDR no mattor chosen currency</p>
                            </div>  
                            <div className="box" >
                              <h1  >Alfamart</h1>
                              <h6>IDR 399K</h6>
                              <p>Pay on any Alfamart outlet near you</p>
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
                               <p>We accept international payments from all major credit cards</p>
                               <p style={{color: "#ff5858"}}>*only support IDR, SGD, USD, HKD, AUD, CAD, EUR, GBP, NZD, PHP, THB, JPY other selection will use USD</p>

                            </div>  
                            <div className="box" >
                              <h1>Wire Transfer</h1>
                              <h6>IDR 399K</h6>
                              <p>International wire transfer to indonesia bank BCA, BNI, or Mandiri</p>
                            </div>  
                              
                        </div>   
                      </div>
                  <div className="col-md-4"></div>
              </div>
            }
            </div>  
}

sendmobileNo(e){
  var user_id = localStorage.getItem('user_id');
  this.props.verify_mobile_no({mobile:this.state.VerifyMobile,user_id:user_id})
  this.props.getuserprofilebyid({user_id});
}

sendOTP(e){
 
  var user_id = localStorage.getItem('user_id');
  this.props.verify_otp_no({otp:this.state.VerifyOTP,user_id:user_id});
  this.props.getuserprofilebyid({user_id});
  

}





  render() {
  
    const steps = getSteps();
    const {activeStep,DOB,showMessage,alertMessage} = this.state;
    const {profile_update,verify_mobile , OTP} = this.props;

       const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
                console.log("The payment was succeeded!", payment);
                // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    'YOUR-SANDBOX-APP-ID',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

 
  return (
       <div className="app-wrapper">
            <div className="dashboard animated slideInUpTiny animation-duration-3">
               <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
                <h2 className="title mb-3 mb-sm-0">Dashboard</h2>
                <Breadcrumb className="mb-0" tag="nav">
                  <BreadcrumbItem  href={null}>App</BreadcrumbItem>
                  <BreadcrumbItem  href={null}>Dashboard</BreadcrumbItem>
                </Breadcrumb>
              </div>

               <div className="jr-card ">
               <div className="jr-card-body d-flex justify-content-center ">
              {/* <PaypalExpressBtn client={client} currency={'USD'} total={1.00} />*/}

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
                                Back
                              </Button>
                              
                              <Button variant="contained" color="primary" onClick={this.handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                              </Button>
                               <Button
                                disabled={activeStep === 0}
                                onClick={this.handleNext}
                                className="mr-2"
                                style={{float:"right"}}

                              >
                                Skip
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    </div>
                    {showMessage && NotificationManager.error(alertMessage)}
                    {this.props.OTP.status == false && NotificationManager.error(this.props.OTP.message)}
                    {this.props.OTP.status == true && NotificationManager.success(this.props.OTP.message)}
                    
                    <NotificationContainer/>
               
         
       
      </div>
                  

             </div>
       </div>
      
  );
 };
};






const mapStateToProps = ({Profile}) => {
  const {get_user_by_id,edit_user_profile,verify_mobile , OTP} = Profile;
  return {get_user_by_id,edit_user_profile , verify_mobile , OTP}
};

export default connect(mapStateToProps, {
  getuserprofilebyid,
  edit_user_profile,
  verify_mobile_no,
  verify_otp_no,
  showAuthMessage
})(Dashboard);
