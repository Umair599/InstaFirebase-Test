import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, Keyboard} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import {fetchCode, fetchPosts} from '../actions';
import {connect} from 'react-redux';
import LoginImage from '../images/social_media.png';
import {useLocation, NavLink} from 'react-router-dom';
import {INSTAGRAM_APP_ID, REDIRECT_URI} from '../apis/credentials';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import Loader from '../utilities/Loader';
const {width, height} = Dimensions.get('window');
import InstaImage from '../images/insta_image.png';
const Login = (props)=>{
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryCode = searchParams.get('code');
  const [code]= useState(queryCode);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRef = createRef();
  useEffect(()=>{
if(code) {
  props.fetchCode(code); 
}
  },[code]);
  useEffect(() => {
    if (props.accessToken) props.history.push(`/${props.userId}/?accessToken=${props.accessToken}`);
  }, [props.accessToken]);
  const handleLoginClick = e => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    window.location = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    
  };
  if (props.isSignedIn) props.history.push(`/${props.userId}/?accessToken=${props.accessToken}`);
    return (
        <View style={styles.container}>
          <Loader loading={loading} />
          <Text style={styles.welcome}>Welcome to Insta-UK App</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-evenly', flex:1}}>
          <Image source={LoginImage} style={styles.loginImage} />
          <View style={styles.loginSection}>
          <KeyboardAvoidingView enabled>
          <Image source={InstaImage} style={styles.brandImage} />
          <View style={styles.SectionStyle}>
          <FontAwesomeIcon icon={faAt} size="1x" style={{ alignSelf:'center'}}/>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
            <FontAwesomeIcon icon={faLock} size="1x" style={{ alignSelf:'center'}}/>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext !== '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity activeOpacity={0.2} style={styles.loginButton} onPress={handleLoginClick} >
             <FontAwesomeIcon icon={faInstagram} size="2x" style={{marginInline:15}}/>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.registerTextStyle}>
              <NavLink to='/register'> New Here ? Register</NavLink>
            </Text>
            </KeyboardAvoidingView>
      </View>
      
          </View>
        </View>
   
    );
}
const mapStateToProps=(state)=>{
  return {
    isSignedIn: state.auth.isSignedIn,
    accessToken: state.auth.accessToken,
    userId: state.auth.userId
  };
}
export default connect(mapStateToProps, {fetchCode, fetchPosts})(Login);
const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent: 'center',
    flexDirection: 'column',
    marginVertical: 10,
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 5,
    color: '#000000',
  },
  loginImage:{
    resizeMode: 'contain',
    width: width*0.5,
    height: height*0.7,
  },
  loginSection:{
    flexDirection: 'column',
    marginVertical: 10,
    alignContent:'center',
    backgroundColor:'#fafafa',
    borderWidth: 1,
    borderColor: 'black',
    alignSelf:'center',
    width: width*0.4,
    borderRadius: 10,
    padding: 5
  },
  brandImage:{
    resizeMode: 'contain',
    width: 100,
    height: 50,
    alignSelf:'center'},
  SectionStyle: {
    flexDirection: 'row',
    marginTop: 20,
    height: 40,
    marginHorizontal:5,
  },
  inputStyle: {
    flex:1,
    flexShrink: true,
    color: 'black',
    paddingLeft: 4,
    paddingRight: 2,
    borderWidth: 1,
    borderRadius: 10,
    marginStart: 5
  },
  loginText:{
    fontSize: 20, fontWeight: '500'
  },
  loginButton:{
    flexDirection: 'row', 
    justifyContent: 'center',
    alignContent:'center',
    backgroundColor: '#b2dffc',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal:40,
    paddingVertical:10,
    height: 40,
    width: 120,
    flex:1,
    cursor: 'pointer',
    flexWrap:'no-wrap', 
    alignSelf:'center',
    marginVertical:10,
  },
  registerTextStyle: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
});
