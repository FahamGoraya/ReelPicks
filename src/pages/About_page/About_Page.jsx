					<div className="about-next">
						<h2>What's Next?</h2>
						<p>
							In the future, ReelPicks aims to analyze your interactions and feedback to continuously improve recommendations. Whether you love blockbusters, hidden gems, or binge-worthy series, our AI will adapt to your viewing habits for even smarter suggestions.
						</p>
					</div>
import React, { useEffect } from "react";
import Header_move from "../../components/Home-page-components/Header_move";
import "./About_Page.css";


const About_Page = () => {
	useEffect(() => {
		document.body.classList.add("my-dark-bg");
		return () => {
			document.body.classList.remove("my-dark-bg");
		};
	}, []);

	return (
		<>
			<Header_move />
			<div className="about-container">
				<div className="about-content">
					{/* Logo at the top, matching header */}
					<div className="about-logo">
						<span className="logo-text">
							<span className="logo-gi">REEL</span>
							<span className="logo-movies">PICKS</span>
						</span>
					</div>
					
					<p className="about-description">
						<b>ReelPicks</b> is an AI-powered movie recommendation platform designed to help you discover your next favorite film or TV show. Leveraging advanced algorithms and a vast database, ReelPicks delivers personalized suggestions tailored to your unique tastes.
					</p>
					<div className="about-features">
						<h2>Features</h2>
						<ul>
							<li>Smart movie & TV recommendations</li>
							<li>Powerful search for titles, genres, and more</li>
							<li>AI-driven suggestions based on your preferences</li>
							<li>User reviews and ratings</li>
							<li>Trending, top, and upcoming releases</li>
						</ul>
					</div>
					<div className="about-tech">
						<h2>How It Works</h2>
						<p>
							ReelPicks recommends movies and TV shows based on your saved favourites or by finding similar titles to a movie you select. Simply add movies to your favourites to get personalized suggestions, or explore recommendations for any movie you like!
						</p>
					</div>
					<div className="about-next">
						<h2>What's Next?</h2>
						<p>
							In the future, ReelPicks aims to analyze your interactions and feedback to continuously improve recommendations. Whether you love blockbusters, hidden gems, or binge-worthy series, our AI will adapt to your viewing habits for even smarter suggestions.
						</p>
					</div>
					<div className="about-footer">
						<p>
							Made with <span className="about-heart">♥</span> by movie lovers, for movie lovers.<br />
							<span className="about-small">© {new Date().getFullYear()} ReelPicks. All rights reserved.</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default About_Page;
