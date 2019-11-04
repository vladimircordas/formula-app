import React from 'react';
import { NavLink } from 'react-router-dom';


import Logo from '../images/f1-logo.jpeg';





class Header extends React.Component {
    render() {
        var drivers = '/drivers';
        var teams = '/teams';
        var races = '/races';
        return (
            <div className='aside nav'>
                <ul>
                    <li className='relative'><img src={Logo} alt='f1 logo' className='asideLogo' /><span className='logoOverlay'>FORMULA 1<br />STATS {this.props.year}</span></li>
                    <li className='relative'><NavLink exact={true} className='waves-effect waves-light btn white' activeClassName='is-active' to='/'><span className='decorativeFont'>Q</span>Home</NavLink></li>
                    <li className='relative'><NavLink exact={true} className='waves-effect waves-light btn white' activeClassName='is-active' to={drivers}><span className='decorativeFont'>T</span>Drivers</NavLink></li>
                    <li className='relative'><NavLink exact={true} className='waves-effect waves-light btn white' activeClassName='is-active' to={teams}><span className='decorativeFont'>'</span>Teams</NavLink></li>
                    <li className='relative'><NavLink exact={true} className='waves-effect waves-light btn white' activeClassName='is-active' to={races}><span className='decorativeFont'>!</span>Races</NavLink></li>
                </ul>
            </div >
        )
    }
}


export default Header;