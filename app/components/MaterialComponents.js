import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter
} from "react-router-dom";
import injectSheet from 'react-jss';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function styles()  {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
    },
  });
    const styles = theme => ({
      menuButton: {
        marginLeft: -18,
        marginRight: 10,
      },
      homeCard: {
        margin: '10%',
        width: 400,
      },
      right: {
        float: 'right',
      },
      appBar: {
        background: 'transparent',
        boxShadow: 'none',
        transition: 'all 0.5s ease',
        '&:hover': {
          background: 'floralwhite',
          color: 'black',
        }
      },
      navLinkBtn: {
        textDecoration: 'none',
        color: 'inherit',
      },
      flex: {
        flex: 1
      },
      dialogContent: {
        marginTop: 500
      },
      card: {
        maxWidth: 345,
      },
      media: {
        height: 140,
        backgroundSize: '100% 100%',
      },
      fullWidth: {
        width: '100%'
      },
    });
    return [styles,theme];
}

/* const mButton = ({ classes, children }) => (
  <MuiThemeProvider theme={theme}>
  <Button variant='contained' color='primary' className={classes.myButton}>
    <span className={classes.myLabel}>
      {children}
    </span>
  </Button>
  </MuiThemeProvider>
) */


  
function LoginDialogBar(props)
{
   const {classes} = props;
   return (
      <div>
        <Dialog dir="rtl" open={props.open} onClose={props.close} TransitionComponent={props.Transition} aria-labelledby="form-dialog-title">
          <AppBar className={classes.appBar}>
            <Toolbar dir="rtl">
              <IconButton color="inherit" onClick={props.close} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="headline" color="inherit" className={classes.flex}>התחברות</Typography>
            </Toolbar>
          </AppBar>
          <div className="loginDiv">
            <DialogContent>
              <DialogContentText className="dialogContent" color="textPrimary">משתמש חדש? <Button color="primary" onClick={props.onClickSwitch}>הירשם</Button></DialogContentText>
              <form onChange={props.handleTextFields}>
              <TextField dir="ltr" fullWidth={true} autoFocus margin="dense" id="email" label="דואר אלקטרוני" type="email"/>
              <TextField dir="ltr" fullWidth={true} margin="dense" id="password" label="סיסמא" type="password"/>           
              </form>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' color="primary" onClick={props.login}>התחבר</Button>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog dir="rtl" open={props.openReg} onClose={props.close} TransitionComponent={props.Transition} aria-labelledby="form-dialog-title">
          <AppBar className={classes.appBar}>
            <Toolbar dir="rtl">
              <IconButton color="inherit" onClick={props.close} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="headline" color="inherit" className={classes.flex}>הרשמה</Typography>
            </Toolbar>
          </AppBar>
          <div className="loginDiv">
            <DialogContent>
              <DialogContentText color="textPrimary">משתמש קיים? <Button color="primary" onClick={props.onClickSwitch}>התחבר</Button></DialogContentText>
              <form onChange={props.handleTextFields}>
              <TextField fullWidth={true} autoFocus margin="dense" id="regFirstName" label="שם פרטי" type="text"/>
              <TextField fullWidth={true}  margin="dense" id="regLastName" label="שם משפחה" type="text"/>
              <TextField dir="ltr" fullWidth={true}  margin="dense" id="regEmail1" label="דואר אלקטרוני" type="email"/>
              <TextField dir="ltr" fullWidth={true}  margin="dense" id="regEmail2" label="חזור דואר אלקטרוני" type="email"/>
              <TextField dir="ltr" fullWidth={true} margin="dense" id="regPassword1" label="סיסמא" type="password"/>
              <TextField dir="ltr" fullWidth={true} margin="dense" id="regPassword2" label="חזור סיסמא" type="password"/>
              </form>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' color="primary" onClick={props.register}>הירשם</Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    )
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: styles()[0]
    };
  }
  render()
  {
    const MNavBar = ({classes, children}) => (
      <div className="navBar" onMouseEnter={this.props.enterHoverState} onMouseLeave={this.props.leaveHoverState}>
          <AppBar position="static" className={classes.appBar} dir="rtl">
            <Toolbar variant="dense">
              <NavLink to="/">
              <div className="navBarLogoImg"></div>
              </NavLink>
              {children}
            </Toolbar>
          </AppBar>
        </div>
    )

    const StyledNavBar = injectSheet(this.state.styles)(MNavBar);
    
      return (
      <StyledNavBar>
        {this.props.navButtons}
      </StyledNavBar>
    )
  }
}

class HomePageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: styles()[0]
    }
  }
  
  render() 
  {
    const cardHomePage = ({classes, children}) => (
      <Card dir="rtl" className={classes.card}>
        <CardActionArea className={classes.fullWidth}>
          <CardMedia
            className={classes.media}
            image={this.props.cardImage}
            title={this.props.cardImageTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.title}
            </Typography>
            <Typography component="p">
              {this.props.content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="outlined" size="small" color="primary">
            {this.props.rightBtnTitle}
          </Button>
          <Button size="small" color="primary">
          {this.props.leftBtnTitle}
          </Button>
        </CardActions>
      </Card>
    )
    const StyledCard = injectSheet(this.state.styles)(cardHomePage);

    return (
      <StyledCard />
    )

  }
}

function authenticate() {
 return axios.post('/api/login',{

  }).then(function (response){
      const status = response.status == 200 ? true : false;
      return status;
  }).catch(function (error){
    alert(error.response.data);
    return false;
  })
}

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb,100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb,100);
  }
}

const PrivateRoute = ({component: Component}) => (
  authenticate().then(function(value){
   value ? 
  <Route render={props => (<Component {...props} />)}/> :
  <Route render={(<Redirect to={{pathname: "/"}}/>)}/> 
  }) 
);

const LoginDialog = withStyles(styles)(LoginDialogBar);
export {NavBar,LoginDialog,styles,PrivateRoute,HomePageCard,fakeAuth};