
import './App.css';
import { Routes, Route } from 'react-router-dom';

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


//Context 
import { MenuDataProvider } from './context/menuData';
import { UserDataProvider } from './context/userContext';
import { ThemeContextProvider } from './context/darkModeContext'




function App() {


 return (
    <>
    <UserDataProvider >
      <ThemeContextProvider >
        <MenuDataProvider>
        
             <Header/>
          
          <div id="main-background" className="overflow-auto w-screen min-h-0 flex-grow bg-white
           dark:bg-black  
           sm:w-5/6 mx-auto bg-transparent  rounded-lg relative">
          
            {/* <AppContent /> */}
            <Routes>
                {/* Home route with the dropzone */}
                <Route path="/" element={<Hero/>} />
                
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
      </ThemeContextProvider>
    </UserDataProvider>

    </>
  )

  // function AppContent() {
  //   const { loggedIn } = UseLoggedIn(); 
  
  //   return <>{loggedIn ? <div></div> : <div></div>}</>;
  // }

}

export default App;
