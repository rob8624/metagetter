
import './App.css';
import { Routes, Route } from 'react-router-dom';

//Pages
import SignIn from './pages/auth/signin';
import { SignupForm } from './pages/auth/registerForm';
import PasswordReset from './pages/auth/passwordReset';

//Components
import Header from './components/layout/header'; 
import Footer from './components/layout/footer'; 
import Hero from './components/layout/hero'
import Dashboard from './pages/app/dashboard';
import { Toaster } from "./components/ui/sonner"

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
          <header>
           <Header/>  
          </header>
          <div id="main-background" className="w-screen flex-grow bg-white dark:bg-black">
            <main id="main-wrapper" className="flex justify-center items-center w-5/6 mx-auto bg-transparent">
            {/* <AppContent /> */}
            <Routes>
                {/* Home route with the dropzone */}
                <Route path="/" element={<Hero/>} />
                
                {/* Sign in route */}
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/register" element={<SignupForm/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/password-reset/confirm/:uid/:token" element={<PasswordReset/>} />
              </Routes>
            </main>
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
