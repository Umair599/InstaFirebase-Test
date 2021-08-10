import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, Keyboard} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import {fetchCode, signUp, updateAccessToken} from '../actions';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faLock, faAt, faUser, faUsers,faLocationArrow } from '@fortawesome/free-solid-svg-icons';
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
    const formValues = {
        name: userName,
        email: userEmail,
        age: userAge,
        address: userAddress,
        password: userPassword,
      };
      localStorage.setItem('email', userEmail);
      props.signUp(formValues);
};
    useEffect(()=>{
        if(code) {
          props.fetchCode(code, localStorage.getItem('email'));
        }
          },[code]);

    return(
        <View style={styles.container}>
  <Loader loading={loading} />
  <Text style={styles.welcome}>Welcome to Insta-UK App</Text>
  <View style={styles.mainRowSection}>
  <Image source={SocialImage} style={styles.registerImage} resizeMode={'contain'}/>
  <View style={styles.registerSection}>
          <KeyboardAvoidingView enabled>
          <Image source={InstaImage} style={styles.brandImage} resizeMode={'contain'}/>
          <View style={styles.SectionStyle}>
          <View style={styles.iconView}>
          <FontAwesomeIcon icon={faUser} size="1x"/></View>
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
          <View style={{alignSelf:'center',flex:0.4}}>
          <FontAwesomeIcon icon={faUsers} size="1x"/></View>
            <TextInput
              style={{flex:6,
                paddingLeft: 4,
                borderWidth: 1,
                borderRadius: 8,
                marginStart: 4,
                marginRight:2,
                height: height*0.05,
                width:width*0.376}}
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
          <View style={styles.iconView}>
          <FontAwesomeIcon icon={faLocationArrow} size="1x"/></View>
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
          <View style={styles.SectionStyle}>
          <View style={styles.iconView}>
          <FontAwesomeIcon icon={faAt} size="1x"/></View>
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
            <View style={styles.iconView}>
          <FontAwesomeIcon icon={faLock} size="1x"/></View>
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
          <TouchableOpacity style={styles.registerButton} onPress={handleSubmitButton} >
             <FontAwesomeIcon icon={faInstagram} style={{marginInline:5,alignSelf:'center'}}/>
            <Text style={styles.registerText}>Regitser</Text>
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
      mainRowSection:{
        flexDirection: 'row',
        height: height*0.78,
        width:width*0.98,
        alignSelf:'center',
        marginHorizontal:2,
      },
      registerImage:{
        flex:1.4,
        alignSelf:'center',
        height:400,
        flexDirection:'column'
        
      },
      registerSection:{
        flexDirection: 'column',
        marginVertical: 1,
        alignContent:'center',
        backgroundColor:'#fafafa',
        borderWidth: 1,
        borderColor: 'black',
        alignSelf:'center',
        borderRadius: 10,
        padding: 4,
        flex:1,
        flexShrink:true,
        flexWrap:'wrap'
      },
      brandImage:{
        height: 50,
        width:150,
        alignSelf:'center',
        marginVertical:5
      },
      SectionStyle: {
        flexDirection: 'row',
        marginTop: 7,
        justifyContent:'center',
        flex:1,
        alignContent:'center',
        alignSelf:'center',
      },
     iconView:{
      alignSelf:'center',
      flex:0.4
    },
      inputStyle: {
        flex:6,
        paddingLeft: 4,
        borderWidth: 1,
        borderRadius: 8,
        marginStart: 4,
        marginRight:2,
        height: height*0.05,
        width:width*0.38,
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
        paddingHorizontal:2,
        paddingVertical:1,
        height: height*0.045,
        cursor: 'pointer',
        flexWrap:'no-wrap', 
        alignSelf:'center',
        marginVertical:10,
      },
      registerText:{
         fontWeight: '600',textAlign:'center', marginRight:2, paddingRight:2
      },
});
