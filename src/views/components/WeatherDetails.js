import React from "react";

const WeatherDetails = () => {
	return (
		<div className="weather-details">
			<div className="degrees">
				<span className="number">12&#730;C</span>
				<br />
				<span className="feels-like">Feels like 12&#730;</span>
			</div>
			<div className="icon">
				<img src="logo192.png" alt="icon" />

				<br />
				<span>Cloudy</span>
			</div>
		</div>
	);
};

export default WeatherDetails;
