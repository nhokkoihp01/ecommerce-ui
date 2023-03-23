import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";
import axios from "axios";


const login = async (username, password) => {
    await instance.post("/auth/login", {username, password})
        .then((res) => {
            if (res.data.accessToken) {
                localStorage.setItem("token", JSON.stringify(res.data))
            }
            console.log("successfully")
            return res.data
        })
        .catch((e) => console.log("failed"))
}
const getInfoUser = () => {
      return axios.get("http://localhost:8080/api/users/me",{headers:authHeader()});
}
const getCurrentUser = () => {
     return JSON.parse(localStorage.getItem("token"))
}


const AuthService = {
    login,
    getInfoUser,
    getCurrentUser

};
export default AuthService;
