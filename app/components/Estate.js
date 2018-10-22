import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import {
  NavBar,
  LoginDialog, 
  styles,
  EstateNavBar,
  } from './MaterialComponents';

class Estate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render()
    {  
        return (
        <div>
            <EstateNavBar  />
        </div>
      )
    }
  }

export default injectSheet(styles()[0])(Estate);