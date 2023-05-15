import React from "react";
import axios from "axios";

export default async function useAuth(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    await axios.get("http://localhost:3005/api/auth/get_profile_info", config).then((el) => {
        return { status: true, data: el.data, message: "User is logged in" }
    }).catch(err => {
        return { message: "User is not logged in" }
    })
}