import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import { NavLink } from 'react-router-dom';


import Logo from '../images/f1-logo.jpeg';

const useStyles = makeStyles({
    list: {
        width: 300,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (

        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <ul>
                <li className='relative'><img src={Logo} alt='f1 logo' className='asideLogo' /><div className='logoOverlay'>FORMULA 1<br />STATS</div></li>
                <li className='relative'><NavLink exact={true} className='waves-effect waves-light btn white' activeClassName='is-active' to='/formula-app/'><span className='decorativeFont'>Q</span>Home</NavLink></li>
                <li className='relative'><NavLink exact={true} className='waves-effect waves-light btn white' activeClassName='is-active' to='/formula-app/drivers'><span className='decorativeFont'>T</span>Drivers</NavLink></li>
                <li className='relative'><NavLink exact={true} className='waves-effect waves-light btn white' activeClassName='is-active' to='/formula-app/teams'><span className='decorativeFont'>'</span>Teams</NavLink></li>
                <li className='relative'><NavLink exact={true} className='waves-effect waves-light btn white' activeClassName='is-active' to='/formula-app/races'><span className='decorativeFont'>!</span>Races</NavLink></li>
            </ul >
        </div >
    );

    

    return (
        <div className="side-menu-button-wrapper">
            <button className="hamburger hamburger--arrowalt-r" type="button" onClick={toggleDrawer('left', true)}>
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}