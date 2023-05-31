import logo from './munch_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="h1">kunst spill</h1>
      <header className="munch-header">
        <img src={logo} className="munch-logo" alt="logo" />
      </header>
      <div className="whiteBox"></div>
    </div>
    
  );
}

export default App;