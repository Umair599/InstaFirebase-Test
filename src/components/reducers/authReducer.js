import {SIGN_IN, SIGN_OUT, SIGN_UP} from '../actions/types';
const INITIAL_STATE={
    isSignedIn: null,
    user: null,
    accessToken: null,
    instaUserId:null,
};
export default (state=INITIAL_STATE, action)=>{
switch (action.type){
    case SIGN_IN:
        return {...state, accessToken: action.payload.access_token, instaUserId: action.payload.userId};
    case SIGN_UP:
        return {...state, isSignedIn: true, user: action.payload};
    case SIGN_OUT:
        return {...state, isSignedIn: false, userId: null, accessToken: null};
    default:
        return state;
    }
};
