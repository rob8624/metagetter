import logo from './logo.svg';
import './App.css';
import { Button } from './components/ui/button'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>srpp.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reactasdasdasd
        </a>
        
        <Button className="bg-blue-100 text-white">Click Me</Button>
      </header>
    </div>
  );
}

export default App;
