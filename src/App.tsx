import './App.scss';
import api from './services/baseApiServices';
import Cinema from './components/Cinema';
import Movie from './components/Movie';
import LineMovie from './components/LineMovie';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => {
      const res = await api.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap");

      setData(res.data);
    })();
  }, []);

  return (
    <>
      <div className='App'>
        <Cinema data={data} />
        <Movie data={data} />
      </div>
      <LineMovie data={data} /></>
  );
}

export default App;
