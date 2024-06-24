import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
interface Blog{
    "content": string,
    "title": string,
    "id": number,
    "author": {
        "name": string
    }
}
export const useBlogs = () => {
    const [loading, setloading] = useState(true)
    const [blogs, setblogs] = useState<Blog[]>([])
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            setblogs(res.data.blogs)
            setloading(false)
        })
    })
    return {
        loading, blogs
    }
}