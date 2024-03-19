import './App.css';
import TwitterUsers from './Components/TwitterUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
     <TwitterUsers/>
     <ToastContainer />
    </div>
  );
}

export default App;
