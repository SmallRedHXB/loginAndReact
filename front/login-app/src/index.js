import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from 'react-router-dom'
// import checkLogin from './components/checkLogin'
import Login from './containers/login'
import WrappedRegistrationForm from './containers/register'
import Homepage from './containers/homepage'

ReactDOM.render(
    <Router>
        <div className='login-register'>
            {/* <checkLogin/> */}
            <Route path='/login' component={Login}/>
            <Route path='/register' component={WrappedRegistrationForm}/>
            <Route path='/homepage' component={Homepage}/>
        </div>
    </Router>,
    document.getElementById('root')
);
