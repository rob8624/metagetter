
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import { SignupForm } from './pages/auth/registerForm';
import Header from './components/layout/header'; 
import Footer from './components/layout/footer'; 
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
    
        <main id="main-wrapper" className="flex justify-center items-center bg-white w-5/6 mx-auto grow ">
        <Routes>
            {/* Home route with the dropzone */}
            <Route path="/" element={<div>Upload dropzone here</div>} />
            {/* Sign in route */}
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/register" element={<SignupForm/>} />
          </Routes>
        </main>
    
      <footer>
        <Footer />
      </footer>
    </MenuDataProvider>
    </ThemeContextProvider>
    </>
    
      
  )
}

export default App;
