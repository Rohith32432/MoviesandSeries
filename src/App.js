import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Series from './components/Series';
import Individual from './components/sub/Individual';
import UserContext from './context/UserContext';
import Watchlist from './components/sub/watchlist';
import Sidebar from './components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SeriesInd from './components/sub/SeriesInd';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


function App() {
  return (
    <div className="App">
      <Sidebar/>

      <UserContext>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/series' element={<Series/>} />
      <Route path='/watch/:id' element={<Individual/>}/>
      <Route path='/tv/:id' element={<SeriesInd/>}/>
      <Route path='/watchlist' element={<Watchlist/>}/>
        <Route element={<Login/>} path='/login'></Route>
        <Route element={<Register/>} path='/reg'></Route>
      
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
