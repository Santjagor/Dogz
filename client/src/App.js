import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { addAllDogs, addTemperaments } from './redux/actions';
import { connect } from 'react-redux';
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import { useEffect } from 'react';
import Overlay from './components/Overlay/Overlay';

function App({ addAllDogs, addTemperaments, temperaments }) {
  const navigate = useNavigate()
  const access = () => {
    navigate('/home')
  }

  useEffect(() => {
    addAllDogs()
    addTemperaments()
  }, [])

  let location = useLocation()
  return (
    <div className='App'>
      {location.pathname !== '/' && <Navbar></Navbar>}
      {location.pathname !== '/' && <Overlay></Overlay>}
      <Routes>
        <Route path='/' element={<Landing access={access}></Landing>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/detail/:id' element={<Detail></Detail>}></Route>
        <Route path='/form' element={<Form></Form>}></Route>
      </Routes>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    addAllDogs: function () {
      dispatch(addAllDogs())
    },
    addTemperaments: function () {
      dispatch(addTemperaments())
    }
  }
}

export function mapStateToProps(state) {
  return {
    dogs: state.dogs,
    temperaments: state.temperaments
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);