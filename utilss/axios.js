import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Axios() {
    const router = useRouter();

    const getToken = () => {
        if (typeof window !== 'undefined') {

            const tokenString = localStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            return userToken;
        }
    }

    const getUser = () => {

        if (typeof window !== 'undefined') {

            const userString = localStorage.getItem('user');
            const user_detail = JSON.parse(userString);
            return user_detail;
        }
    }




    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        router.replace("/dashboard")
    }

    function logout(){
        localStorage.clear();
         router.push("/user/login");
      }

    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-Type": "application/json"
        }
    });

    
    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        logout,
        http
    }
}