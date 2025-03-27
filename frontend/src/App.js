
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import { SignupForm } from './pages/auth/registerForm';
import Header from './components/layout/header'; 
import Footer from './components/layout/footer'; 
import Hero from './components/layout/hero'
import Dashboard from './pages/app/dashboard';
import { Toaster } from "./components/ui/sonner"

import { MenuDataProvider } from './context/menuData';

import { ThemeContextProvider } from './context/darkModeContext'


function App() {

  

  return (
    <>
    <ThemeContextProvider >
    <MenuDataProvider>
      <header>
        <Header/>  
      </header>
       <div id="main-background" className="w-screen flex-grow bg-white dark:bg-black">
        <main id="main-wrapper" className="flex justify-center items-center w-5/6 mx-auto bg-transparent">
        <Routes>
            {/* Home route with the dropzone */}
            <Route path="/" element={<Hero/>} />
            {/* Sign in route */}
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/register" element={<SignupForm/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </main>
        <Toaster />
      </div>
      <footer>
        <Footer />
      </footer>
    </MenuDataProvider>
    </ThemeContextProvider>
    </>
    
      
  )
}

export default App;
