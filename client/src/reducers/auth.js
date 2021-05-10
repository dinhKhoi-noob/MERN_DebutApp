import * as Type from '../constant/type'

export const authReducer = (state,action)=>{
    const {type,payload:{isAuthenticated,user}} = action;
    switch(type){
        case Type.SET_AUTH:
            console.log("from reducer");
            return {...state,authLoading:false,isAuthenticated,user}
        default:
            return state;
    }
}