import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import About from './components/about/About';
import Sponsors from './components/sponsors/Sponsors';
import Calendar from './components/calendar/Calendar';
import Contact from './components/contact/Contact';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'

function App({children}) {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
      {/** <header className="App-header">
        Hi
      </header> */}
      <h1>WECCA Website</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}></Route>
            <Route path='about' element={<About/>}></Route>
            <Route path='sponsors' element={<Sponsors/>}></Route>
            <Route path='calendar' element={<Calendar/>}></Route>
            <Route path='contact' element={<Contact/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
