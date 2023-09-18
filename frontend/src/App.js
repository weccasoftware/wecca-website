import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import About from './components/about/About';
import Sponsors from './components/sponsors/Sponsors';
import Contact from './components/contact/Contact';
import Calendar from './components/calendar/Calendar';
import Signup from './components/login/Signup';

function App({children}) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}></Route>
            <Route path='about' element={<About/>}></Route>
            <Route path='calendar' element={<Calendar/>}></Route>
            <Route path='sponsors' element={<Sponsors/>}></Route>
            <Route path='contact' element={<Contact/>}></Route>
            <Route path='signup' element={<Signup/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
