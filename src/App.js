import { Route, Routes } from 'react-router-dom';
import './App.css';
import Slider from './components/slider';
import Home from './components/Home';
import Series from './components/Series';
import Individual from './components/sub/Individual';
import UserContext from './context/UserContext';
import Watchlist from './components/sub/watchlist';
import Sidebar from './components/SideBar';


function App() {
  return (
    <div className="App">
      <Sidebar/>
      <UserContext>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/series' element={<Series/>} />
      <Route path='/watch/:id' element={<Individual/>}/>
      <Route path='/watchlist' element={<Watchlist/>}/>
     </Routes>
      </UserContext>

    </div>
  );
}

/*sidebar
movies and series sections
search
*/

export default App;
