import axios from "axios";
const logIn = async ({email, password}) => {
    console.log(email, password)
    return axios.post("api/users/login", {email, password})
}

const signUp = async ({email, password, name, dob, contact_no, organizationName}) => {
    return axios.post("api/users/signup", {email, name, password, dob, contact_no, organizationName});
}

const verifyToken = async (token) => {
    return axios.post("api/users/verify", {x_auth_token: token});
}


export default {
    login: logIn,
    verifyToken: verifyToken,
    signUp: signUp
}