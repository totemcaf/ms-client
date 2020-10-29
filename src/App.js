import './App.css';
import 'typeface-roboto';
import MSAppBar from './components/MSAppBar';
import MwClient from './client/mw'

const mwClient = new MwClient("http://localhost:8080")


function App() {
  return (
    <div className="App">
        <MSAppBar client={ mwClient }/>
    </div>
  );
}

export default App;
