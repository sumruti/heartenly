import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import IntlMessages from '../util/IntlMessages';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import config from "../config.json";

import {
  hideMessage,
  showAuthLoader,
  forgot_Password,
} from '../actions/Auth';

class ForgotPassword extends React.Component {

   constructor() {
    super();
    this.state = {
      email: '',
      NewPass: '',
      ConfirmPass: '',
      errorMessage: '',
      succesMessage: '',
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
        this.setState({errorMessage:""});
      }, 3000);
    }

    /*if (this.props.authUser !== null) {
      this.props.history.push('/');
    }*/
  }

  reset_Password(e){
    if(!this.state.NewPass){
      this.setState({errorMessage:"Please enter new password"});
         return false
    }
    if(!this.state.ConfirmPass){
      this.setState({errorMessage:"Please enter confirm password"});
         return false
    }
     if(this.state.NewPass != this.state.ConfirmPass){
         this.setState({errorMessage:"Confirm Password not match"});
         return false

     }
      axios.post(`${config.ApiUrl}users/forgotpassword
          `,{NewPass:this.state.NewPass,email:this.state.email,flag:"Newpassword"})
          .then(res => res)
          .then(
            (result) => {
              if(result.data){
              this.setState({
                  succesMessage: result.data.message
              });
               setTimeout(() => {
                    this.props.hideMessage();
                    this.props.history.push('/');
                }, 3000);
              
            }
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
  }

  render() {
    const {email,errorMessage,succesMessage} = this.state;
    console.log(NotificationManager.error);
    const {showMessage, loader, alertMessage,alertSuccessMessage,forgot} = this.props;

    console.log(succesMessage,'--------------');
 
  return (
    <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="login-content">
        <div className="login-header">
          <Link className="logo-lg" to="/" title="Heartenly">
              <img src={require("../assets/images/logo.png")} alt="Heartenly" title="Heartenly" style={{height: "43px"}}/>
              <h1 style={{color:"#fff"}}>Heartenly</h1>
           </Link>
        </div>
 {!forgot ? 
  <div>
        <div className="mb-2">
          <h2><IntlMessages id="appModule.forgotPassword"/></h2>
        </div>
       
        <div className="login-form">
          <form method="post" action="/">
            <TextField
              type="email"
              id="required"
              label={<IntlMessages id="appModule.email"/>}
              fullWidth
              defaultValue=""
              margin="normal"
              className="mt-0 mb-4"
              onChange={(event) => this.setState({email: event.target.value,errorMessage:''})}
            />

            <p className="mb-3">
              <IntlMessages id="appModule.dntRememberEmail"/> &nbsp;
              <span className="small jr-link">
                <IntlMessages id="appModule.contactSupport"/>
              </span>
            </p>

            <Button variant="contained" color="primary" className="text-white" onClick={() => {
                    this.props.showAuthLoader();
                    this.props.forgot_Password({email});
                  }}>
              <IntlMessages id="appModule.resetPassword"/>
            </Button>
          </form>
        </div> 
        </div> : 
        <div>
          <div className="mb-2">
          <h2>Set a new password</h2>
          <p>Please use this form to set a new password</p>
        </div>
        <div className="login-form">
          <form method="post" action="/">
            <TextField
              type="text"
              id="required"
              label="New Password"
              fullWidth
              defaultValue=""
              margin="normal"
              className="mt-0 mb-4"
              onChange={(event) => this.setState({NewPass: event.target.value,errorMessage:''})}
            />
            <TextField
              type="text"
              id="required"
              label="Confirm Password"
              fullWidth
              defaultValue=""
              margin="normal"
              className="mt-0 mb-4"
              onChange={(event) => this.setState({ConfirmPass: event.target.value,errorMessage:''})}
            />

            <p className="mb-3">
              <IntlMessages id="appModule.dntRememberEmail"/> &nbsp;
              <span className="small jr-link">
                <IntlMessages id="appModule.contactSupport"/>
              </span>
            </p>

            <Button variant="contained" color="primary" className="text-white" onClick={(e)=>this.reset_Password(e)}>
              <IntlMessages id="appModule.resetPassword"/>
            </Button>
            <Link to="/signin" style={{marginLeft: "10px"}}>Back to login</Link>
          </form>
        </div>
        </div>
      }
      </div>
       {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        
        {forgot.message !='success' ? showMessage && NotificationManager.error(alertMessage) : ''}
        {errorMessage ? errorMessage && NotificationManager.error(errorMessage) :succesMessage && NotificationManager.success(succesMessage) }
        <NotificationContainer/>
    </div>
  );
 };
};


const mapStateToProps = ({auth}) => {
  const {loader, alertMessage,alertSuccessMessage, showMessage, authUser,forgot} = auth;
  return {loader, alertMessage,alertSuccessMessage, showMessage, authUser,forgot}
};

export default connect(mapStateToProps, {
  forgot_Password,
  hideMessage,
  showAuthLoader,
})(ForgotPassword);

