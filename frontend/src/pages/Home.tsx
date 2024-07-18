import { Link } from "react-router-dom"
import img from '../assets/home.webp'
import Footer from "./Footer"
const Home = () => {
  return (
    <div>
      <div className="top h-full w-full">
        <div className="border-b flex justify-between px-10 py-4" >
            <div className="flex flex-col justify-center font-bold text-2xl">QuillVibes</div>
            <div className="flex justify-between">
            <div><Link to={`/signin`} type="button" className="mr-8 focus:outline-none text-white font-medium rounded-lg text-sm px-2 md:px-5 py-2.5 me-2 mb-2 bg-black hover:bg-white hover:border-2 hover:border-black hover:text-black">Login/Sign-up<i className="fa-solid fa-arrow-right ml-2"></i></Link></div>
            </div>
        </div>
      </div>
      <div className="h-[80vh] flex flex-col justify-center items-center gap-2">
        <div className="text-3xl md:text-5xl font-extrabold px-7 text-center">The best stories start here</div>
        <div className="text-xl w-full md:w-[40%] text-slate-400 text-center">A place where words matter. Read, write, and connect with the stories that matter most to you.</div>
        <img className="sm:w-full md:w-[35vw] m-6" src={img} alt="" />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
