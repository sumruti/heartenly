import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import IntlMessages from '../util/IntlMessages';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    /*if (this.props.authUser !== null) {
      this.props.history.push('/');
    }*/
  }

  render() {
    const {email,} = this.state;
    console.log(NotificationManager.error);
    const {showMessage, loader, alertMessage,alertSuccessMessage,forgot} = this.props;

    console.log(forgot,'--------------');
 
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
              onChange={(event) => this.setState({email: event.target.value})}
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
      </div>
       {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        
        {forgot=='' ? showMessage && NotificationManager.error(alertMessage) : showMessage && NotificationManager.success(alertMessage)}
       
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

