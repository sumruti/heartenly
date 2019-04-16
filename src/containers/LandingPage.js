import React from 'react';
import {connect} from 'react-redux';

import { Link } from "react-router-dom";
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import { Language } from "@material-ui/icons";
import { IconButton, AppBar, Menu, MenuItem } from "@material-ui/core";
//import Swiper from 'react-id-swiper';
import Slider from "react-slick";
class landingpage extends React.Component {

 

  componentDidUpdate() {
    //var user_id = localStorage.getItem('user_id');
    //this.props.getuserprofilebyid({ user_id})
  }



  render() {
     
 
const options = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  marginRight: 10,
  slidesToScroll: 3,
};
 
  return (
           <div className="app-header" style={{overflow:'auto', width: '100%'}}>
              <AppBar position="static" className="mui-fixed app-main-header">
                <Toolbar className="app-toolbar">
        
                 <div className="col-6 col-sm-6 col-md-6 col-lg-6 px-6">
                    <Link className="text-white" to="/" title="Heartenly">
                      <img src={require("../assets/images/logo.png")} alt="Heartenly" title="Heartenly" style={{ width: '2em' }}/>
                      <span className="d-none d-sm-inline ml-2">Heartenly</span>
                    </Link>
                 </div>   
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 px-6 pull-right">
                    <Button color="inherit" style={{float: 'right'}}>
                      <Link className="text-white nav-link" to="/Signup">
                       Signup
                      </Link>
                    </Button>
                     <Button color="inherit" className="pull-right" style={{float: 'right'}}>
                      <Link className="text-white nav-link" to="/signin">
                        SignIn
                      </Link>
                    </Button>
                </div>  
           
                </Toolbar>
              </AppBar>


              <div className="Signup-whiteBox-11 row mb-4">
                <div className="col-12 col-lg-5 d-flex justify-content-center py-3 px-3"><iframe src="https://www.youtube.com/embed/aapQqxUtvFo" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{width: '100%', maxWidth: '400px', height: '280px'}} /></div>
                <div className="col-12 col-lg-7 px-3 py-3">
                 
                  <h2 className="text-primary">Why Join Heartenly?</h2>
                  <div className="mb-4">
                    <p>Finding a life partner is certainly not an easy thing. Happy families are determined starting from finding the right life partner. Many things need to be prepared and many things also become considerations for someone in determining their life partner. These two things are fundamental in finding a life partner that looks easy but it is difficult for some people to find a life partner who fulfills this. Maybe you are one of them.</p>
                    <p>Heartenly can be a solution for you to find a life partner. We are a medium for those of you who are ready to have a family. We can help you find a life partner that suits you. Many people have joined and are looking for their life partners. You can be the person your life partner is looking for.</p>
                    <p>Heartenly is connected with thousands of users from a number of countries including Indonesia, Malaysia, Singapore and Brunei. We can help you find your life partner anytime, anywhere, and according to your wishes. Come join Heartenly and start looking for your life partner here!</p>
                  </div>
                  
                  <h2 className="text-primary">Benefits for Heartenly Members</h2>
                  <ol>
                    <li><strong>As per your criteria.</strong> Determine yourself the criteria for a man or woman you like, who is pleasant and sincere faithfully loving you for who you are.</li>
                    <li><strong>Relaxing.</strong> Heartenly always finds the right partner for you, even if you are relaxed and don't open Heartenly.</li>
                    <li><strong>Privacy is maintained.</strong> Personal data such as real names or phone numbers are hidden, before you get to know your candidate.</li>
                  </ol>
                </div>
              </div>
               <div className="Signup-whiteBox-11">
                                    <h2 className="text-primary mt-4 mb-4 text-center">Success Stories</h2>

               <Slider {...options}>
                   
                  <div className="testimonial text-center">
                       <img  src={require("../assets/images/heartenly-success-story-afifah-arip.jpg")} style={{maxWidth: '20em'}} />
                    <span className="testimonial__quote">Afifah ❤ Arip</span>
                    <p >Alhamdulillah. We met in Heartenly last May 2018. Now we are officially husband and wife November 18 yesterday.</p>
                  </div>
                  <div className="testimonial text-center">
                       <img  src={require("../assets/images/heartenly-success-story-gyen-rio-2.jpg")} style={{maxWidth: '20em'}} />
                    <span className="testimonial__quote">Gyen ❤ Rio</span>
                    <p >You're the man I just met a few months from Heartenly, and you come to my parents and seriously want to propose to me.</p>
                 </div>
                  <div className="testimonial text-center">
                    <img  src={require("../assets/images/heartenly-success-story-gyen-rio-1.jpg")} style={{maxWidth: '20em'}} />
                    <span className="testimonial__quote">Gyen ❤ Rio</span>
                    <p >Thanks for Heartenly. Pleasantly surprised to meet someone in my area. Instantly click then deal meeting 🤣👌</p>
                  </div>
                  <div className="testimonial text-center">
                       <img  src={require("../assets/images/heartenly-success-story-afifah-arip.jpg")} style={{maxWidth: '20em'}} />
                    <span className="testimonial__quote">Afifah ❤ Arip</span>
                    <p >Alhamdulillah. We met in Heartenly last May 2018. Now we are officially husband and wife November 18 yesterday.</p>
                  </div>
                  <div className="testimonial text-center">
                       <img  src={require("../assets/images/heartenly-success-story-gyen-rio-2.jpg")} style={{maxWidth: '20em'}} />
                    <span className="testimonial__quote">Gyen ❤ Rio</span>
                    <p >You're the man I just met a few months from Heartenly, and you come to my parents and seriously want to propose to me.</p>
                 </div>
                  <div className="testimonial text-center">
                    <img  src={require("../assets/images/heartenly-success-story-gyen-rio-1.jpg")} style={{maxWidth: '20em'}} />
                    <span className="testimonial__quote">Gyen ❤ Rio</span>
                    <p >Thanks for Heartenly. Pleasantly surprised to meet someone in my area. Instantly click then deal meeting 🤣👌</p>
                  </div>
            </Slider>
            </div>

               





  
 








                <section id="contact" className="footer_con">
        <div className="container">
          <footer className="page-footer font-small blue pt-4">
            {/* Footer Links */}
            <div className="container-fluid text-center text-md-left">
              {/* Grid row */}
              <div className="row">
                {/* Grid column */}
                <div className="col-md-4 mt-md-0 mt-4">
                  {/* Content */}
                  <h5 className="text-uppercase">Footer Content</h5>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="https://www.facebook.com/HeartenlyID/" target="_blank">
                        <i className="fab fa-facebook-square" style={{fontSize: '24px'}} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://www.facebook.com/HeartenlyID/" target="_blank">
                        <i className="fab fa-twitter-square" style={{fontSize: '24px'}} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://line.me/R/ti/p/%40lse2417c" target="_blank">
                        <i className="fab fa-line" style={{fontSize:'24px'}}></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://www.pinterest.com/heartenly/" target="_blank">
                        <i className="fab fa-pinterest" style={{fontSize:'24px'}}/>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://www.instagram.com/heartenlyid/" target="_blank">
                        <i className="fab fa-instagram" style={{fontSize: '24px'}} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://www.youtube.com/channel/UC0tYyuodAmxZ6bInsezNbLg/" target="_blank">
                        <i className="fab fa-youtube" style={{fontSize:'24px'}}/>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://hot.satukancinta.com/" target="_blank">
                        <i className="fas fa-blog" style={{fontSize:'24px'}}/>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 mb-md-0 mb-4">
                  {/* Links */}
                  <h5 className="text-uppercase">Policies</h5>
                  <ul className="list-unstyled social-buttons">
                    <li>
                      <a href={null}>Terms and conditions</a>
                    </li>
                    <li>
                      <a href={null}>Privacy policy</a>
                    </li>
                    <li>
                      <a href={null}>About Us</a>
                    </li>
                    <li>    
                      <a href={null}>Newsletter </a>
                    </li>
                   
                  
                  </ul>
                </div>
                <div className="col-md-4 mb-md-0 mb-4">
                  {/* Links */}
                  <h5 className="text-uppercase">Address</h5>
                  <ul className="list-unstyled social-buttons">
                    <li>
                      <a href="#!"><i className="fa fa-map-marker" aria-hidden="true" style={{marginRight: "10px"}}/>
                        USA office:Droneoptix Repair Unit 2116 Ridge Rd Norwalk Ohio 44857 USA</a>
                    </li>
                    <li>
                      <a href={null}><i className="fa fa-map-marker" aria-hidden="true" style={{marginRight: "10px"}}/>
                        UK office:Droneoptix Repair Unit 2116 Ridge Rd Norwalk Ohio 44857 USA</a>
                    </li>
                    <li>
                      <a href={null}><i className="fa fa-map-marker" aria-hidden="true" style={{marginRight: "10px"}}/>
                        Italy office:Droneoptix Repair Unit 2116 Ridge Rd Norwalk Ohio 44857 USA</a>
                    </li>
                  </ul>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </div>
            {/* Copyright */}
            {/* Copyright */}
          </footer>
        </div>
        <div className="footer-copyright text-center py-3">© 2019 Copyright:All right reserved
        </div>
      </section>


      
            </div>
      
  );
 };
};







export default landingpage;

