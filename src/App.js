import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Realtime from './components/Realtime';
import Optionview from './components/Optionview';

function App() {
  return (
    <div className="App">
      <Header/>
      <Realtime/>
      <Optionview/>
      
    </div>
  );
}

export default App;
