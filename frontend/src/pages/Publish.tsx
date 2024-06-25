import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { BACKEND_URL } from "../config"
import axios from "axios"

const Publish = () => {
    const navigate = useNavigate()
  return ( <>
  <Navbar/>
  <div className="flex justify-center w-full pt-8">
    <div className="max-w-screen-lg w-full">
    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required />
   <TextEditor/>
     <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,  {
                        method: "POST",
                        headers: {
                            "Authorization": localStorage.getItem("userInfo")
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
    </div>
    </div>
    </>
  )
}
function TextEditor () {
    return <div>
     <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
    </div>
}

export default Publish
