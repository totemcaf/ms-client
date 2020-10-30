import './App.css';
import 'typeface-roboto';
import MSAppBar from './components/MSAppBar';
import MwClient from './client/ms'

// The following URL should be moved to configuration
const mwClient = new MwClient("http://ec2-3-87-195-146.compute-1.amazonaws.com:8080")

function App() {
  return (
    <div className="App">
        <MSAppBar client={ mwClient }/>
    </div>
  );
}

export default App;
