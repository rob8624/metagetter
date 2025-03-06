
import './App.css';
import { Button } from './components/ui/button'; 
import Header from './components/layout/header'; 
import Footer from './components/layout/footer'; 

function App() {
  return (
    <>
      <header>
        <Header/>  
      </header>
    
        <main id="main-wrapper" className="flex justify-center items-center bg-white w-5/6 mx-auto grow ">
          <Button className="bg-transparent text-black border border-black min-w-80">roberlickchangedMe</Button>
        </main>
    
      <footer>
        <Footer />
      </footer>
    </>
      
  )
}

export default App;
