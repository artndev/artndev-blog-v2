'use server'

import axios from "axios"
import { I_Article, I_AxiosResponse } from "../_types"

const _axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const getArticles = async (): Promise<I_AxiosResponse<I_Article[]>> => {
    return _axios
        .get("/articles")
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
}

export const getArticle = async (id: string): Promise<I_AxiosResponse<I_Article | null>> => {
    return _axios
        .get(`/articles/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
}