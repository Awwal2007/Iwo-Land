
import { BrowserRouter, Route, Routes, useLocation, } from 'react-router-dom';
import {Toaster} from 'sonner'

import './App.css'
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import IwoLand from './pages/IwoLand.jsx';
import Blogs from './pages/Blogs.jsx';
import SingleBlog from './components/SingleBlog.jsx';
import Gallery from './pages/Gallery.jsx';
import Admin from './pages/Admin.jsx';
import { NewsProvider } from './contexts/NewsProvider.jsx';
import AdminSignup from './pages/AdminSignup.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import NotFound from './components/NotFound.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = [
    '/admin',
    '/admin-signup',
    '/admin-login',
  ];
  const hideFooterRoutes = [
    '/admin',
    '/admin-signup',
    '/admin-login',
  ];

  const shouldHideFooter = hideFooterRoutes.some((route) => {
    if (route.includes(':')) {
      // Convert "/admin-message/:userId" to a regex like /^\/admin-message\/[^\/]+$/
      const pattern = new RegExp('^' + route.replace(/:[^/]+/g, '[^/]+') + '$');
      return pattern.test(location.pathname);
    }
    return route === location.pathname;
  });

  const shouldHideHeader = hideHeaderRoutes.some((route) => {
    if (route.includes(':')) {
      // Convert "/admin-message/:userId" to a regex like /^\/admin-message\/[^\/]+$/
      const pattern = new RegExp('^' + route.replace(/:[^/]+/g, '[^/]+') + '$');
      return pattern.test(location.pathname);
    }
    return route === location.pathname;
  });
    return (
      <>
        {!shouldHideHeader && <Header />}

      <AuthProvider>
         <NewsProvider>
         {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
            {/* <Route path='/iwo-land' element={<IwoLand />} /> */}
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/singleblog/:id' element={<SingleBlog />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-signup' element={<AdminSignup />} />
            
            <Route element={<ProtectedRoutes />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
            
          </Routes>
          {/* <Footer /> */}

          <Toaster
          position="top-right"
          richColors
          closeButton
          visibleToasts={1}
          />
          {!shouldHideFooter && <Footer />}
        </NewsProvider>   
      </AuthProvider>  
      </>
    );
};

function App() {

  return (
    <>
     <BrowserRouter>
        <ScrollToTop />

        <AppContent/>
     </BrowserRouter>
    </>
  )
}

export default App
