import { Route, Routes } from 'react-router-dom';
import './App.css';
import Slider from './components/slider';
import Home from './components/Home';
import Series from './components/Series';


function App() {
  return (
    <div className="App">
    
     <Routes>
      <Route path='/' element={<Slider/>}/>
      <Route path='/home' element={<Home/>} />
      <Route path='/series' element={<Series/>} />
     </Routes>

    </div>
  );
}

/*sidebar
movies and series sections
search
*/

export default App;
