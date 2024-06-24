import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
export const useBlogs = () => {
    const [loading, setloading] = useState(true)
    const [blogs, setblogs] = useState([])
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`)
        .then(res => {
            setblogs(res.data.blogs)
            setloading(false)
        })
    })
    return {
        loading, blogs
    }
}