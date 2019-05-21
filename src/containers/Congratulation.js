import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

function getSteps() {
  return ['', 'Create an ad group', 'Create an ad'];
}

 



class HorizontalLinearStepper extends React.Component {

  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  isStepOptional = step => {
    return step === 1;
  };
  handleNext = () => {
    const {activeStep} = this.state;
    let {skipped} = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };
  handleBack = () => {
    const {activeStep} = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };
  handleSkip = () => {
    const {activeStep} = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    const skipped = new Set(this.state.skipped.values());
    skipped.add(activeStep);
    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped,
    });
  };
  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }
  getStepContent(step) {
      switch (step) {
        case 0:
          return this.Congratulation();
        case 1:
          return this.Youcanfindfriends() ;
        case 2:
          return this.Gettoknow();
        default:
          return 'Unknown step';
      }
}

Congratulation(){
      return <div>
       <div className="row">
                <div className="col-md-12">
                  <div className="Congratulation_content_">
                  <center>
                     <img className="size-90" alt="..." src={require('../assets/icons/clap.png')} className="user-avatar "/> 
                     </center>
                    <h2 style={{textAlign:"center"}}>Congratulation</h2>
                    <p style={{textAlign:"center"}}>You have Completed the Registration</p>
                  </div>
                    
                </div>
           
      </div> 
      </div> 
}

Youcanfindfriends(){
      return <div>
       <div className="row">
                <div className="col-md-12">
                  <div className="Congratulation_content_" style={{textAlign:"center"}}>
                  <center>
                    <img className="size-90" alt="..." src={require('../assets/icons/support.png')} className="user-avatar "/> 
                     </center>
                    <p style={{textAlign:"center"}}>You can find friends or spouses according to your criteria. Determine yourself the criteria for a man or woman you like, who is pleasant and sincere faithfully loving you for who you are.</p>
                  </div>
                    
                </div>
           
      </div> 
      </div> 
}
Gettoknow(){
      return <div>
       <div className="row">
                <div className="col-md-12">
                  <div className="Congratulation_content_">
                  <center>
                    <img className="size-90" alt="..." src={require('../assets/icons/magnifier-tool.png')} className="user-avatar "/>
                    </center>
                    <p style={{textAlign:"center"}}>Get to know your friends or potential life partners more closely with the messaging feature. Privacy is maintained.</p>
                  </div>
                    
                </div>
           
      </div> 
      </div> 
}

  render() {
    const steps = getSteps();
    const {activeStep} = this.state;

    return (
      <div className="w-100">
        {/*<Stepper activeStep={activeStep} className="horizontal-stepper-linear">
                  {steps.map((label, index) => {
                    const props = {};
                    const labelProps = {};
                    if (this.isStepOptional(index)) {
                      labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (this.isStepSkipped(index)) {
                      props.completed = false;
                    }
                    return (
                      <Step key={label} className={`horizontal-stepper ${index === activeStep ? 'active' : ''}`} {...props}>
                        <StepLabel className="stepperlabel" {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>*/}
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className="my-2">
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className="jr-btn">
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <div className="my-2">{this.getStepContent(activeStep)}</div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className="jr-btn"
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className="jr-btn"
                  >
                    Skip
                  </Button>
                )}
                 {activeStep === steps.length - 1 ? 
                  <Link to="/app/home" style={{color:"#fff",backgroundColor:"#3f51b5"}} variant="contained" color="primary" onClick={this.handleNext} className="jr-btn" >Next</Link>
                 :
                <Button variant="contained" color="primary" onClick={this.handleNext} className="jr-btn">
                  Next
                </Button>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HorizontalLinearStepper;