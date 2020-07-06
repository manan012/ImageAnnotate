import axios from "axios";
export const logIn = async (email, password) => {
    return axios.post("api/users/login", {email, password}, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}