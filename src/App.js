import { Route, Routes } from 'react-router-dom';
import './App.css';
import Slider from './components/slider';
import Home from './components/Home';
import Series from './components/Series';
import Individual from './components/sub/Individual';


function App() {
  return (
    <div className="App">
    
     <Routes>
      <Route path='/' element={<Slider/>}/>
      <Route path='/home' element={<Home/>} />
      <Route path='/series' element={<Series/>} />
      <Route path='/watch/:id' element={<Individual/>}/>
     </Routes>

    </div>
  );
}

/*sidebar
movies and series sections
search
*/

export default App;
