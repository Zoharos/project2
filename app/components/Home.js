import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import {withStyles} from '@material-ui/core/styles';
import injectSheet from 'react-jss';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import {NavBar, LoginDialog, HomePageCard,styles} from './MaterialComponents';


class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        openLogin: false,
        openRegistry: false,
        hoverState: false,
        registrationFields: {
            regFirstName: '',
            regLastName: '',
            regEmail1: '',
            regEmail2: '',
            regPassword1: '',
            regPassword2: ''
        },
        loginFields: {
            email: '',
            password:''
        }
      };
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleSwitchDialog = this.handleSwitchDialog.bind(this);
      this.handleClickClose = this.handleClickClose.bind(this);
      this.handleTextFields = this.handleTextFields.bind(this);
      this.print = this.print.bind(this);
      this.enterHoverState = this.enterHoverState.bind(this);
      this.leaveHoverState = this.leaveHoverState.bind(this);
      this.login = this.login.bind(this);
      this.register = this.register.bind(this);
    }
    register() {
        if((this.state.registrationFields.regEmail1 == this.state.registrationFields.regEmail2) || (this.state.registrationFields.regPassword1 == this.state.registrationFields.regPassword2))
        {
            axios.post('/api/login',{
                    /* firstName: this.state.registrationFields.regFirstName,
                    lastName: this.state.registrationFields.regLastName,
                    email1: this.state.registrationFields.regEmail1,
                    email2: this.state.registrationFields.regEmail2,
                    password1: this.state.registrationFields.regPassword1,
                    password2: this.state.registrationFields.regPassword2, */
                    token: JSON.parse(localStorage.getItem('token'))
                })
                .then(function (response) {
                    console.log(response);
            }) 
        }
    }
    login() {
        axios.get('/api/login',{
            headers: {
                email: this.state.loginFields.email,
                password: this.state.loginFields.password
            }
        }).then(function (response){
            console.log(response.data);
            localStorage.setItem('token',JSON.stringify(response.data.token));
            localStorage.setItem('email',JSON.stringify(response.data.email));
        }) 
    }
    enterHoverState()
    {
        this.setState({
        hoverState: true
        })
    }
    leaveHoverState()
    {
        this.setState({
        hoverState: false
        })
    }
    handleTextFields(textFieldObj) {
        if(textFieldObj.target.id === 'email' || textFieldObj.target.id === 'password') {
            const loginFields = this.state.loginFields;
            loginFields[textFieldObj.target.id] = textFieldObj.target.value;
            this.setState({loginFields: loginFields})
        }
        else {
            const registrationFields = this.state.registrationFields;
            registrationFields[textFieldObj.target.id] = textFieldObj.target.value;
            this.setState({registrationFields: registrationFields})
        }
    }
    handleClickOpen() {
      this.setState({
          openLogin: !this.state.openLogin,
          hoverState: !this.state.hoverState
        })
    }
    handleSwitchDialog() {
        this.setState({
            openRegistry: !this.state.openRegistry,
            openLogin: !this.state.openLogin
        })
    }    
    handleClickClose() {
        this.setState({
            openRegistry: false,
            openLogin: false
        })
    }
    Transition(props) {
      return <Slide direction="up" {...props}/>;
    }
    print() {
        console.log(this.state);
      }
    injectStyleFunc(comp){
        const StyledComp = injectSheet(styles()[0])(comp)
        return <StyledComp />;
    }
    render()
    {
      const { classes } = this.props;
      const buttonLoggedOutArray = ["מתווכים","השכרה","מכירה"];
      const buttonLoggedOutArrayHrefs = [this.handleClickOpen,"./estate","./"];
      const buttonsArray =  buttonLoggedOutArray.map((buttonString, index) => (
        typeof buttonLoggedOutArrayHrefs[index] === 'function' ? 
        <Button size="large" color="inherit" key={buttonString} onClick={buttonLoggedOutArrayHrefs[index]}>{buttonString}</Button> :
        <NavLink className="navLinkBtn" key={buttonString} to={buttonLoggedOutArrayHrefs[index]}><Button size="large" color="inherit" >{buttonString}</Button></NavLink>
      ))
      return (
        <div className="bg">
            <NavBar navButtons={buttonsArray} enterHoverState={this.enterHoverState} leaveHoverState={this.leaveHoverState} hoverState={this.state.hoverState} />
            <LoginDialog register={this.register} login={this.login} handleTextFields={this.handleTextFields} close={this.handleClickClose} openReg={this.state.openRegistry} onClickSwitch={this.handleSwitchDialog} open={this.state.openLogin} onClick={this.handleClickOpen} Transition={this.Transition}/>
            <div className={classes.right + ' ' + classes.homeCard}>
                <HomePageCard cardImage="../statics/rent-sign.jpg" leftBtnTitle="היכנס" rightBtnTitle="קרא עוד" title="השכרה" content="לוח דירות להשכרה ממתווכים הראשון מסוגו בארץ"/>
            </div>
            <div className={classes.homeCard}>
                <HomePageCard cardImage="../statics/sale-sign.jpg" leftBtnTitle="היכנס" rightBtnTitle="קרא עוד" title="מכירה" content="לוח דירות למכירה ממתווכים הראשון מסוגו בארץ"/>
            </div>
        </div>
      )
    }
  }

export default injectSheet(styles()[0])(HomePage);
