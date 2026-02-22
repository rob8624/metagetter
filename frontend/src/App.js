
import './App.css';
import { useEffect, useContext, useState } from 'react';
import { preload } from 'react-dom';

//Router
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


//Pages
import SignIn from './pages/auth/signin';
import { SignupForm } from './pages/auth/registerForm';
import PasswordReset from './pages/auth/passwordReset';
import Upload from './pages/app/upload';
import Viewer from './pages/app/viewer';

//Components
import Header from './components/layout/header'; 
import Footer from './components/layout/footer'; 
import Hero from './components/layout/hero'
import Dashboard from './pages/app/dashboard';
import { Toaster } from "./components/ui/sonner"
import { PrivateRoutes } from './pages/auth/privateRoutes';
import FindOutMore from './components/custom/findOutMore';
import Faq from './pages/app/faq';


//Context 
import { MenuDataProvider } from './context/menuData';
import { UserDataProvider } from './context/userContext';
import { ThemeContext } from './context/darkModeContext'

//Settings
import { BACKGROUND_IMAGE_URL} from './siteSettings';


preload(`${BACKGROUND_IMAGE_URL}`, { as: 'image' });


function App() {
  const [showFindOutMore, setShowFindOutMore] = useState(false)
  const { setDarkMode } = useContext(ThemeContext)

 

 
 const { pathname } = useLocation()
 const isHomePage = pathname === '/'
 const isViewer = pathname.startsWith('/viewer')
 




 useEffect(() => {
  if (pathname === '/') {
  setDarkMode(false)
 }
 }, [pathname, setDarkMode])
 

const bgImageStyles = {
  backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
  // backgroundSize: `100% 100%`,  re-apply this for images to stop distortion of scale
  opacity: '0.9',
  backgroundRepeat: 'repeat'
}
 
 
return (
    <>
    <div id="site-wrapper" className='flex flex-col overflow-scroll min-h-screen sm:h-full w-full items-center sm:overflow-hidden dark:bg-black'
    style={isHomePage ? 
        bgImageStyles : {}}>
          
    <UserDataProvider >
     
        <MenuDataProvider>
        
          { !isViewer ? <Header/> : null}   
         
        
         
          <div className='flex-grow grid grid-cols-12 grid-rows-10 sm:w-4/5 overflow-hidden'>
            {/* <AppContent /> */}
            <Routes>
                {/* Home route with the dropzone */}
                <Route path="/" element={showFindOutMore ? 
                <FindOutMore setShowFindOutMore={setShowFindOutMore}/> : 
                <Hero setShowFindOutMore={setShowFindOutMore} />} />\
                                {/* Sign in route */}
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/register" element={<SignupForm/>} />
                <Route path="/questions" element={<Faq/>} />
                
                
                <Route path="/password-reset/confirm/:uid/:token" element={<PasswordReset/>} />

                {/* Dashboard routes */}
                  <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/upload" element={<Upload/>} />
                    <Route path="/viewer" element={<Viewer/>} />
                  </Route>
              </Routes>
            
            <Toaster />
          </div>
          
          <footer className='text-xs font-raleway bg-white'>
            <Footer />
          </footer>
          
        </MenuDataProvider>
      
    </UserDataProvider>
  </div>
    </>
  )

  // function AppContent() {
  //   const { loggedIn } = UseLoggedIn(); 
  
  //   return <>{loggedIn ? <div></div> : <div></div>}</>;
  // }

}

export default App;
