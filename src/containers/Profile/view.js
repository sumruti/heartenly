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
import {
getuserprofilebyid
} from '../../actions/Profile';

class ProfileView extends React.Component {

 

  componentDidMount() {
    var user_id = localStorage.getItem('user_id');
    this.props.getuserprofilebyid({ user_id})
  }



  render() {
  
    const {get_user_by_id } = this.props;

    console.log(get_user_by_id);
    const Widget = ({children, styleName, title}) => {
        return (
          <Card className={`jr-card jr-card-widget ${styleName}`}>
            {title ? <CardTitle>{title}</CardTitle> : null}
            {children}
          </Card>
        )
    };

 const aboutList = [
  {
    id: 1,
    title: 'Status',
    icon: 'fa-heart-o',
    userList: '',
    desc: [get_user_by_id!='' ?  get_user_by_id.data[0].status :'']
  }
];

const AboutItem = ({data}) => {
  const {title, icon, desc, userList} = data;
  return (
    <Auxiliary>
      <div className="media flex-nowrap mt-3 mt-lg-4 mb-2">
        <div className="mr-3">
          <i className={`zmdi zmdi-label-heart jr-fs-xlxl text-orange`}/>
        </div>
        <div className="media-body">
          <h6 className="mb-1 text-grey">{title}</h6>
          {userList === '' ? null : userList}
          {desc === '' ? null : <p className="mb-0">{desc}</p>}
        </div>
      </div>
    </Auxiliary>
  );
};

 const contactList = [
  {
    id: 1,
    title: 'Email',
    icon: 'email',
    desc: [<span className="jr-link" key={1}>{get_user_by_id!='' ?  get_user_by_id.data[0].email :''}</span>]
  }, {
    id: 2,
    title: 'Phone',
    icon: 'phone',
    desc: [<span className="jr-link" key={1}>{get_user_by_id!='' ?  get_user_by_id.data[0].mobileNumber :''}</span>]
  },
   
];

 
  return (
  <div className="app-wrapper">
    <Auxiliary>
      <div className="jr-profile-banner" style={{backgroundColor:"#3f51b5"}}>
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
                 { this.props.get_user_by_id.primaryimg != '' && this.props.get_user_by_id.primaryimg != undefined  ?
                      <Avatar className="size-90" alt="..." src={this.props.get_user_by_id.primaryimg} className="user-avatar "/> : <Avatar className="size-90" alt="..." src={require('../../assets/images/user_img.png')} className="user-avatar "/> 
                 }

                  
              </div>
              <div className="jr-profile-banner-avatar-info">
                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">{get_user_by_id!='' ?  get_user_by_id.data[0].username :''}</h2>
                {/*<p className="mb-0 jr-fs-lg">Florida, USA</p>*/}
              </div>
            </div>
           {/* <div className="jr-profile-banner-top-right">
                         <ul className="jr-follower-list">
                           <li>
                             <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">2k+</span>
                             <span className="jr-fs-sm">Followers</span></li>
                           <li>
                             <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">847</span>
                             <span className="jr-fs-sm">Following</span></li>
                           <li>
                             <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">327</span>
                             <span className="jr-fs-sm">Friends</span>
                           </li>
                         </ul>
                       </div>*/}
          </div>
          {/*<div className="jr-profile-banner-bottom">
                      <div className="jr-tab-list">
                        <ul className="jr-navbar-nav">
                          <li>
                            <span className="jr-link">Timeline</span>
                          </li>
                          <li>
                            <span className="jr-link">About</span>
                          </li>
                          <li>
                            <span className="jr-link">Photos</span>
                          </li>
                          <li>
                            <span className="jr-link">Friends <span className="jr-fs-xs">287</span></span>
                          </li>
                          <li>
                            <span className="jr-link">More</span>
                          </li>
                        </ul>
                      </div>
                      <span className="jr-link jr-profile-setting">
                        <i className="zmdi zmdi-settings mr-2"/>
                        <span className="d-inline-flex align-middle ml-1 jr-ml-sm-0">Setting</span>
                      </span>
                    </div>*/}
        </div>
      </div>
      <div className="jr-profile-content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-7 col-12">
               <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
                <div className="card-header">
                  <h4 className="card-title mb-0">About</h4>
                </div>
                <div className="jr-tabs-content jr-task-list">
                  <div className="row">
                    {aboutList.map((about, index) => <div
                      className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)}
                    
                  </div>
                </div>
              </Widget>
             
            </div>
            <div className="col-xl-4 col-lg-4 col-md-5 col-12">
              <Widget title="Contact" styleName="jr-card-profile-sm">
                {contactList.map((data, index) =>
                  <div key={index} className="media align-items-center flex-nowrap jr-pro-contact-list">
                    <div className="mr-3">
                      <i className={`zmdi zmdi-${data.icon} jr-fs-xxl text-grey`}/>
                    </div>
                    <div className="media-body">
                      <span className="mb-0 text-grey jr-fs-sm">{data.title}</span>
                      <p className="mb-0">{data.desc}</p>
                    </div>
                  </div>
                )}
              </Widget>
            </div>
          </div>
        </div>
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

