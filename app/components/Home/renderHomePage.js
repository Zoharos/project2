import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from '../MaterialComponents';
import Button from '@material-ui/core/Button';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

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
          headline: {
              textAlign: 'center',
              paddingTop: '9%',
              color: 'white',
              fontWeight: 500
          },
          navHeadline: {
            textAlign: 'center',
            color: 'white',
            fontWeight: 500
          },
          rentSaleButtons: {
              marginLeft: 10,
              display: 'inline',
              borderLeft: '1px white solid',
              '& button': {
                marginLeft: 8
              }
          },
          buttons: {
              marginLeft: '39%',
              '& button': {
                marginLeft: 8
              }
          }
      });
      return [styles,theme];
  }

function renderHomePage(props) {
    const {classes} = props;
    return (
        <div className="bg">
            <NavBar navButtons={props.buttonsArray} enterHoverState={props.enterHoverState} leaveHoverState={props.leaveHoverState} hoverState={props.hoverState} />
            <h1 className={classes.headline}> נדל"ן הרשת החברתית הראשונה למתווכים Real </h1>
            <h2 dir="rtl" className={classes.navHeadline}>לקוחות? לחצו על דירות להשכרה או דירות למכירה,<br/>
                מתווכים? לחצו על מתווכים כדי להירשם או להתחבר.
            </h2>
            <div className={classes.buttons}>
              <Button variant="contained" color="primary">מתווכים</Button>
              <div className={classes.rentSaleButtons}>
                <Button variant="contained" color="primary">דירות להשכרה</Button>
                <Button variant="contained" color="primary">דירות למכירה</Button>
              </div>
            </div>
{/*             <h3>אתר "ריל נדל"ן" בא לתת פתרון למתווכים אשר רוצים לשתף ביניהם פעולה,<br/>
                ובנוסף מאפשר פרסום דירות באופן פומבי.
            </h3> */}
        </div>
    );
}
export default withStyles(styles()[0])(renderHomePage);