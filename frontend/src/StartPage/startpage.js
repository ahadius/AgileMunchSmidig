import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';
function StartingPage() {
	const navigate = useNavigate();
	const [clicked, setClicked] = useState(false);
	const [startVisible, setStartVisible] = useState(false);
	const [gameMode, setGameMode] = useState('');

	const DrawingFuction = () => {
		navigate('/board');
		console.log('hello');
	};

	const handleClick = (mode = true) => {
		setClicked(mode);
		if (typeof mode === 'string') {
			setGameMode(mode);
			setStartVisible(true);
		} else {
			setStartVisible(false);
		}
	};
	const handleBack = () => {
		setClicked(false);
		setStartVisible(false);
		setGameMode('');
	};
	return (
		<div className="Main">
			<div
				className={
					clicked ? 'container clicked' : 'container'
				}>
				<h3 className="button1-title">SINGLEPLAYER</h3>
				<button
					className="button1"
					onClick={handleClick}></button>
				<h3 className="button2-title">MULTIPLAYER</h3>
				<button className="button2"></button>
				{clicked && (
					<>
						<button
							className="new-button1"
							onClick={() =>
								handleClick(
									'transparent gamemode, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
								)
							}>
							Transparent Mode
						</button>
						<button
							className="new-button2"
							onClick={() =>
								handleClick(
									'normal gamemode, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
								)
							}>
							Normal Mode
						</button>
						<button
							className="new-button3"
							onClick={() =>
								handleClick(
									'competitive gamemode, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
								)
							}>
							Competitive Mode
						</button>
						<button
							className="back-button"
							onClick={handleBack}></button>
					</>
				)}
				{startVisible && (
					<button
						className="start-button"
						onClick={DrawingFuction}>
						Start
					</button>
				)}
			</div>
			{gameMode && (
				<h2 className="selectedGameMode">
					In the {gameMode}
				</h2>
			)}
		</div>
	);
}
export default StartingPage;
