import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavLink} from 'react-router-dom';
const Footer = () => {
  return (
    <View style={styles.footerView}> 
      <Text style={styles.footerText}>
        Made By{" "}
        <NavLink to={{pathname: 'http://merisite.online'}} target="_blank">Umair Khalid</NavLink>
      </Text>
    </View>
  );
};

export default Footer;
const styles = StyleSheet.create({
  footerView:{
    justifyContent:'flex-end',
    flexDirection:'column',
   alignSelf:'center',
  flex:1,
    height:150,
  },
  footerText: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: '#fa923f',
  },
});