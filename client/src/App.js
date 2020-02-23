import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Main from './components/layout/Main'
import Profile from './components/profile/Profile'
import NotFound from './components/NotFound'

import store from './store'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { logoutUser, getCurrentUser } from './actions/authActions'
import setHeaderAuth from './utils/setAuthHeader'

if(localStorage.getItem('jwtToken')){
  const current_time = Date.now() / 1000
  const decode = jwt_decode(localStorage.getItem('jwtToken'))

  if(current_time > decode.exp){
    store.dispatch(logoutUser())
  }else{
    setHeaderAuth(localStorage.getItem('jwtToken'))
    store.dispatch(getCurrentUser())
  }
}

function App() {
  return (
          <Provider store={store}>
              <div>
                    <Router>
                       <Main> 
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route  path='/login' component={Login} />
                            <Route  path='/register' component={Register} />
                            <Route path='/profile/:userId' component={Profile} />
                            <Route component={NotFound} />
                        </Switch>
                       </Main> 
                    </Router>
              </div>
          </Provider>    
  );
}

export default App;
