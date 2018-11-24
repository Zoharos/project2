import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';
import RenderHomePage from './renderHomePage';
const constants = require('./constants');
import { auth, Elink } from '../MaterialComponents';

class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        openLogin: false,
        openRegistry: false,
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
                    //token: JSON.parse(localStorage.getItem('token'))
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
            auth.authenticate();
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        }).catch(function (err){
            console.log(err);
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
      const buttonsArray =  constants.navButtonsConfigArray.map((button) => (
        <Elink key={button.name} buttonString={button.name} to={button.onClick}></Elink>
      ))
      return (
        <RenderHomePage buttonsArray={buttonsArray} 
        register={this.register} 
        login={this.login}
        handleTextFields={this.handleTextFields} 
        close={this.handleClickClose} 
        openReg={this.state.openRegistry} 
        handleSwitchDialog={this.handleSwitchDialog} 
        openLogin={this.state.openLogin} 
        handleClickOpen={this.handleClickOpen} 
        Transition={this.Transition}
        />
      )
    }
  }

export default HomePage;
