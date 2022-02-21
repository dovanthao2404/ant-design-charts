import './App.scss';
import api from './services/baseApiServices';
import Cinema from './components/Cinema';
import Movie from './components/Movie';
import LineMovie from './components/LineMovie';

function App() {


  return (
    <>
      <div className='App'>
        <Cinema />
        <Movie />
      </div>
      <LineMovie /></>
  );
}

export default App;
