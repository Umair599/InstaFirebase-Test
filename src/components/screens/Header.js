import React from "react";
import {View, Image, TouchableOpacity} from 'react-native';
import InstaImage from '../images/insta_image.png';
import { NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
const Header = (props) => {

  const handleLogout = () => {
    props.auth.signOut(); 
  };
  return (
    
        <View style={{flexDirection:'row', marginHorizontal:50, marginVertical: 20, justifyContent: 'space-between', alignItems: 'center'}}>
          <View> 
            <Image source={InstaImage} style={{resizeMode: 'contain', width: 100, height: 50}} />
            </View>  
            <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>     
            <NavLink to={`/`} >
            <FontAwesomeIcon icon={faHome} size="2x"/>
            </NavLink>
            <NavLink to={`/explore/posts`}>
            <FontAwesomeIcon icon={faCompass} size="2x" style={{marginInline:12}}/>
            </NavLink>

            {/* <a href={`/${user.userName}`}>
              <li>
                {user.photoURL ? (
                  <img src={user.photoURL} className="user_header" />
                ) : (
                  <img src={UserImage} className="user_header" />
                )}
              </li>
            </a> */}
<TouchableOpacity onPress={handleLogout}>
            <FontAwesomeIcon icon={faSignInAlt} size="2x"/></TouchableOpacity>
          </View>
        </View>
    

  );
};
const mapStateToProps=(state)=>{
  return {
      isSignedIn: state.auth.isSignedIn,
      user: state.auth
  };
}
export default connect(mapStateToProps, {})(Header);
