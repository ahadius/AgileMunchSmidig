/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import './startpage.css';

function StartingPage() {
	const navigate = useNavigate();

	const goToSinglePlayer = () => {
		navigate('/board');
	};

	const goToMultiplayer = () => {
		navigate('/multi');
	};

	return (
		<div className="Main">
			<div className="container">
				<h3 className="button1-title">SINGLEPLAYER</h3>
				<button className="button1" onClick={goToSinglePlayer}></button>
				<h3 className="button2-title">MULTIPLAYER</h3>
				<button className="button2" onClick={goToMultiplayer}></button>
			</div>
		</div>
	);
}

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




export default StartingPage;*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './startpage.css';
import LOGO1 from './images/image1.jpg';
import LOGO2 from './images/image2.jpg';
import LOGO3 from './images/image3.jpg';
import LOGO4 from './images/image4.jpg';
import LOGO5 from './images/image5.jpg';
import LOGO6 from './images/image6.jpg';
import LOGO7 from './images/image7.jpg';
import LOGO8 from './images/image8.jpg';
import LOGO9 from './images/image9.jpg';
import LOGO10 from './images/image10.jpg';
import LOGO11 from './images/image11.jpg';
import LOGO12 from './images/image12.jpeg';
import LOGO13 from './images/image13.jpg';
import LOGO14 from './images/image14.jpg';
import LOGO15 from './images/image15.jpg';
import LOGO16 from './images/image16.jpg';
import LOGO17 from './images/image17.jpg';
import LOGO18 from './images/image18.jpg';
import LOGO19 from './images/image19.jpg';
import LOGO20 from './images/image20.jpg';

function App() {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [imagesLoaded, setImagesLoaded] = useState(false);

	useEffect(() => {
		const imgElements = document.querySelectorAll(
			'.animated-image'
		);

		let loadedImagesCount = 0;

		imgElements.forEach(imgElement => {
			const img = new Image();
			img.src = imgElement.src;

			img.onload = () => {
				loadedImagesCount++;

				if (loadedImagesCount === imgElements.length) {
					setImagesLoaded(true);
				}
			};
		});
	}, []);

	useEffect(() => {
		if (!imagesLoaded) {
			return;
		}

		const images = document.querySelectorAll(
			'.animated-image'
		);

		const animateImages = () => {
			images[currentIndex].classList.remove('animate');

			let nextIndex = (currentIndex + 1) % images.length;
			if (nextIndex === 0) {
				images.forEach(image =>
					image.classList.remove('animate')
				);
				nextIndex = 0;
			}

			images[nextIndex].classList.add('animate');
			setCurrentIndex(nextIndex);
		};

		const interval = setInterval(animateImages, 10000);

		return () => clearInterval(interval);
	}, [imagesLoaded, currentIndex]);

	const goToSinglePlayer = () => {
		navigate('./board');
	};

	const goToMultiplayer = () => {
		navigate('./multiplayerBord');
	};

	return (
		<div className="Main">
			<div className="background-images">
				<img
					src={LOGO1}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO2}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO3}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO4}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO5}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO6}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO7}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO8}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO9}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO10}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO11}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO12}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO13}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO14}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO15}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO16}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO17}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO18}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO19}
					alt=""
					className="animated-image"
				/>
				<img
					src={LOGO20}
					alt=""
					className="animated-image"
				/>
			</div>
			<div className="container">
				<h3 className="button1-title">SINGLEPLAYER</h3>
				<button
					className="button1"
					onClick={goToSinglePlayer}></button>
				<h3 className="button2-title">MULTIPLAYER</h3>
				<button
					className="button2"
					onClick={goToMultiplayer}></button>
			</div>
		</div>
	);
}

export default App;
