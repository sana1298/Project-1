import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Error from'./components/Error';
import Home from './components/Home';
import Protect from './components/Protect';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimeDetails from './components/AnimeDetails';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <LoginForm />} />
          <Route path="/register" element={ <RegisterForm />} />
          <Route path="/home" element={ <Protect />}>
          <Route index element={ <Home />} />
          </Route>
          <Route path="/home/anime/:id" element={ <AnimeDetails/> } />
          <Route path="*" element={ <Error />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
