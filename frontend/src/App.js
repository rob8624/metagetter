
import './App.css';

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
          <div>Upload dropzone here</div>
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
