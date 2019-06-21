import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import IntlMessages from '../util/IntlMessages';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignUp,
  userTwitterSignIn
} from '../actions/Auth';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      status:'',
      email: '',
      mobileNo:'',
      password: '',
         age: '',
         
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

   handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  render() {
    const {
      username,
      email,
      status,
      password,
      mobileNo
    } = this.state;
    const {showMessage, loader, alertMessage} = this.props;



    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="Jambo">
              <img src={require("../assets/images/logo.png")} alt="jambo" title="jambo"/>
              <h1 style={{color:"#fff"}}>Heartenly</h1>
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header">
              <h1>Sign Up</h1>
            </div>

            <div className="mb-4">
              <h2>Please create a profile on Heartenly now.Privacy is Maintained,Safe and comfortable.</h2>
            </div>

             
         

            <div className="app-login-form">
              <form method="post" action="/">
                <TextField
                  type="text"
                  label="Your Username"
                  onChange={(event) => this.setState({username: event.target.value})}
                  fullWidth
                  defaultValue={username}
                  margin="normal"
                  className="mt-0 mb-2"
                />
          
                   
                {/* <FormControl className="w-100 mb-2">
                                   <InputLabel htmlFor="age-simple">Status</InputLabel>
                                   <Select
                                         value={this.state.status}
                                         onChange={(event) => this.setState({status: event.target.value})}
                                         
                
                                      >
                                       
                                        <MenuItem value="Single">Single</MenuItem>
                                        <MenuItem value="In a relationship">In a relationship</MenuItem>
                                        <MenuItem value="Engaged">Engaged</MenuItem>
                                        <MenuItem value="Married">Married</MenuItem>
                                        <MenuItem value="Divorced">Divorced</MenuItem>
                                        <MenuItem value="Widowed">Widowed</MenuItem>
                                      </Select>
                              </FormControl>*/}
            

                <TextField
                  type="email"
                  onChange={(event) => this.setState({email: event.target.value})}
                  label="Your Email"
                  fullWidth
                  defaultValue={email}
                  margin="normal"
                  className="mt-0 mb-2"
                />
                 
               
                <PhoneInput
                  placeholder="Your Mobile No"
                  value={ mobileNo}
                  margin="normal"
                  fullWidth
                  country="US"
                    onChange={ mobileNo => this.setState({ mobileNo }) } /> 

                <TextField
                  type="password"
                  onChange={(event) => this.setState({password: event.target.value})}
                  label="Your Password"
                  fullWidth
                  defaultValue={password}
                  margin="normal"
                  className="mt-0 mb-4"
                />

                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <Button variant="contained" onClick={() => {
                    this.props.showAuthLoader();
                    this.props.userSignUp({username,status,email,mobileNo, password});
                  }} color="primary">
                    <IntlMessages
                      id="appModule.signup"/>
                  </Button>
                  <Link to="/signin">
                    <IntlMessages id="signUp.alreadyMember"/>
                  </Link>
                </div>
                {/*<div className="app-social-block my-1 my-sm-3">
                                  <IntlMessages
                                    id="signIn.connectWith"/>
                                  <ul className="social-link">
                                    <li>
                                      <IconButton className="icon"
                                                  onClick={() => {
                                                    this.props.showAuthLoader();
                                                    this.props.userFacebookSignIn();
                                                  }}>
                                        <i className="zmdi zmdi-facebook"/>
                                      </IconButton>
                                    </li>
                
                                    <li>
                                      <IconButton className="icon"
                                                  onClick={() => {
                                                    this.props.showAuthLoader();
                                                    this.props.userTwitterSignIn();
                                                  }}>
                                        <i className="zmdi zmdi-twitter"/>
                                      </IconButton>
                                    </li>
                
                                    <li>
                                      <IconButton className="icon"
                                                  onClick={() => {
                                                    this.props.showAuthLoader();
                                                    this.props.userGoogleSignIn();
                
                                                  }}>
                                        <i className="zmdi zmdi-google-plus"/>
                                      </IconButton>
                                    </li>
                
                                    <li>
                                      <IconButton className="icon"
                                                  onClick={() => {
                                                    this.props.showAuthLoader();
                                                    this.props.userGithubSignIn();
                                                  }}>
                                        <i className="zmdi zmdi-github"/>
                                      </IconButton>
                                    </li>
                                  </ul>
                                </div>*/}

              </form>
            </div>
          </div>

        </div>

        {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  userSignUp,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn
})(SignUp);
