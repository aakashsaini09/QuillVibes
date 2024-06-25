import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { ChangeEvent, useState } from "react"

const Publish = () => {
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const navigate = useNavigate()
    const copyFuntion = () => {
        navigator.clipboard.writeText(content); 
    }
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setcontent(event.target.value);
    };
    const removeExtraSpaces = () => {
        // Split the content by spaces, filter out empty strings, and join back with a single space
        const newText = content.split(/\s+/).filter(Boolean).join(" ");
        setcontent(newText);
        console.log("content: ", content, " And newtext is: ", newText)
    };
    const clearText = ()=>{ 
        let newText = '';
        setcontent(newText);
    }
  return ( <>
  <Navbar/>
  <div className="flex justify-center w-full pt-8">
    <div className="max-w-screen-lg w-full">
    <input onChange={(e) => { settitle(e.target.value)}} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required  />
    <div>
   <TextEditor onChange={(e) => { setcontent(e.target.value), handleChange}}/>
    <div className="buttons">
        <button onClick={copyFuntion}>Copy text</button>
        <button onClick={removeExtraSpaces}>Remove Extra Space</button>
        <button onClick={clearText}>Clear Text</button>

    </div>
    </div>
    <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title, content
                    }, { headers: {
                        Authorization: localStorage.getItem("token")
                    }});
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
    </div>
    </div>
    </>
  )
}
function TextEditor ({onChange}: {onChange:( e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>
     <textarea onChange={onChange} id="txtarea" rows={6} className="my-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write an article..."></textarea>
    
    </div>
}


export default Publish
