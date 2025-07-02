'use server'

import axios from "axios"

const _axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

console.log(_axios)