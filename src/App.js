import { useState, useEffect } from 'react'
import './App.css';
import CoverImage from './components/cover_image/cover_image';
import CoverText from './components/cover_text/cover_text';

function App() {
  const [coverImageFade, setCoverImageFade] = useState(true)
  const [coverTextStarted, setCoverTextStarted] = useState(false)

  useEffect(() => {
    setDelay(5000).then(() => setCoverTextStarted(true))
  }, [])

  const setDelay = delay => new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
  
  
  return (
    <div className="App">
      <div className='cover-image-container'>
        <CoverImage fade={coverImageFade}/>
      </div>
      <div className="content">
        {
          coverTextStarted && <CoverText started={coverTextStarted}/>
        }
      </div>
    </div>
  );
}

export default App;
