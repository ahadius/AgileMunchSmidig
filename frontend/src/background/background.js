
import '../App.css';
import './background.css'
import React, {useEffect, useState} from 'react';

import LOGO1 from './images/image1.jpg'
import LOGO2 from './images/image2.jpg'
import LOGO3 from './images/image3.jpg'
import LOGO4 from './images/image4.jpg'
import LOGO5 from './images/image5.jpg'
import LOGO6 from './images/image6.jpg'
import LOGO7 from './images/image7.jpg'
import LOGO8 from './images/image8.jpg'
import LOGO9 from './images/image9.jpg'
import LOGO10 from './images/image10.jpg'
import LOGO11 from './images/image11.jpg'
import LOGO12 from './images/image12.jpeg'
import LOGO13 from './images/image13.jpg'
import LOGO14 from './images/image14.jpg'
import LOGO15 from './images/image15.jpg'
import LOGO16 from './images/image16.jpg'
import LOGO17 from './images/image17.jpg'
import LOGO18 from './images/image18.jpg'
import LOGO19 from './images/image19.jpg'
import LOGO20 from './images/image20.jpg'




function App() {
 /* useEffect(() => {
    const images = document.querySelectorAll('.animated-image');

    let index = 0;
    const animateImages = () => {
      images[index].classList.add('animate');
      index = (index + 1) % images.length;
    };

    const interval = setInterval(animateImages, 1000); // Juster hastigheten etter behov

    return () => clearInterval(interval);
  }, []);*/


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const images = document.querySelectorAll('.animated-image');

    const animateImages = () => {
      images[currentIndex].classList.remove('animate');

      let nextIndex = (currentIndex + 1) % images.length;
      if (nextIndex === 0) {
        // Start animasjonen fra toppen hvis vi er tilbake til første bilde
        images.forEach((image) => image.classList.remove('animate'));
        nextIndex = 0;
      }

      images[nextIndex].classList.add('animate');
      setCurrentIndex(nextIndex);
    };

    const interval = setInterval(animateImages, 5000); // Juster hastigheten etter behov

    return () => clearInterval(interval);
  }, [currentIndex]);







  return (
    <div className="App">
    <div className="header">MUNCH SPILL</div>

      <img src={LOGO1} alt="" className="animated-image"/>
      <img src={LOGO2} alt="" className="animated-image"/>
      <img src={LOGO3} alt="" className="animated-image"/>
      <img src={LOGO4} alt="" className="animated-image"/>
      <img src={LOGO5} alt="" className="animated-image"/>
      <img src={LOGO6} alt="" className="animated-image"/>  
      <img src={LOGO7} alt="" className="animated-image"/>
      <img src={LOGO8} alt="" className="animated-image"/>
      <img src={LOGO9} alt="" className="animated-image"/>
      <img src={LOGO10} alt="" className="animated-image"/>
      <img src={LOGO11} alt="" className="animated-image"/>
      <img src={LOGO12} alt="" className="animated-image"/>
      <img src={LOGO13} alt="" className="animated-image"/>
      <img src={LOGO14} alt="" className="animated-image"/>
      <img src={LOGO15} alt="" className="animated-image"/>
      <img src={LOGO16} alt="" className="animated-image"/>
      <img src={LOGO17} alt="" className="animated-image"/>
      <img src={LOGO18} alt="" className="animated-image"/>
      <img src={LOGO19} alt="" className="animated-image"/>
      <img src={LOGO20} alt="" className="animated-image"/>
      



    </div>
  );
}

export default App;




