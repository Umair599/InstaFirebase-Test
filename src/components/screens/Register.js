import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, Keyboard} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import {fetchCode, signUp} from '../actions';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import {INSTAGRAM_APP_ID, REDIRECT_URI} from '../apis/credentials';
import Loader from '../utilities/Loader';
import {useLocation} from 'react-router-dom';

import SocialImage from '../images/social_media_img.jpg';

import InstaImage from '../images/insta_image.png';
const {width, height} = Dimensions.get('window');

const Register = (props)=>{
    const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryCode = searchParams.get('code');
  const [loading, setLoading] = useState(false);
  const [code]= useState(queryCode);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    window.location = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
};
    useEffect(()=>{
        if(code) {
            const formValues = {
                name: userName,
                email: userEmail,
                age: userAge,
                address: userAddress,
                password: userPassword,
              };
            props.signUp(formValues, code);
          //props.fetchCode(code); 
        }
          },[code]);
    return(
        <View style={styles.container}>
  <Loader loading={loading} />
  <Text style={styles.welcome}>Welcome to Insta-UK App</Text>
  <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
  <Image source={SocialImage} style={{resizeMode: 'contain', width: width*0.5, height: height*0.6}} />
  <View style={{flexDirection: 'column', marginVertical: 10, alignContent:'center', backgroundColor:'#fafafa', borderWidth: 1,
          borderColor: 'black',alignSelf:'center',width: width*0.4,
          borderRadius: 10, padding: 5}}>
          <KeyboardAvoidingView enabled>
          <Image source={InstaImage} style={{resizeMode: 'contain', width: 100, height: 50, alignSelf:'center'}} />
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current && ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserAge => setUserAge(UserAge)}
              underlineColorAndroid="#f000"
              placeholder="Enter Age"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current && addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserAddress => setUserAddress(UserAddress)}
              underlineColorAndroid="#f000"
              placeholder="Enter Address"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          <TouchableOpacity activeOpacity={0.2} style={{flex:1, cursor: 'pointer', flexWrap:'no-wrap', alignSelf:'center', marginVertical:10}} onPress={handleSubmitButton} >
            <View style={styles.registerButton}>
             <FontAwesomeIcon icon={faInstagram} size="2x" style={{marginInline:15}}/>
            <Text style={styles.registerText}>Regitser</Text>
            </View>

            <Text
              style={styles.registerTextStyle}
              onPress={() => console.log('SignUp')}>
              Already Register! Go to Login
            </Text>
          </TouchableOpacity>
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
export default connect(mapStateToProps, {fetchCode, signUp})(Register);
const styles = StyleSheet.create({
    container: {
      flex:1, 
      flexDirection: 'column',
      marginVertical: 10,
      alignContent: 'center',
      backgroundColor: '#ffffff',
      width: width,
      height: height,
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 5,
        color: '#000000',
      },
      registerButton:{
        flexDirection: 'row',
        justifyContent: 'center', 
        alignContent:'center',
        backgroundColor: '#b2dffc',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal:40, paddingVertical:10, height: 40, width: 120
      },
});