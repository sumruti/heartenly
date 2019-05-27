import React from 'react';
import {connect} from 'react-redux';
//import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IntlMessages from '../../util/IntlMessages';
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
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import {
  auth

} from "../../firebase/firebase";
import {showAuthMessage} from "../../actions/Auth";

//import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

import 'react-html5-camera-photo/build/css/index.css';
import Fab from '@material-ui/core/Fab';
import $ from 'jquery';
import ReactPhoneInput from '@material-ui/core/Fab';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
//import  './style.css'
import config from "../../config.json";
import axios from "axios";
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';

import classnames from 'classnames';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


import {
  your_criteria,
  user_work,
  user_education,
  user_domicile,
  udate_basic_info,
} from '../../actions/Profile';
import {
  showAuthLoader,

} from '../../actions/Auth';







class editProfile extends React.Component {
  constructor() {
    super();
     this.state = {
      Until:'',
      Years:'',
      Minimaleducation:'',
      tribe:'',
      skin_Color:'',
      height : 100,
      Width : 0,
      Daily:'',
      Lifestyle:'',
      minimumincome:'',
      criteriacouple:'',
      status:'',
      religion:'',
      interestedIn:'',
      nickName:'',

      physical:'',
      Eyeglasses:'',
      Veli:'',
      Smoke:'',
      Alcohol:'',
      Tattoo:'',
      Piercing:'',
      hobby:'',
      bio:'',
      currentcity:'',
      Homestatus:'',
      Hometown:'',
      Lasteducation:'',
      Departement:'',
      Work:'',
      income:'',
      fullName:'',
      DOB:moment().format("YYYY-MM-DD"),
      email:'',
      phone:'',
      user_id:localStorage.getItem('user_id'),
      activeTab: '1',
      loader: false,
      flag:true,
       
    }
        // this.onDrop = this.onDrop.bind(this);
  }

   componentDidMount() {
      var user_id = localStorage.getItem('user_id');
      this.getUserCriteria(user_id);
      
      
   }

   /*componentDidUpdate() {
    const {criteria,basicInfo,Domicile,user_education,user_work} = this.props;
    if(criteria){
        setTimeout(() => {
          this.setState({showMessage:'',flag:false})
        }, 3000);
      }
       
  }*/
  
 
 
 
  

componentWillReceiveProps(nextProps) {
    const {get_user_by_id } = nextProps;

}

 handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      height: value
    })
  };
  DOB = (date) => {
          this.setState({DOB: moment(date.target.value).format("MM-DD-YYYY")});
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  getUserCriteria(user_id){
    axios.post(`${config.ApiUrl}getUserCriteria`, {
            user_id: user_id,
          })
          .then(res => {

               if(res.data.status==true){

                  this.setState({
                   Daily: res.data.data[0].Daily,
                   Lifestyle: res.data.data[0].Lifestyle,
                   Minimaleducation: res.data.data[0].Minimaleducation,
                   Until: res.data.data[0].Until,
                   Width: res.data.data[0].Width,
                   height: res.data.data[0].height,
                   Years: res.data.data[0].Years,
                   skin_Color: res.data.data[0].skin_Color,
                   tribe: res.data.data[0].tribe,
                   criteriacouple: res.data.data[0].criteriacouple,
                   minimumincome: res.data.data[0].minimumincome,
                   physical: res.data.data[0].physical,
                   Eyeglasses: res.data.data[0].Eyeglasses,
                   Smoke: res.data.data[0].Smoke,
                   Veli: res.data.data[0].Veli,
                   Alcohol: res.data.data[0].Alcohol,
                   Tattoo: res.data.data[0].Tattoo,
                   Piercing: res.data.data[0].Piercing,
                   hobby: res.data.data[0].hobby,
                 
                  })

               }
            
            
          });
  }

  getUserwork(user_id){
    axios.post(`${config.ApiUrl}getUserWork`, {
            user_id: user_id,
          })
          .then(res => {

               if(res.data.status==true){

                  this.setState({
                   Work: res.data.data[0].Work,
                   income: res.data.data[0].income,
               
                  })

               }
            
            
          });
  }

  getusereducation(user_id){
     axios.post(`${config.ApiUrl}getusereducation`, {
            user_id: user_id,
          })
          .then(res => {
               if(res.data.status==true){
                  this.setState({
                   Lasteducation: res.data.data[0].Lasteducation,
                   Departement: res.data.data[0].Departement,
                  })
               }
          });

  }
  getuserDomicile(user_id){
     axios.post(`${config.ApiUrl}getuserDomiciles`, {
            user_id: user_id,
          })
          .then(res => {
               if(res.data.status==true){
                  this.setState({
                     currentcity: res.data.data[0].currentcity,
                     Homestatus: res.data.data[0].Homestatus,
                     Hometown: res.data.data[0].Hometown,
                  })
               }
          });
  }

  getuserBasicInfo(user_id){
     axios.post(`${config.ApiUrl}users/GetUserById`, {
            user_id: user_id,
          })
          .then(res => {
               if(res.status==201){
                  this.setState({
                     status: res.data.data[0].status,
                     religion: res.data.data[0].religion,
                     nickName: res.data.data[0].nickName,
                     interestedIn: res.data.data[0].interestedIn,
                     phone: res.data.data[0].mobileNumber,
                     email: res.data.data[0].email,
                     fullName: res.data.data[0].fullName,
                     DOB: moment(res.data.data[0].DOB).format("YYYY-MM-DD"),
                  })
               }
          });
  }

  toggle = (tab) => {
    var user_id = localStorage.getItem('user_id');
     if(tab=="2" || tab =="4"){
        this.getuserBasicInfo(user_id);
     }else if(tab=="7"){
        this.getUserwork(user_id);
     }else if(tab=="6"){
         this.getusereducation(user_id);

     }else if(tab=="5"){
       this.getuserDomicile(user_id);
     }
   
    if (this.state.activeTab !== tab) {
       
      this.setState({
        activeTab: tab
      });
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
     
      loader: true
    });
    setTimeout(() => {
      this.setState({loader: false});
    }, 1500);
  };






  render() {
  
    const {Until,Years,Minimaleducation,tribe,skin_Color,height,Width,
            Daily,Lifestyle,minimumincome,criteriacouple,user_id,
            physical,Eyeglasses,Veli,Smoke,Alcohol,Tattoo,Piercing,hobby,
            Work,income,
            Lasteducation,Departement,
            currentcity,Homestatus,Hometown,
            status,religion,interestedIn,nickName,fullName,email,phone,DOB,
           flag

        } = this.state;

  
    const {criteria} = this.props;

  console.log(DOB,'--')
  return (
       <div className="app-wrapper">
            <div className="dashboard animated slideInUpTiny animation-duration-3">
               <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
                <h2 className="title mb-3 mb-sm-0"><IntlMessages id="sidebar.editProfile" /> </h2>
                <Breadcrumb className="mb-0" tag="nav">
                  <BreadcrumbItem  href={null}><IntlMessages id="sidebar.App"/></BreadcrumbItem>
                  <BreadcrumbItem  href={null}><IntlMessages id="sidebar.Profile"/>  </BreadcrumbItem>
                </Breadcrumb>
              </div>



               <div className="jr-card ">
                 <div className="jr-card-body d-flex justify-content-center ">
                    <div className="w-100">

                          <Nav className="jr-tabs-pills-ctr" pills>
                            <NavItem>
                              <NavLink
                                className={classnames({active: this.state.activeTab === '1'})}
                                onClick={() => {
                                  this.toggle('1');
                                }}>
                                Your Criteria
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                  this.toggle('2');
                                }}
                              >
                                Basic Info
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({active: this.state.activeTab === '3'})}
                                onClick={() => {
                                  this.toggle('3');
                                }}>
                                About me
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({active: this.state.activeTab === '4'})}
                                onClick={() => {
                                  this.toggle('4');
                                }}>
                                Personal Data
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({active: this.state.activeTab === '5'})}
                                onClick={() => {
                                  this.toggle('5');
                                }}>
                                Domicile
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({active: this.state.activeTab === '6'})}
                                onClick={() => {
                                  this.toggle('6');
                                }}>
                               Your education
                              </NavLink>
                            </NavItem>
                             <NavItem>
                              <NavLink
                                className={classnames({active: this.state.activeTab === '7'})}
                                onClick={() => {
                                  this.toggle('7');
                                }}>
                               Your work
                              </NavLink>
                            </NavItem>
                          </Nav>
                    

                        <TabContent className="jr-tabs-content" activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <h2 className="title" style={{marginBottom:"18px"}}>Your Criteria  </h2>
                              <div className="row">
                                <div className="col-sm-6 col-xs-6">
                                  
                                      <FormLabel component="legend">Age</FormLabel>
                                        <div className="row">
                                           <div className="col-sm-6 col-xs-6">
                                             <div className="form-group">
                                                <TextField
                                                  id="userName"
                                                  label='Until'
                                                  margin="normal"
                                                  value={this.state.Until}
                                                  onChange={(event) => this.setState({Until: event.target.value})}
                                                  fullWidth
                                                />
                                              </div>
                                           </div>
                                       <div className="col-sm-6 col-xs-6">
                                         <div className="form-group">
                                              <TextField
                                                id="userName"
                                                label='Years'
                                                margin="normal"
                                                value={this.state.Years}
                                                onChange={(event) => this.setState({Years: event.target.value})}
                                                fullWidth
                                              />
                                            </div>
                                          </div>
                                      </div>

                                          <div className="form-group">
                                            <TextField
                                              id="userName"
                                              label='Minimal education'
                                              margin="normal"
                                              value={this.state.Minimaleducation}
                                              onChange={(event) => this.setState({Minimaleducation: event.target.value})}
                                              fullWidth
                                            />
                                        </div>  

                                         <div className="form-group">
                                            <TextField
                                              id="userName"
                                              label='tribe'
                                              margin="normal"
                                              value={this.state.tribe}
                                              onChange={(event) => this.setState({tribe: event.target.value})}
                                              fullWidth
                                            />
                                        </div>  
                                        <div className="form-group">
                                          <FormControl component="fieldset" required>
                                              <FormLabel component="legend">Skin Color</FormLabel>
                                              <RadioGroup
                                                aria-label="skin_Color"
                                                name="skin_Color"
                                                value={this.state.skin_Color}

                                                className="d-flex flex-row"
                                                onChange={(event) => this.setState({skin_Color: event.target.value})}
                                              >
                                                <FormControlLabel value="Black" control={<Radio color="primary"/>} label='Black'/>
                                                <FormControlLabel value="White" control={<Radio color="primary"/>} label='White'/>
                                                <FormControlLabel value="Dark Brown" control={<Radio color="primary"/>} label='Dark Brown'/>
                                                <FormControlLabel value="Light Yellow" control={<Radio color="primary"/>} label='Light Yellow'/>
                                                <FormControlLabel value="Light Brown" control={<Radio color="primary"/>} label='Light Brown'/>
                                              </RadioGroup>
                                            </FormControl>
                                        </div> 
                                        <div className="form-group">
                                          <FormControl component="fieldset" required>
                                              <FormLabel component="legend">Life Style</FormLabel>
                                              <RadioGroup
                                                aria-label="Lifestyle"
                                                name="Lifestyle"
                                                value={this.state.Lifestyle}

                                                className="d-flex flex-row"
                                                onChange={(event) => this.setState({Lifestyle: event.target.value})}
                                              >
                                                <FormControlLabel value="accept alcohol drinkers" control={<Radio color="primary"/>} label='accept alcohol drinkers'/>
                                                <FormControlLabel value="accept the piercing" control={<Radio color="primary"/>} label='Accept the piercing'/>
                                                <FormControlLabel value="accept the tattoed" control={<Radio color="primary"/>} label='Accept the tattoed'/>
                                               
                                              </RadioGroup>
                                            </FormControl>
                                        </div>  
                                        </div> 
                                        <div className="col-sm-6 col-xs-6">


                                         <div className="form-group">
                                          <FormControl component="fieldset" required>
                                              <FormLabel component="legend">Height(100-170 cm)</FormLabel>

                                                 <Slider
                                                    min={100}
                                                    max={170}
                                                    value={this.state.height}
                                                    onChangeStart={this.handleChangeStart}
                                                    onChange={(event) => this.setState({height: event})}
                                                    onChangeComplete={this.handleChangeComplete}
                                                  />
                                             </FormControl>
                                        </div>  
                                        <div className="form-group">
                                          <FormControl component="fieldset" required>
                                              <FormLabel component="legend">Width(40-80 kg)</FormLabel>

                                                 <Slider
                                                    min={0}
                                                    max={100}
                                                    value={this.state.Width}
                                                    onChangeStart={this.handleChangeStart}
                                                    onChange={(event) => this.setState({Width: event})}
                                                    onChangeComplete={this.handleChangeComplete}
                                                  />
                                             </FormControl>
                                        </div>  
                                         <div className="form-group">
                                          <FormControl component="fieldset" required>
                                              <FormLabel component="legend">Daily</FormLabel>
                                              <RadioGroup
                                                aria-label="skin_Color"
                                                name="Daily"
                                                value={this.state.Daily}

                                                className="d-flex flex-row"
                                                onChange={(event) => this.setState({Daily: event.target.value})}
                                              >
                                                <FormControlLabel value="want those who don’t use glasses" control={<Radio color="primary"/>} label='Want those who don’t use glasses'/>
                                                <FormControlLabel value="want those who wear a headscraf" control={<Radio color="primary"/>} label='Want those who wear a headscraf'/>
                                                <FormControlLabel value="accept smokers" control={<Radio color="primary"/>} label='Accept smokers'/>
                
                                              </RadioGroup>
                                            </FormControl>
                                        </div> 

                                       

                                         


                                       <div className="form-group">
                                            <TextField
                                              id="userName"
                                              label='Minimum Income'
                                              margin="normal"
                                              value={this.state.minimumincome}
                                              onChange={(event) => this.setState({minimumincome: event.target.value})}
                                              fullWidth
                                            />
                                        </div> 

                                        <div className="form-group">
                                            <TextField
                                              id="userName"
                                              label='Criteria couple'
                                              margin="normal"
                                              value={this.state.criteriacouple}
                                              onChange={(event) => this.setState({criteriacouple: event.target.value})}
                                              fullWidth
                                            />
                                        </div>   
                                          <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <Button onClick={() => {
                                                  this.setState({flag: true})
                                                  this.props.showAuthLoader();
                                                   this.props.your_criteria({user_id,Until,Years,Minimaleducation,tribe,skin_Color,height,Width,Daily,Lifestyle,minimumincome,criteriacouple,
                                                      physical,Eyeglasses,Veli,Smoke,Alcohol,Tattoo,Piercing,hobby })
                                                }} variant="contained" color="primary">
                                                 Save
                                                </Button>
                                         </div>  
                                         </div>  
                                         </div>  
                            
                          </TabPane>

                          <TabPane tabId="2">

                            <div className="row">
                              <div className="col-sm-6">
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
                               <div className="form-group">
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
                              <div className="col-sm-6">
                                   <div className="form-group">
                                          <TextField
                                            id="userName"
                                            label=' Interested In'
                                            margin="normal"
                                            value={this.state.interestedIn}
                                            onChange={(event) => this.setState({interestedIn: event.target.value})}
                                            fullWidth
                                          />
                                      </div>   

                                      <div className="form-group">
                                          <TextField
                                            id="userName"
                                            label='Nick Name '
                                            margin="normal"
                                            value={this.state.nickName}
                                            onChange={(event) => this.setState({nickName: event.target.value})}
                                            fullWidth
                                          />
                                      </div>  

                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                          <Button onClick={() => {
                                            this.props.showAuthLoader();
                                             this.props.udate_basic_info({user_id,status,religion,interestedIn,nickName,fullName,email,phone,DOB})
                                          }} variant="contained" color="primary">
                                           Save
                                          </Button>
                                   </div> 

                              
                              </div>

                            </div>
                           
                          </TabPane>
                         
                          <TabPane tabId="3">

                            <div className="row">
                              <div className="col-sm-6">
                                 <div className="form-group">
                                      <TextField
                                        id="userName"
                                        label='tribe'
                                        margin="normal"
                                        value={this.state.tribe}
                                        onChange={(event) => this.setState({tribe: event.target.value})}
                                        fullWidth
                                      />
                                  </div>   

                                  <div className="form-group cc-selector-2">
                                   <FormControl component="fieldset" required>
                                       <FormLabel component="legend">Physical</FormLabel>
                                       <RadioGroup
                                         aria-label="physical"
                                         name="Lifestyle"
                                         value={this.state.physical}

                                         className="d-flex flex-row"
                                         onChange={(event) => this.setState({physical: event.target.value})}
                                       >
                                         <FormControlLabel className="drinkcard-cc visa" value="1" control={<Radio color="primary"/>} />
                                         <FormControlLabel  className="drinkcard-cc mastercard" value="2" control={<Radio color="primary"/>} />
                                        
                                       </RadioGroup>
                                     </FormControl>
                                                             

                                  </div> 
                                  <div className="form-group">
                                    <FormControl component="fieldset" required>
                                        <FormLabel component="legend">Skin Color</FormLabel>
                                        <RadioGroup
                                          aria-label="skin_Color"
                                          name="skin_Color"
                                          value={this.state.skin_Color}

                                          className="d-flex flex-row"
                                          onChange={(event) => this.setState({skin_Color: event.target.value})}
                                        >
                                          <FormControlLabel value="Black" control={<Radio color="primary"/>} label='Black'/>
                                          <FormControlLabel value="White" control={<Radio color="primary"/>} label='White'/>
                                          <FormControlLabel value="Dark Brown" control={<Radio color="primary"/>} label='Dark Brown'/>
                                          <FormControlLabel value="Light Yellow" control={<Radio color="primary"/>} label='Light Yellow'/>
                                          <FormControlLabel value="Light Brown" control={<Radio color="primary"/>} label='Light Brown'/>
                                        </RadioGroup>
                                      </FormControl>
                                  </div> 



                                      <div className="form-group">
                                         <FormControl component="fieldset" required>
                                             <FormLabel component="legend">Eyeglasses</FormLabel>
                                             <RadioGroup
                                               aria-label="physical"
                                               name="Lifestyle"
                                               value={this.state.Eyeglasses}

                                               className="d-flex flex-row"
                                               onChange={(event) => this.setState({Eyeglasses: event.target.value})}
                                             >
                                               <FormControlLabel value="None" control={<Radio color="primary"/>} label='None'/>
                                                <FormControlLabel value="Glasses" control={<Radio color="primary"/>} label='Glasses '/>
                                                <FormControlLabel value="Contact lenses " control={<Radio color="primary"/>} label='Contact lenses '/>
                                              
                                             </RadioGroup>
                                           </FormControl>
                                                             

                                  </div> 
                                  

                                    <div className="form-group">
                                    <FormControl component="fieldset" required>
                                        <FormLabel component="legend">Smoke</FormLabel>
                                        <RadioGroup
                                          aria-label="Smoke"
                                          name="Smoke"
                                          value={this.state.Smoke}

                                          className="d-flex flex-row"
                                          onChange={(event) => this.setState({Smoke: event.target.value})}
                                        >
                                          <FormControlLabel value="Never smoke" control={<Radio color="primary"/>} label='Never smoke'/>
                                          <FormControlLabel value="Stopped smoking" control={<Radio color="primary"/>} label='Stopped smoking'/>
                                          <FormControlLabel value="Sometimes smoke" control={<Radio color="primary"/>} label='Sometimes smoke'/>
                                          <FormControlLabel value="Smokes" control={<Radio color="primary"/>} label='Smokes'/>
                                         
                                        </RadioGroup>
                                      </FormControl>
                                  </div> 
                                  <div className="form-group">
                                    <FormControl component="fieldset" required>
                                        <FormLabel component="legend">Alcohol</FormLabel>
                                        <RadioGroup
                                          aria-label="Alcohol"
                                          name="Alcohol"
                                          value={this.state.Alcohol}

                                          className="d-flex flex-row"
                                          onChange={(event) => this.setState({Alcohol: event.target.value})}
                                        >
                                          <FormControlLabel value="Never drink" control={<Radio color="primary"/>} label='Never drink'/>
                                          <FormControlLabel value="Stopped drinking" control={<Radio color="primary"/>} label='Stopped drinking'/>
                                          <FormControlLabel value="Sometimes drink" control={<Radio color="primary"/>} label='Sometimes drink'/>
                                          <FormControlLabel value="Regular drinker" control={<Radio color="primary"/>} label='Regular drinker'/>
                                         
                                        </RadioGroup>
                                      </FormControl>
                                  </div> 
                                 <div className="form-group">
                                    <FormControl component="fieldset" required>
                                        <FormLabel component="legend">Tattoo</FormLabel>
                                        <RadioGroup
                                          aria-label="Tattoo"
                                          name="Tattoo"
                                          value={this.state.Tattoo}

                                          className="d-flex flex-row"
                                          onChange={(event) => this.setState({Tattoo: event.target.value})}
                                        >
                                          <FormControlLabel value="No tattoo" control={<Radio color="primary"/>} label='No tattoo'/>
                                          <FormControlLabel value="Facial tattoo" control={<Radio color="primary"/>} label='Facial tattoo'/>
                                          <FormControlLabel value="Public parts tattoo" control={<Radio color="primary"/>} label='Public parts tattoo'/>
                                          <FormControlLabel value="Private parts tattoo" control={<Radio color="primary"/>} label='Private parts tattoo'/>
                                         
                                        </RadioGroup>
                                      </FormControl>
                                  </div>  
                                  </div> 
                                   <div className="col-sm-6">
                                    <div className="form-group">
                                      <TextField
                                        id="userName"
                                        label='Veli'
                                        margin="normal"
                                        value={this.state.Veli}
                                        onChange={(event) => this.setState({Veli: event.target.value})}
                                        fullWidth
                                      />
                                   </div> 
                                    <div className="form-group">
                                          <FormControl component="fieldset" required>
                                              <FormLabel component="legend">Height(100-170 cm)</FormLabel>

                                                 <Slider
                                                    min={100}
                                                    max={170}
                                                    value={this.state.height}
                                                    onChangeStart={this.handleChangeStart}
                                                    onChange={(event) => this.setState({height: event})}
                                                    onChangeComplete={this.handleChangeComplete}
                                                  />
                                             </FormControl>
                                        </div>  
                                        <div className="form-group">
                                          <FormControl component="fieldset" required>
                                              <FormLabel component="legend">Width(40-80 kg)</FormLabel>

                                                 <Slider
                                                    min={0}
                                                    max={100}
                                                    value={this.state.Width}
                                                    onChangeStart={this.handleChangeStart}
                                                    onChange={(event) => this.setState({Width: event})}
                                                    onChangeComplete={this.handleChangeComplete}
                                                  />
                                             </FormControl>
                                        </div>  

                                   

                                   <div className="form-group">
                                    <FormControl component="fieldset" required>
                                        <FormLabel component="legend">Piercing</FormLabel>
                                        <RadioGroup
                                          aria-label="Piercing"
                                          name="Piercing"
                                          value={this.state.Piercing}

                                          className="d-flex flex-row"
                                          onChange={(event) => this.setState({Piercing: event.target.value})}
                                        >
                                          <FormControlLabel value="No piercing" control={<Radio color="primary"/>} label='No piercing'/>
                                          <FormControlLabel value="Facial piercing" control={<Radio color="primary"/>} label='Facial piercing'/>
                                          <FormControlLabel value="Public parts piercing" control={<Radio color="primary"/>} label='Public parts piercing'/>
                                          <FormControlLabel value="Private parts piercing" control={<Radio color="primary"/>} label='Private parts piercing'/>
                                         
                                        </RadioGroup>
                                      </FormControl>
                                  </div>  
                                  <div className="form-group">
                                      <TextField
                                        id="hobby"
                                        label='hobby'
                                        margin="normal"
                                        value={this.state.hobby}
                                        onChange={(event) => this.setState({hobby: event.target.value})}
                                        fullWidth
                                      />
                                  </div> 
                                  <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <Button onClick={() => {
                                      this.props.showAuthLoader();
                                       this.props.your_criteria({user_id,Until,Years,Minimaleducation,tribe,skin_Color,height,Width,Daily,Lifestyle,minimumincome,criteriacouple,
                                          physical,Eyeglasses,Veli,Smoke,Alcohol,Tattoo,Piercing,hobby })
                                    }} variant="contained" color="primary">
                                     Save
                                    </Button>
                             </div>  
                              </div>
                            </div>
                           
                          </TabPane>
                          <TabPane tabId="4">

                            <div className="row">
                               <div className="col-sm-6">
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
                                      <div className="col-sm-6">

                                      <div className="form-group">
                                          <TextField
                                            id="email"
                                            value={this.state.email}
                                            label="email"
                                            onChange={(event) => this.setState({email: event.target.value})}
                                            margin="normal"
                                            fullWidth
                                          />
                                        </div> 

                                          <div className="form-group">
                                              <TextField
                                                id="phone"
                                                value={this.state.phone}
                                                label="Phone"
                                                onChange={(event) => this.setState({phone: event.target.value})}
                                                margin="normal"
                                                fullWidth
                                              />
                                            </div> 
                                             <div className="mb-3 d-flex align-items-center justify-content-between">
                                                  <Button onClick={() => {
                                                    this.props.showAuthLoader();
                                                     this.props.udate_basic_info({user_id,status,religion,interestedIn,nickName,fullName,email,phone,DOB})
                                                  }} variant="contained" color="primary">
                                                   Save
                                                  </Button>
                                           </div> 
                               </div>
                            </div>

                           </TabPane>

                            <TabPane tabId="5">
                             <div className="row">
                                <div className="col-sm-6">
                                   <div className="form-group">
                                      <TextField
                                        id="currentcity"
                                        label='Current City '
                                        margin="normal"
                                        value={this.state.currentcity}
                                        onChange={(event) => this.setState({currentcity: event.target.value})}
                                        fullWidth
                                      />
                                  </div>  

                                   <div className="form-group">
                                      <TextField
                                        id="Homestatus"
                                        label='Home Status'
                                        margin="normal"
                                        value={this.state.Homestatus}
                                        onChange={(event) => this.setState({Homestatus: event.target.value})}
                                        fullWidth
                                      />
                                   </div>  
                                  </div>  

                                  <div className="col-sm-6">

                                   <div className="form-group">
                                      <TextField
                                        id="Hometown"
                                        label='Home Town'
                                        margin="normal"
                                        value={this.state.Hometown}
                                        onChange={(event) => this.setState({Hometown: event.target.value})}
                                        fullWidth
                                      />
                                  </div>  
                                  <div className="mb-3 d-flex align-items-center justify-content-between">
                                          <Button onClick={() => {
                                            this.props.showAuthLoader();
                                             this.props.user_domicile({user_id,currentcity,Homestatus,Hometown})
                                          }} variant="contained" color="primary">
                                           Save
                                          </Button>
                                   </div>  
                                </div>
                             </div>
                            </TabPane>
                            <TabPane tabId="6">
                             <div className="row">
                               <div className="col-sm-6">
                                <div className="form-group">
                                      <TextField
                                        id="Lasteducation"
                                        label='Last Education or being taken'
                                        margin="normal"
                                        value={this.state.Lasteducation}
                                        onChange={(event) => this.setState({Lasteducation: event.target.value})}
                                        fullWidth
                                      />
                                  </div> 

                                  
                                   </div> 
                                    <div className="col-sm-6">
                                         <div className="form-group">
                                          <TextField
                                            id="Departement"
                                            label='Departement'
                                            margin="normal"
                                            value={this.state.Departement}
                                            onChange={(event) => this.setState({Departement: event.target.value})}
                                            fullWidth
                                          />
                                      </div>  

                                        <div className="mb-3 d-flex align-items-center justify-content-between">
                                              <Button onClick={() => {
                                                this.props.showAuthLoader();
                                                 this.props.user_education({user_id, Lasteducation,Departement})
                                              }} variant="contained" color="primary">
                                               Save
                                              </Button>
                                       </div> 

                                   </div> 
                             </div>
                            </TabPane>
                            <TabPane tabId="7">
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                      <TextField
                                        id="work"
                                        label='Work'
                                        margin="normal"
                                        value={this.state.Work}
                                        onChange={(event) => this.setState({Work: event.target.value})}
                                        fullWidth
                                      />
                                  </div>  

                                 
                                </div> 
                                <div className="col-sm-6">
                                     <div className="form-group">
                                      <TextField
                                        id="income"
                                        label='Income'
                                        margin="normal"
                                        value={this.state.income}
                                        onChange={(event) => this.setState({income: event.target.value})}
                                        fullWidth
                                      />
                                  </div>   

                                  <div className="mb-3 d-flex align-items-center justify-content-between">
                                          <Button onClick={() => {
                                            this.props.showAuthLoader();
                                             this.props.user_work({user_id,Work,income})
                                          }} variant="contained" color="primary">
                                           Save
                                          </Button>
                                   </div>  
                                </div> 
                              </div>
                            </TabPane>
                        </TabContent>
                      </div>
                      </div>


                      

                    
              </div>
                  

             </div>
           
            
       </div>
      
  );
 };
};






const mapStateToProps = ({Profile}) => {

  const {your_criteria,user_work, user_education ,criteria, user_domicile ,udate_basic_info, loader } = Profile;
  return {your_criteria,user_work, user_education ,criteria, user_domicile ,udate_basic_info, loader}
};
 
export default connect(mapStateToProps, {
  your_criteria,
  user_work,
  user_education,
  user_domicile,
  udate_basic_info,
  showAuthLoader
})(editProfile);

