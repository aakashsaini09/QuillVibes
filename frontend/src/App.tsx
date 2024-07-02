import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import Home from './pages/Home'
import UserBlogs from './pages/UserBlogs'
import { RecoilRoot } from 'recoil'
import AIgenerated from './pages/AIgenerated'
// import dotenv from 'dotenv';
// dotenv.config();
function App() {
  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/publish' element={<Publish/>}/>
        <Route path='/userBlogs' element={<UserBlogs/>}/>
        <Route path='/ai' element={<AIgenerated/>}/>
      </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
