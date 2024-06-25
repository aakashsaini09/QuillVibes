import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";
export interface Blog {
    "title": string,
    "content": string,
    "id": number,
    "publishDate": Date | string
    "author": {
        "name": string
    }
}
export const useBlogs = (): { loading: boolean; blogs: Blog[] } => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("userInfo")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false); // make sure to handle errors by setting loading state to false
            });
    }, [])

    return {
        loading,
        blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false); // make sure to handle errors by setting loading state to false
            });

    }, [id])

    return {
        loading,
        blog
    }

}

export interface UserSchema {
    "email": string,
    "name": string,
    "password": number
}
export const useprofileBlog = () => {
    
    const [user, setUser] = useState<UserSchema>();
    useEffect(() => {
        axios.post(`${BACKEND_URL}/api/v1/blog/user`, {},
            {  headers: {Authorization: localStorage.getItem("token")}}
        )
        .then(response => {
            setUser(response.data.user);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
           });
    }, [])
    return {user}
}