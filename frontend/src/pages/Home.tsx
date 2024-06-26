import { Link } from "react-router-dom"
import img from '../assets/home.webp'
import Footer from "./Footer"
const Home = () => {
  return (
    <div>
      <div className="top h-full w-full">
        <div className="border-b flex justify-between px-10 py-4" >
            <div className="flex flex-col justify-center font-bold text-2xl">Medium</div>
            <div className="flex justify-between">
            <div><Link to={`/signup`} type="button" className="mr-8 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-black hover:bg-white hover:border-2 hover:border-black hover:text-black">Login/Sign-up<i className="fa-solid fa-arrow-right ml-2"></i></Link></div>
            </div>
        </div>
      </div>
      <div className="main h-[80vh] flex flex-col justify-center items-center gap-2">
        <div className="text-5xl font-extrabold">The best stories start here</div>
        <div className="text-xl w-[40%] text-slate-400 text-center">A place where words matter. Read, write, and connect with the stories that matter most to you.</div>
        <img className="w-[35vw] m-6" src={img} alt="" />
      </div>
      {/* <div className="footer bg-black h-20 w-full absolute bottom-0">
        <div className="h-full flex justify-center items-center">
            <div className="github">
                <button type="button" className="text-gray-900 bg-white border font-medium rounded text-sm px-5 py-2.5 me-2 hover:border hover:border-white hover:text-white hover:bg-black"><i className="fa-brands fa-github mr-2"></i><a href="https://github.com/aakashsaini09" target="_blank">Github</a></button>
            </div>
            <div className="github">
                <button type="button" className="text-gray-900 bg-white border font-medium rounded text-sm px-5 py-2.5 me-2 hover:border hover:border-white hover:text-white hover:bg-black"><i className="fa-brands fa-twitter mr-2"></i><a href="https://x.com/__aakashsaini" target="_blank">Twitter</a></button>
            </div>
            <div className="Linkedin">
                <button type="button" className="text-gray-900 bg-white border font-medium rounded text-sm px-5 py-2.5 me-2 hover:border hover:border-white hover:text-white hover:bg-black"><i className="fa-brands fa-linkedin-in mr-2"></i><a href="https://www.linkedin.com/in/-aakashsaini/" target="_blank">Linkedin</a></button>
            </div>
        </div>
      </div> */}
      <Footer/>
    </div>
  )
}

export default Home
