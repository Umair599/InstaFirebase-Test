import {SIGN_IN, SIGN_OUT, FETCH_POSTS,ACCESS_TOKEN} from './types';
import {INSTAGRAM_APP_ID, REDIRECT_URI, INSTAGRAM_APP_SECRET} from '../apis/credentials';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const ROOT_URL='https://graph.instagram.com';
export const signOut = ()=>{
    return {
        type: SIGN_OUT
    };
};
export const signUp=(formValues, code)=>async (dispatch, getState)=>{
    dispatch(fetchCode(code));
    const {accessToken, instaUserId}=getState().auth;
    firebase.auth().createUserWithEmailAndPassword(formValues.email,formValues.password ).then(async (resp) => {
        const docRef = firebase.firestore().doc(`/users/${formValues.email}`);
        let user = {};
        user.name = formValues.name;
        user.email = formValues.email;
        user.accessIGToken= accessToken;
        user.instaUserId= instaUserId;
        user.photoURL = resp.user.photoURL;
        user.userName = formValues.age;
        user.userName = formValues.address;
        docRef.set(user);
        console.log(user);
        //dispatch({ type: SIGN_UP, payload: user });
      })
      .catch((e) => {
        console.log(e.message);
      });
}
export const signIn = formValues=> async dispatch=>{
    firebase.auth().signInWithEmailAndPassword(formValues.email, formValues.password).then(async (resp) => {
        const docRef = firebase.firestore().doc(`/users/${formValues.email}`);
        docRef.get().then((data) => {
            console.log(data.data());
          //dispatch({ type: SIGN_IN, payload: data.data() });
        });
      })
      .catch((e) => {
          console.log(e.message);
      //   dispatch({ type: "SET_ERROR", payload: e.message });
        setTimeout(() => {
            console.log(e.message);
          //dispatch({ type: "REMOVE_ERROR" });
        }, 2000);
      });
}
export const fetchCode = code => async dispatch=> {
    const formData = new FormData();
    formData.append('client_id', INSTAGRAM_APP_ID);
    formData.append('client_secret', INSTAGRAM_APP_SECRET);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', REDIRECT_URI);
    formData.append('code', code);
    fetch('https://api.instagram.com/oauth/access_token', {
        method: 'post',
        body: formData
    })
    .then(res => res.json())
    .then(
    (result) => {
        dispatch(fetchLongAccessToken(result.access_token, result.user_id));
    }).catch(err => {
        console.log(err, 'Error occured while getting shortAccessToken and userId Failed');
    });
};
export const fetchLongAccessToken = (token, userId)=>async => {
    fetch(`${ROOT_URL}/access_token?client_secret=${INSTAGRAM_APP_SECRET}&access_token=${token}&grant_type=ig_exchange_token`).then(response => response.json()).then(res => {
        dispatch({type: ACCESS_TOKEN, payload: {access_token: res.access_token, userId: userId}});
    }).catch(err => {
    console.log(err, 'Error occured while getting Long Access Token');
});
};
export const fetchPosts = token=>async dispatch=> {
    const query = 'id,username,timestamp,caption,media_url,media_type,permalink,children';
    const final_url = `https://graph.instagram.com/me/media?fields=${query}&access_token=${token}`;
    fetch(final_url).then(response => response.json()).then(res => {
    console.log(res.data);
    dispatch({type: FETCH_POSTS, payload: res.data});
    }).catch(err => {
    dispatch({type: FETCH_POSTS, payload: []});
    console.log(err, 'Error occured while getting User Media Information');
});
};