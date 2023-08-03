import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { addAllDogs } from './redux/actions';
import { connect } from 'react-redux';
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import { useEffect } from 'react';

function App({ allDogs, addAllDogs }) {
  const navigate = useNavigate()
  const access = () => {
    navigate('/home')
  }

  useEffect(() => {
    addAllDogs()
  }, [])

  let location = useLocation()
  return (
    <div className='App'>
      {location.pathname !== '/' && <Navbar></Navbar>}
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
    }
  }
}

export function mapStateToProps(state) {
  return {
    allDogs: state.allDogs
  }
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);