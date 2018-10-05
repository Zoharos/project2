import { renderToString } from 'react-dom/server'
import React from 'react';
import { matchPath, StaticRouter } from 'react-router-dom';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';

import routes from './routes';
import renderFullPage from './renderFullPage';
import getPokemon from '../services/getPokemon';
import App from '../components/App';

export default function router(req, res) {

    const match = routes.reduce((acc, route) => matchPath(req.url, { path: route, exact: true }) || acc, null);

    if (!match) {
        res.status(404).send('page not found');
        return;
    }

    return getPokemon.withAbility('telepathy')
        .then(resp => {
            
            const sheetsRegistry = new SheetsRegistry();

            // Create a sheetsManager instance.
            const sheetsManager = new Map();
          
            // Create a theme instance.
            const theme = createMuiTheme({
                palette: {
                    primary: {
                      main: '#2196f3',
                   },
                },
            });
          
            // Create a new class name generator.
            const generateClassName = createGenerateClassName();

            const context = {}
     
        // Grab the CSS from our sheetsRegistry.
            const html = renderToString( 
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                    <StaticRouter context={context} location={req.url} >
                        <App />
                    </StaticRouter>
                </MuiThemeProvider>
            </JssProvider> 
            )
            const css = sheetsRegistry.toString();
            res.status(200).send(renderFullPage(html, css));
        })
        .catch(err => res.status(404).send(`${err}`));
};
