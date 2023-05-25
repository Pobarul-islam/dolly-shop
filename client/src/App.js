
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Category from './Pages/Category';
import Policy from './Pages/Policy';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/category' element={<Category/>} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
