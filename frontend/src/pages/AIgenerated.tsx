import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { API_Key, BACKEND_URL } from "../config"
const AIgenerated = () => {
  const navigate = useNavigate()
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')
  const [loading, setloading] = useState(false)

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }})
  // function{
//     generatedText = generatedText
//     .replace(/##+/g, '')
//     .replace(/\*\*/g, '')
//     .replace(/\*/g, '')
//     .replace(/- /g, '')
//     .replace(/\n+/g, '\n');

// const extractedTitle = extractTitle(generatedText);
// let len = extractedTitle.length;
// settitle(extractedTitle);
// console.log(extractedTitle); // Use 'extractedTitle' here
// const generatedTexts = generatedText.substring(len).trim();
  // }




  //   const extractTitle = (text: string) => {
  //     const lines = text.split('\n');
  //     return lines.length > 0 ? lines[0].replace('## ', '') : 'Untitled';
  // };


  const AIRequest = async(prompt: string) => {
    try{
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_Key}`, 
      {contents: [ {
          parts: [
              { text: prompt + "in 10-12 lines" }
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
} 
catch (error) {
    console.error("Error generating content:", error);
    return "";
}
};



    const postBlog = async() =>{
      setloading(true)
      // if(title.length >= 5 && content.length>= 10){
        const res = await AIRequest(title)
        setcontent(res)
        console.log("response is:::::",res)
        // setcontent(generatedContent)
        console.log("Title::", title, "content is:::", content)
          const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, 
           {
            title, 
            content: res},
           { headers: {
               Authorization: localStorage.getItem("token")}});
               setloading(false)
               navigate(`/blog/${response.data.id}`)
      // }else{
      //   setloading(false)
      //     alert("Content is small. Add more details please")
      //   }
      }
  return (
    <>
  <Navbar/>
  <div className="flex justify-center w-full px-2">
    <div className="max-w-screen-xl w-full">
    <input onChange={(e) => { settitle(e.target.value)}} type="text" className="bg-gray-100 outline-none text-gray-900 text-base rounded-lg block w-full p-3 pl-5 py-7 mt-5 mb-14" placeholder="Title" required  />
    <button disabled={loading ? true : false} onClick={postBlog} type="submit" className={`mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg ${loading ? 'cursor-not-allowed' : ''}`}>{loading ? "Generating" : "Generate"}</button>
    </div>
    </div>
    </>
  )
}

export default AIgenerated
