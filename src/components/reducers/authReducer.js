import {SIGN_IN, SIGN_OUT, SIGN_UP} from '../actions/types';
const INITIAL_STATE={
    isSignedIn: null,
    accessToken: null,
    instaUserId:null,
    userEmail:null,
};
export default (state=INITIAL_STATE, action)=>{
switch (action.type){
    case SIGN_UP:
        return {...state, isSignedIn: true, accessToken: action.payload.access_token, instaUserId: action.payload.instaUserId, userEmail: action.payload.userEmail};
    case SIGN_IN:
        return {...state, };
    case SIGN_OUT:
        return {...state, isSignedIn: false};
    default:
        return state;
    }
};
