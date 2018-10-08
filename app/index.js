import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import {BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import staticImports from './imports.js';

class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
  
    render() {
      return <App />
    }
  }
  const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#2196f3',
       },
    },
});

    const generateClassName = createGenerateClassName();

ReactDOM.render((
    <Router>
        <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
                <Main />
            </MuiThemeProvider>
        </JssProvider>
    </Router>), 
    document.getElementById('root')
);
