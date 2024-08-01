import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { API_Key, BACKEND_URL } from "../config"
const AIgenerated = () => {
  const navigate = useNavigate()
  const [title, settitle] = useState('')
  // @ts-ignore
  const [content, setcontent] = useState('')
  const [loading, setloading] = useState(false)

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }})

    
  const AIRequest = async(prompt: string) => {
    try{
    if(prompt.length < 5){
      checkingFunction()
    }else{
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_Key}`, 
      {contents: [ {
          parts: [
              { text: prompt + ": write a blog about that in 10-12 lines" }
          ] }]},
      {
        headers: { 'Content-Type': 'application/json'}
      })
      let generatedText = response.data.candidates[0].content.parts[0].text;
      generatedText = generatedText
      .replace(/##+/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/- /g, '')
      .replace(/\n+/g, '\n');
      return generatedText;
} }
catch (error) {
    console.error("Error generating content:", error);
    return "";
}
};


const [checking, setchecking] = useState(false)
    const postBlog = async() =>{
      setloading(true)
      if(title.length >= 5){
        const res = await AIRequest(title)
        setcontent(res)
          const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, 
           {
            title, 
            content: res},
           { headers: {
               Authorization: localStorage.getItem("token")}});
               setloading(false)
               navigate(`/blog/${response.data.id}`)
      }else{
        checkingFunction()
        setloading(false)
        }
      }
      function checkingFunction() {
        setchecking(true);
        setTimeout(() => {
          setchecking(false);
        }, 6000);
      }
      // useEffect(() => {
      //   setTimeout(() => {
      //     setchecking(false);
      //   }, 6000);
      // }, [checking])
      
  return (
    <>
  <Navbar/>
  <div className="flex flex-col justify-center w-full px-2 items-center">

  { checking? <div className="flex items-center w-full p-4 rounded-lg bg-gray-500">
      <div className="ms-3 text-sm font-medium text-white">
        Title Should be atleast 5 characters long!
      </div>
      <button type="button" onClick={() =>setchecking(false)} className="ms-auto -mx-1.5 -my-1.5 text-gray-50 bg-gray-500 rounded-lg p-1.5 hover:bg-gray-400 inline-flex items-center justify-center h-8 w-8">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
: ""}


    <div className="max-w-screen-xl w-full">
    <input onChange={(e) => { settitle(e.target.value)}} type="text" className="bg-gray-100 outline-none text-gray-900 text-base rounded-lg block w-full p-3 pl-5 py-7 mt-5 mb-14" placeholder="Title" required  />
    <button disabled={loading ? true : false} onClick={postBlog} type="submit" className={`mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg ${loading ? 'cursor-not-allowed' : ''}`}>{loading ? "Generating" : "Generate"}</button>
    </div>
    </div>
    </>
  )
}

export default AIgenerated
