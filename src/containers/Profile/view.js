import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import IntlMessages from '../../util/IntlMessages';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Auxiliary from "../../util/Auxiliary";
import {Card, CardTitle} from "reactstrap";
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import swal from 'sweetalert';
import config from "../../config.json";

import {
getuserprofilebyid
} from '../../actions/Profile';

class ProfileView extends React.Component {

  constructor() {
    super();
     this.state = {
      tabChange: 0,
      expanded:4,
      addStatus : '',
      time : '',
      open: false,
      aboutMe:'',
      flag:'',
    }
  }

componentDidMount() {
    var user_id = localStorage.getItem('user_id');
    this.props.getuserprofilebyid({ user_id})
    
}
 componentDidUpdate() {
     const {get_user_by_id } = this.props;
     var timeDifference = "";
     if(get_user_by_id){
         if(get_user_by_id.userPost){
            //get_user_by_id.userPost.forEach(function(element) {
                 timeDifference = this.timeDifference(moment(),moment(get_user_by_id.userPost.length >= 1 ? get_user_by_id.userPost[0].date :''));
            //});
          }

       
           setTimeout(() => {
              this.setState({time:timeDifference})
          }, 3000);
        
     }
        
  }
handleClickOpen = (flag) => {
     const {get_user_by_id } = this.props;
     this.setState({open: true})
     if(get_user_by_id){
         this.setState({open: true,flag:flag,aboutMe:get_user_by_id.userPost[0].about,addStatus:get_user_by_id.userPost[0].status});
     }
   
};

handleRequestClose = () => {
    this.setState({open: false});
}; 

Gallery(e){
  this.setState({tabChange:0})
}

Status(e){
  this.setState({tabChange:1})
}

AboutMe(e){
  this.setState({tabChange:2})
}
addStatus(e){
  this.setState({addStatus:e.target.value})
}
aboutMe(e){
  this.setState({aboutMe:e.target.value})
}
RedirectToImgGallery(val){
  localStorage.setItem('redirect_',val)
  this.props.history.replace("/app/dashboard")
}

postStatus(e){
   var user_id = localStorage.getItem('user_id');
    axios.post(`${config.ApiUrl}AddPost`, {
            status: this.state.addStatus,
            date:moment(),
            user_id:user_id,
          })
          .then(res => {
            if(res.data.status==true){
                 swal(res.data.message);
                 const {get_user_by_id } = this.props;
                  this.setState({open: false});
                 //this.props.history.replace('/app/home');
                 var user_id = localStorage.getItem('user_id');
                 this.props.getuserprofilebyid({ user_id})
            }else{
               swal(res.data.message);
            }
          });
}
SaveAbout(e){
  var user_id = localStorage.getItem('user_id');
    axios.post(`${config.ApiUrl}aboutMe`, {
            aboutMe: this.state.aboutMe,
            user_id:user_id,
          })
          .then(res => {
            if(res.data.status==true){
                 swal(res.data.message);
                 const {get_user_by_id } = this.props;
                  this.setState({open: false});
                 var user_id = localStorage.getItem('user_id');
                 this.props.getuserprofilebyid({ user_id})
            }else{
               swal(res.data.message);
            }
          });

}

timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
  render() {
  
    const {get_user_by_id } = this.props;
    const {tabChange , expanded ,addStatus ,time  , flag ,aboutMe} = this.state;
   

    const Widget = ({children, styleName, title}) => {
        return (
          <Card className={`jr-card jr-card-widget ${styleName}`}>
            {title ? <CardTitle>{title}</CardTitle> : null}
            {children}
          </Card>
        )
    };



 
  return (
  <div className="app-wrapper">
    <Auxiliary>
      <div className="jr-profile-banner" style={{backgroundColor:"#3f51b5"}}>
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
                 { this.props.get_user_by_id.primaryimg != ''  ?
                      <Avatar className="size-90" alt="..." src={this.props.get_user_by_id.primaryimg} className="user-avatar "/> : <Avatar className="size-90" alt="..." src={require('../../assets/images/user_img.png')} className="user-avatar "/> 
                 }


              </div>


            
                <div className="jr-profile-banner-avatar-info">
                  <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">{get_user_by_id!='' ?  get_user_by_id.data[0].username :''} <img src="https://img.icons8.com/color/48/000000/verified-account.png" />{/*<img src="https://img.icons8.com/ios/50/000000/unverified-account-filled.png">*/}</h2>
                    <p className="mb-0 jr-fs-lg">{get_user_by_id!='' ?  get_user_by_id.data[0].address :''}</p>
                </div>
                 
             
            </div>
            <span className="d-inline-flex align-middle ml-1 jr-ml-sm-0" style={{position:"absolute",right:"0",top:"0"}}><Button variant="contained" color="primary" onClick={(e)=>this.RedirectToImgGallery("4")}>Upgrade Now! </Button></span>

            <div className="jr-profile-banner-avatar-info" style={{width:"100%"}}>
                {get_user_by_id.userPost &&  get_user_by_id.userPost.map((about, index) => (
                    <p style={{margin: "23px 83px 20px"}}>
                      {about.about}
                    </p>
                    ))
                    } 
                </div>

            <div className="jr-profile-banner-top-right">
                         <ul className="jr-follower-list">
                           <li>
                             <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">Status</span>
                             <span className="jr-fs-sm">{get_user_by_id!='' ?  get_user_by_id.data[0].status :''}</span></li>
                           <li>
                             <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">Religion</span>
                             <span className="jr-fs-sm">{get_user_by_id!='' ?  get_user_by_id.data[0].religion :''}</span></li>
                           <li>
                             <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">Age</span>
                             <span className="jr-fs-sm">{get_user_by_id!='' ? moment().diff(get_user_by_id.data[0].DOB  , 'years',false)   :'Not set'} years</span>
                           </li>
                         </ul>
                       </div>*
          </div>
          <div className="jr-profile-banner-bottom">
                      <div className="jr-tab-list">
                        <ul className="jr-navbar-nav">
                          <li>
                            <span className="jr-link" onClick={(e)=>this.Gallery(e)}>Gallery</span>
                          </li>
                          <li>
                            <span className="jr-link" onClick={(e)=>this.Status(e)}>Status</span>
                          </li>
                          <li>
                            <span className="jr-link" onClick={(e)=>this.AboutMe(e)}>About Me</span>
                          </li>
                        {/*  <li>
                                                    <span className="jr-link">Friends <span className="jr-fs-xs">287</span></span>
                                                  </li>*/}
                          {/*<li>
                                                      <span className="jr-link">More</span>
                                                    </li>*/}
                        </ul>
                      </div>
                      <span className="jr-link jr-profile-setting">
                        <i className="zmdi zmdi-settings mr-2"/>
                        <span className="d-inline-flex align-middle ml-1 jr-ml-sm-0" onClick={(e)=>this.RedirectToImgGallery("0")}><Link to="/app/dashboard" style={{color:"#fff"}}>Edit Profile</Link></span>

                      </span>
                    </div>
        </div>
      </div>
      <div className="jr-profile-content">
          <div className="row">
           {tabChange == 0 ? 
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
               <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
                <div className="card-header">
                  <h4 className="card-title mb-0 ">Gallery</h4>
                   <h4 className="card-title mb-0  pull-right" style={{float:"right",cursor:"pointer"}} onClick={(e)=>this.RedirectToImgGallery("2")}>Add more photos</h4>
                </div>
                <div className="jr-tabs-content jr-task-list">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="col-md-12">
                              <ul className="jr-agents-list">
                                  {get_user_by_id.user_img && get_user_by_id.user_img.map((img, index) =>
                                     expanded < index ?
                                      <li key={index}>
                                        <div className="jr-profileon ">
                                          <div className="jr-profileon-thumb" style={{maxHeight: "199px"}}><img alt="..." src={img.image}/> </div>
                                          <div className="jr-profileon-content">
                                           
                                          </div>
                                        </div>
                                      </li>
                                      : <li key={index}>
                                        <div className="jr-profileon">
                                          <div className="jr-profileon-thumb" style={{maxHeight: "199px"}}><img alt="..." src={img.image}/></div>
                                          <div className="jr-profileon-content">
                                    
                                          </div>
                                        </div>
                                      </li>
                                  )
                                  }
                                </ul>

                           </div>

                    </div>
                    
                  </div>
                </div>
              </Widget>
            </div>
            :''}
          {tabChange == 1 ? 
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
               <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
                <div className="card-header">
                  <h4 className="card-title mb-0">Status</h4>
                </div>
                <div className="jr-tabs-content jr-task-list">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="jr-profile-container">
                        <div className="jr-profile-banner-top">
                          <div className="jr-profile-banner-top-left">
                            <div className="jr-profile-banner-avatar">
                               { this.props.get_user_by_id.primaryimg != ''  ?
                                    <Avatar className="size-90" alt="..." src={this.props.get_user_by_id.primaryimg} className="user-avatar "/> : <Avatar className="size-90" alt="..." src={require('../../assets/images/user_img.png')} className="user-avatar " style={{cursor:'pointer'}}/> 
                               }
                            </div>
                        </div>
                    
                     <div className="jr-profile-banner-avatar-info">
                        <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">{get_user_by_id!='' ?  get_user_by_id.data[0].username :''} {/*<img src="https://img.icons8.com/color/48/000000/verified-account.png" style={{cursor:'pointer'}}/>*/}{/*<img src="https://img.icons8.com/ios/50/000000/unverified-account-filled.png">*/}</h2>
                        <p className="mb-0 jr-fs-lg">{time}</p>
                      </div>
                       <div className="jr-profile-banner-avatar-info" style={{width:"100%"}}>
                         {get_user_by_id.userPost &&  get_user_by_id.userPost.map((status, index) => (
                              <p style={{margin: "31px 0px 0px"}}>
                                {status.status}  <img src="https://img.icons8.com/metro/26/000000/pencil.png" variant="contained"  onClick={(e)=>this.handleClickOpen("about")}  style={{cursor:'pointer'}}/>
                              </p>
                              ))
                              }
                      </div>
                  </div>
                  </div>
                  </div>
                  </div>
                </div>
              </Widget>
            </div>
           :''}
           {tabChange == 2 ? 
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
               <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
                <div className="card-header">
                  <h4 className="card-title mb-0">About Me</h4>
                </div>
                <div className="jr-tabs-content jr-task-list">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="jr-profile-container">
                        <div className="jr-profile-banner-top">
                          <div className="jr-profile-banner-top-left">
                            <div className="jr-profile-banner-avatar">
                               { this.props.get_user_by_id.primaryimg != ''  ?
                                    <Avatar className="size-90" alt="..." src={this.props.get_user_by_id.primaryimg} className="user-avatar "/> : <Avatar className="size-90" alt="..." src={require('../../assets/images/user_img.png')} className="user-avatar style={{cursor:'pointer'}}"/> 
                               }
                            </div>
                        </div>
                    
                     <div className="jr-profile-banner-avatar-info">
                        <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">{get_user_by_id!='' ?  get_user_by_id.data[0].username :''} {/*<img src="https://img.icons8.com/color/48/000000/verified-account.png" style={{cursor:'pointer'}}/>*/}{/*<img src="https://img.icons8.com/ios/50/000000/unverified-account-filled.png">*/}</h2>
                      </div>
                       <div className="jr-profile-banner-avatar-info" style={{width:"100%"}}>
                       {get_user_by_id.userPost &&  get_user_by_id.userPost.map((about, index) => (

                              <p style={{margin: "31px 0px 0px"}}>
                                {about.about}  <img src="https://img.icons8.com/metro/26/000000/pencil.png" variant="contained"  onClick={(e)=>this.handleClickOpen("about")}  style={{cursor:'pointer'}}/>
                              </p>
                              ))
                              }
                      </div>
                  </div>
                  </div>
                  </div>
                  </div>
                </div>
              </Widget>
            </div>
            :''}
      
          </div>
        </div>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} style={{width:"100"}}>
          <DialogTitle>{flag =="about" ?" About me"  : "Add Status"}</DialogTitle>
          <DialogContent>
            {/*<DialogContentText>
                          To subscribe to this website, please enter your email address here. We will send
                          updates occationally.
                        </DialogContentText>*/}
        {flag =="about" ? 

            <textarea
              autoFocus
              margin="dense"
              id="name"
              placeholder="Write something here"
              onChange={(e)=>this.aboutMe(e)}
              defaultValue={aboutMe}
              style={{width:'430px',border: 'none',outline:'none'}}
            />
            :  <textarea
              autoFocus
              margin="dense"
              id="name"
              placeholder="Write something here"
              onChange={(e)=>this.addStatus(e)}
              defaultValue={addStatus}
              style={{width:'430px',border: 'none',outline:'none'}}
            />
          }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="secondary">
              Cancel
            </Button>
             {flag =="about" ? 
                <Button onClick={(e)=>this.SaveAbout(e)} color="primary">
                  Post Status
                </Button>:
                <Button onClick={(e)=>this.postStatus(e)} color="primary">
                  Post Status
                </Button> }
          </DialogActions>
        </Dialog>
     </Auxiliary>
     </div>
      
  );
 };
};






const mapStateToProps = ({Profile}) => {
  const {get_user_by_id} = Profile;
  return {get_user_by_id}
};

export default connect(mapStateToProps, {
  getuserprofilebyid,
})(ProfileView);

