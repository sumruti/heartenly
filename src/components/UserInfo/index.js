import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import {connect} from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {userSignOut} from '../../actions/Auth';
import {getuserprofilebyid} from '../../actions/Profile';
import IntlMessages from '../../util/IntlMessages';
import {Link} from 'react-router-dom'
class UserInfo extends React.Component {

  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
     localStorage.removeItem("redirect_");
    this.setState({open: false});
  };
  componentDidMount() {
    var user_id = localStorage.getItem('user_id');
    this.props.getuserprofilebyid({ user_id})
  }

  render() {
    const {get_user_by_id } = this.props;
    return (
      <div className="user-profile d-flex flex-row align-items-center">
     

          { this.props.get_user_by_id.primaryimg != ''  ?
                      <Avatar className="size-90" alt="..." src={require(this.props.get_user_by_id.primaryimg)} className="user-avatar "/> : <Avatar className="size-90" alt="..." src={require('../../assets/images/user_img.png')} className="user-avatar "/> 
          }
        
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}>{get_user_by_id.data != undefined && get_user_by_id.data !='' && get_user_by_id.data.length !=0 ? get_user_by_id.data[0].username :''}<i
            className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
          </h4>
        </div>
        <Menu className="user-info"
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              PaperProps={{
                style: {
                  minWidth: 120,
                  paddingTop: 0,
                  paddingBottom: 0
                }
              }}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
            <Link to="/app/Profile">
            <IntlMessages id="popup.profile"/></Link>
          </MenuItem>
          
          <MenuItem onClick={() => {
            this.handleRequestClose();
            this.props.userSignOut()
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>

            <IntlMessages id="popup.logout"/>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({settings,Profile}) => {
  const {locale} = settings;
  const {get_user_by_id} = Profile;
  return {locale,get_user_by_id}
};
export default connect(mapStateToProps, {userSignOut,getuserprofilebyid})(UserInfo);


