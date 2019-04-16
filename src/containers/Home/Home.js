import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import IntlMessages from '../../util/IntlMessages';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import {Card, CardTitle} from "reactstrap";
import config from "../../config.json";
import axios from "axios";
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {
getuserprofilebyid
} from '../../actions/Profile';

class home extends React.Component {
 constructor() {
    super();
     this.state = {
      users: '',
     
    };
  }
 

  componentDidMount() {
    var user_id = localStorage.getItem('user_id');
    //this.props.getuserprofilebyid({ user_id})
     axios.get(`${config.ApiUrl}users/GetallUser`)
          .then(res => {
            this.setState({users:res.data.data})

            
          });
  }



  render() {
  
    const {get_user_by_id } = this.props;
    const {users } = this.state;
    console.log(users,'users')
    const userImageList = [
          {
            id: 1,
            image: require('../../assets/images/userAvatar/avator5.jpg'),
            name: 'Chelsea Johns',
            rating: '5.0',
            deals: '27 Deals'
          },
          {
            id: 2,
            image: require('../../assets/images/userAvatar/avator2.jpg'),
            name: 'Ken Ramirez',
            rating: '4.5',
            deals: '21 Deals'
          },
          {
            id: 3,
            image: require('../../assets/images/userAvatar/avator4.jpg'),
            name: 'Ken Ramirez',
            rating: '5.0',
            deals: '27 Deals'
          },
          {
            id: 4,
            image: require('../../assets/images/userAvatar/avator10.jpg'),
            name: 'Chelsea Johns',
            rating: '5.0',
            deals: '27 Deals'
          },
          {
            id: 5,
            image: require('../../assets/images/userAvatar/guptil-2.jpg'),
            name: 'Chelsea Johns',
            rating: '5.0',
            deals: '27 Deals'
          },
        ]

    
 
  return (
           <div className="app-wrapper">
              <div className="dashboard animated slideInUpTiny animation-duration-3">
                 <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
                  <h2 className="title mb-3 mb-sm-0">Home</h2>
                  <Breadcrumb className="mb-0" tag="nav">
                    <BreadcrumbItem  href={null}>App</BreadcrumbItem>
                    <BreadcrumbItem  href={null}>Home</BreadcrumbItem>
                  </Breadcrumb>
                </div>

                 <div className="jr-card ">
                   <div className="jr-card-body d-flex justify-content-center ">
                   <div className="container">
                       <div className="row">
                         <div className="col-md-4"></div>
                           <div className="col-md-4"></div>
                                  <div className="col-md-4">
                                      <div className="form-group">
                                        <TextField
                                          id="userName"
                                          label="Search"
                                          margin="normal"
                                          value={this.state.serachValue}
                                          onChange={(event) => this.setState({serachValue: event.target.value})}
                                          fullWidth
                                        />
                                      </div>
                                  </div>
                            </div>
                        <div className="row">
                           <div className="col-md-12">
                              <ul className="jr-agents-list">
                                  {users  && users.length > 1 && users.map((user, index) =>
                                    <li key={index}>
                                      <div className="jr-profileon">
                                        <div className="jr-profileon-thumb" style={{maxHeight: "199px"}}><img alt="..." src={user.user.image}/></div>
                                        <div className="jr-profileon-content">
                                          <h5 className="mb-0 text-truncate">{user.user_id ? user.user.user_id.username : ''}</h5>
                                          <p className="mb-0 jr-fs-sm text-truncate"><i className={`zmdi zmdi-star text-orange`}/> {user.rating}
                                            <span>|</span> {user.user_id ? user.user.user_id.status :''}
                                          </p>
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

                  
                 </div>  
              </div>   
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
})(home);

