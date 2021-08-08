import React from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './components/reducers';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import PostList from './components/screens/PostList';
import Explore from './components/screens/Explore';
import Footer from "./components/screens/Footer";
import { auth } from './firebase/config';
const store= createStore(reducers, applyMiddleware(thunk));
const App = ()=> {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/:userId" component={PostList} />
          <Route exact path="/explore/posts" component={Explore}/>
        </Switch>
      <Footer />
      </Router>
    </Provider>
    );
}
export default (App);
