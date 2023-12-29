import { useState, useEffect } from 'react'
import './App.css';
import CoverImage from './components/cover_image/cover_image';
import CoverText from './components/cover_text/cover_text';

function App() {
  const [coverTextStarted, setCoverTextStarted] = useState(false)

  useEffect(() => {
    setDelay(1500).then(() => setCoverTextStarted(true))
  }, [])

  const setDelay = delay => new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
  
  const sendData = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': process.env.REACT_APP_BACKEND_SECRET_TOKEN || "authorization_token"
      },
      body: JSON.stringify(data)
    };
    fetch(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000", requestOptions).then(response => console.log(response))
  }


  return (
    <div className="App">
      <div className='cover-image-container'>
        <CoverImage/>
      </div>
      <div className="content">
        {
          coverTextStarted && <CoverText onDone={(data) => sendData(data)}/>
        }
      </div>
    </div>
  );
}

export default App;
