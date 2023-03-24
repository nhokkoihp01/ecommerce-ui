import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";


const login = async (username, password) => {
    try {
        const response = await instance.post("/auth/login", {username, password});
        if (response.data.accessToken) {
            localStorage.setItem("token", JSON.stringify(response.data));
            return response;
        }
        else{
            return response
        }

    } catch (error) {
        console.log(error);
    }
}
const getInfoUser = () => {
      return instance.get("/users/me",{headers:authHeader()});
}
const getCurrentUser = () => {
     return JSON.parse(localStorage.getItem("token"))
}
const logout = () => {
    localStorage.removeItem("token");
};


const AuthService = {
    login,
    getInfoUser,
    getCurrentUser,
    logout,

};
export default AuthService;
