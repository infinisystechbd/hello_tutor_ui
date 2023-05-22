import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Axios() {
    const router = useRouter();

    const getToken = () => {
        if (typeof window !== 'undefined') {

            const tokenString = localStorage.getItem('token');
            return tokenString;
        }
    }

    const getUser = () => {

        if (typeof window !== 'undefined') {

            const userString = localStorage.getItem('token');
          //  const user_detail = JSON.parse(userString);
            return userString;
        }
    }




    const [token, setToken] = useState(getToken());
    // const [user, setUser] = useState(getUser());

    const saveToken = (token) => {
        
        localStorage.setItem('token', token);
        // localStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        // setUser(user);
        router.replace("/dashboard")
        router.reload();
    }

    function logout(){
        localStorage.clear();
         router.push("/user/login");
         router.reload();
      }

    const http = axios.create({
        // baseURL: "http://localhost:8000/api",
        baseURL: "http://localhost:5000/api/v1/auth",
        headers: {
            "Content-Type": "application/json"
        }
    });

    
    return {
        setToken: saveToken,
        token,
        // user,
        getToken,
        logout,
        http
    }
}