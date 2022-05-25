import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import Home from '../pages/Home'
import Lesson from '../pages/Lesson'
import LessonDetail from '../pages/LessonDetail'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function Body() {
  return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/courses/:courseId/lessons/" element={<Lesson />}/>
              <Route exact path="/lessons/:lessonId/" element={<LessonDetail />}/>
              <Route exact path="/login/" element={<Login />}/>
              <Route exact path="/register/" element={<Register/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
  )
}
