import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from '../MaterialComponents';


const renderHomePage = (props) => (
    <div className="bg">
        <NavBar navButtons={props.buttonsArray} enterHoverState={props.enterHoverState} leaveHoverState={props.leaveHoverState} hoverState={props.hoverState} />
{/*         <div className={classes.right + ' ' + classes.homeCard}>
            <HomePageCard cardImage="../statics/rent-sign.jpg" leftBtnTitle="היכנס" rightBtnTitle="קרא עוד" title="השכרה" content="לוח דירות להשכרה ממתווכים הראשון מסוגו בארץ"/>
        </div>
        <div className={classes.homeCard}>
            <HomePageCard cardImage="../statics/sale-sign.jpg" leftBtnTitle="היכנס" rightBtnTitle="קרא עוד" title="מכירה" content="לוח דירות למכירה ממתווכים הראשון מסוגו בארץ"/>
        </div> */}
    </div>
);

export default(renderHomePage);