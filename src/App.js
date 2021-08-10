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
import {View} from 'react-native';
import history from './history';
const store= createStore(reducers, applyMiddleware(thunk));
const App = ()=> {
  return (
    <Provider store={store}>
      <Router history={history}>
        <View style={{flex:1, flexDirection:'column'}}>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/:userId" component={PostList} />
          <Route exact path="/explore/posts" component={Explore}/>
        </Switch>
        <Footer />
        </View>
      </Router>
     
    </Provider>
    );
}
export default (App);
