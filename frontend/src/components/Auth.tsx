import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignInInput } from "@aakashsaini/medium-blog"
import axios from "axios"
import { BACKEND_URL } from "../config"

const Auth = ({type}: {type: "signup" | "signin"}) => {
  const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState<SignInInput>({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setloading] = useState(false)

  function demoLogin() {
    setPostInputs({
      email: "two@gmail.com",
      password: "aakashsaini"
    })
    authFunction()
  }

  const authFunction = async() => {
    try {
      setloading(true)
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`, postInputs)
      const jwt = res.data;  
      localStorage.setItem("token", jwt)
      setloading(false)
      navigate('/blogs')
    } catch (err) {
      console.log("Error", err)
      setloading(false)
      // @ts-ignore
      alert(err.response.data.error)
    }
  }
  return (<>
    <div className="bg-white h-screen flex justify-center flex-col">
      <div className="flex justify-center w-full flex-col">
        <div className="m-auto">
          <div className="text-4xl font-extrabold mb-2">
           {type ==="signup"? "Create an account": "Login your account"}
          </div>
          <div className="text-slate-400 text-center">
            {type === "signin"? "Don't have an accout?": "Already have an account?"} 
            <Link className="pl-2 underline" to={type === "signup"? "/signin": "/signup"}>{type === "signin"? "Sign up": "Sign in"}</Link>
          </div>
        </div>
        <div className="w-[60%] m-auto">
{type ==="signup" ? <div><LabelledInput type="text" label="NAME" placeholder="Enter your name here" onChange={(e) => {
          setPostInputs({
            ...postInputs,
            name: e.target.value
          })
        }}/> 
        <LabelledInput type="email" label="EMAIL" placeholder="Enter your email" onChange={(e) => {
          setPostInputs({
            ...postInputs,
            email: e.target.value
          })
        }}/>
        <LabelledInput type="password" label="PASSWORD" placeholder="Enter password" onChange={(e) => {
          setPostInputs({
            ...postInputs,
            password: e.target.value
          })
        }}/>
        </div>
     : <div>
       <LabelledInput type="email" label="EMAIL" placeholder="Enter your email" onChange={(e) => {
          setPostInputs({
            ...postInputs,
            email: e.target.value
          })
        }}/>
        <LabelledInput type="password" label="PASSWORD" placeholder="Enter password" onChange={(e) => {
          setPostInputs({
            ...postInputs,
            password: e.target.value
          })
        }}/>
        </div>
      }
        <button disabled={loading ? true : false} onClick={authFunction} type="button" className={`text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-3.5 me-2 my-4 w-full ${loading ? 'cursor-not-allowed' : ''}`}>{type==="signup"? "Sign up": "Sign in"}</button>
        {
          type==="signin"? (<button disabled={loading? true : false} className={`text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-3.5 me-2 my-4 w-full  ${loading ? 'cursor-not-allowed' : ''}`} onClick={demoLogin}>Demo Account</button>
          ):('')
        }
        </div>
      </div>
    </div>
    </>
  )
}
interface valuesType{
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({label, type, placeholder, onChange}: valuesType){
  return <div>
  <label className="pt-4 block mb-1 font-medium text-gray-900">{label}</label>
  <input onChange={onChange} type={type || 'text'} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}

export default Auth
