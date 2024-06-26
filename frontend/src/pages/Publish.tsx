import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useEffect, useState } from "react"

const Publish = () => {
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }})
    const copyFuntion = () => {
        navigator.clipboard.writeText(content); 
    }
    const removeExtraSpaces = () => {
        const newText = content.split(/\s+/).filter(Boolean).join(" ");
        setcontent(newText);
    };
    const clearText = ()=>{ 
        let newText = '';
        setcontent(newText);
    }
    const upperCase=() =>{
        let newText = content.toUpperCase()
        setcontent(newText)
    }
    const lowerCase=() =>{
        
        let newText = content.toLowerCase()
        setcontent(newText)
    }
    const postBlog = async() =>{
        if(title.length >= 5 && content.length>= 10){
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, 
             {title, content}, 
             { headers: {
                 Authorization: localStorage.getItem("token")}});
                 navigate(`/blog/${response.data.id}`)
        }else{
            alert("Content is small. Add more details please")
        }
    }
  return ( <>
  <Navbar/>
  <div className="flex justify-center w-full px-2">
    <div className="max-w-screen-lg w-full">
    <input onChange={(e) => { settitle(e.target.value)}} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required  />
    <div>
   {/* <TextEditor onChange={(e) => { setcontent(e.target.value), handleChange}}/> */}
   <div>
     <textarea value={content} onChange={(e) => setcontent(e.target.value)} id="txtarea" rows={10} className="my-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write an article..."></textarea>
    </div>
    <div className="buttons">
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={copyFuntion}>Copy Text</button>
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={removeExtraSpaces}>Remove extra Space</button>
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={clearText}>Clear Text</button>
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={upperCase}>UpperCase</button>
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={lowerCase}>LowerCase</button>
    </div>
    </div>
    <button onClick={postBlog} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Publish post</button>
    </div>
    </div>
    </>
  )
}


export default Publish
