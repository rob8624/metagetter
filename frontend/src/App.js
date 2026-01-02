
import './App.css';
import { useEffect, useContext, useState } from 'react';

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


//Context 
import { MenuDataProvider } from './context/menuData';
import { UserDataProvider } from './context/userContext';
import { ThemeContext } from './context/darkModeContext'

//Settings
import { BACKGROUND_IMAGE_URL } from './siteSettings';





function App() {
  const [showFindOutMore, setShowFindOutMore] = useState(false)
  const { setDarkMode } = useContext(ThemeContext)

 

 
 const { pathname } = useLocation()
 const isHomePage = pathname === '/'

 useEffect(() => {
  if (pathname === '/') {
  setDarkMode(false)
 }
 }, [pathname, setDarkMode])
 


 
 
return (
    <>
    <div id="site-wrapper" className='flex flex-col max-h-dvh min-h-dvh max-w-screen items-center dark:bg-black bg-contain'
    style={isHomePage ? { 
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`
      } : {}}>
    <UserDataProvider >
     
        <MenuDataProvider>
        
             <Header/>
          
          <div id="main-background" className="overflow-auto  min-h-0 max-w-screen flex-grow bg-transparent
           dark:bg-black  
           sm:w-5/6 rounded-lg relative no-scrollbar ">
          
            {/* <AppContent /> */}
            <Routes>
                {/* Home route with the dropzone */}
                <Route path="/" element={showFindOutMore ? 
                <FindOutMore setShowFindOutMore={setShowFindOutMore}/> : 
                <Hero setShowFindOutMore={setShowFindOutMore} />} />\
                
                {/* Sign in route */}
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/register" element={<SignupForm/>} />
                <Route path="/dashboard" element={<Dashboard/>}/>
                
                <Route path="/password-reset/confirm/:uid/:token" element={<PasswordReset/>} />

                {/* Dashboard routes */}
                  <Route element={<PrivateRoutes />}>
                    
                    <Route path="/upload" element={<Upload/>} />
                    <Route path="/viewer" element={<Viewer/>} />
                  </Route>
              </Routes>
            
            <Toaster />
            </div>
          
          <footer>
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
