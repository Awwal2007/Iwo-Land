
import { BrowserRouter, Route, Routes, } from 'react-router-dom';

import './App.css'
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import IwoLand from './pages/IwoLand.jsx';
import Blogs from './pages/Blogs.jsx';
import SingleBlog from './components/SingleBlog.jsx';
import Gallery from './pages/Gallery.jsx';

function App() {

  return (
    <>
     <BrowserRouter>
     <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/iwo-land' element={<IwoLand />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/singleblog/:id' element={<SingleBlog />} />
      </Routes>
      <Footer />
     </BrowserRouter>
    </>
  )
}

export default App
