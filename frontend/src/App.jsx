import { Route, Routes, BrowserRouter } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Main from './Pages/Main';
import AddUser from './Pages/AddUser';
import AddPhotos from './Pages/AddPhotos';
import NotFound from './Pages/NotFound';

function App() {

  return (
    <BrowserRouter>
      <div className='h-full min-h-[98vh]'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/adduser' element={ <AddUser/> } />
          <Route path='/addPhotos/:id' element={ <AddPhotos/> }/>
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
