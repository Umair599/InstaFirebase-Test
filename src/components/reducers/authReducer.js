import {SIGN_IN, SIGN_OUT, ACCESS_TOKEN} from '../actions/types';
const INITIAL_STATE={
    isSignedIn: null,
    userId: null,
    accessToken: null,
    instaUserId:null,
};
export default (state=INITIAL_STATE, action)=>{
switch (action.type){
    case ACCESS_TOKEN:
        return {...state, accessToken: action.payload.access_token, instaUserId: action.payload.userId};
    case SIGN_IN:
        return {...state, isSignedIn: true, userId: action.payload.userId};
    case SIGN_OUT:
        return {...state, isSignedIn: false, userId: null, accessToken: null};
    default:
        return state;
    }
};