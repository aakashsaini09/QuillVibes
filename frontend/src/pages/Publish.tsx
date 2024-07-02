import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
const Publish = () => {
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const [copy, setcopy] = useState(true)
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }})
    const copyFuntion = () => {
      if (!copy == false) {
        setcopy(false)
        // navigator.clipboard.writeText(inputValue)
        navigator.clipboard.writeText(content); 
        setTimeout(() =>{
          setcopy(true)
        }, 2000)
    }}
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
          setloading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, 
             {title, content}, 
             { headers: {
                 Authorization: localStorage.getItem("token")}});
                 setloading(false)
                 navigate(`/blog/${response.data.id}`)
        }else{
          setloading(false)
            alert("Content is small. Add more details please")
        }
    }
  return ( <>
  <Navbar/>
  <div className="flex justify-center w-full px-2">
    <div className="max-w-screen-lg w-full">
    <input onChange={(e) => { settitle(e.target.value)}} type="text" className="bg-gray-100 outline-none text-gray-900 text-base rounded-lg block w-full p-3 py-7 mt-5" placeholder="Title" required  />
    <div>
   {/* <TextEditor onChange={(e) => { setcontent(e.target.value), handleChange}}/> */}
   <div>
     <textarea value={content} onChange={(e) => setcontent(e.target.value)} id="txtarea" rows={10} className="my-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg outline-none" placeholder="Write an article..."></textarea>
    </div>
    <div className="buttons">
            <button type="button" className="text-white bg-gray-800 rounded-lg text-sm w-auto px-5 py-2.5 me-2 mb-2" onClick={copyFuntion}>{copy ? 'Copy' : 'Copied'}</button>
            {/* <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={copyFuntion}>Copy Text</button> */}
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={removeExtraSpaces}>Remove extra Space</button>
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={clearText}>Clear Text</button>
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={upperCase}>UpperCase</button>
            <button type="button" className="text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={lowerCase}>LowerCase</button>
    </div>
    </div>
    <button disabled={loading ? true : false} onClick={postBlog} type="submit" className={`mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 ${loading ? 'cursor-not-allowed' : ''}`}>Publish post</button>
    </div>
    </div>
    </>
  )
}


export default Publish
