import React from "react";

const Tomorrow = (props) => {
	const nextDayWeatherDetails = props.nextDayWeatherDetails;
	const description = nextDayWeatherDetails ? nextDayWeatherDetails.weather[0].description : "";

	return (
		<div className="container">
			{/* If location denied */}
			{props.geolocationErrorMessage && (
				<div>{props.geolocationErrorMessage}, search places...</div>
			)}
			{/* If is loading */}
			{props.isLoading && <div>Loading...</div>}
			{/* If there is an error */}
			{props.error && <div>{props.error}...</div>}
			{/* If weather details are available */}
			{nextDayWeatherDetails && (
				<div>
					<div className="date-time">
						<span className="date">{props.nextDayDate}</span>
					</div>
					<div className="tomorrow-wrapper">
						<div>
							<div className="minmax-wrapper">
								<span className="max">
									Day {nextDayWeatherDetails && Math.round(Number(nextDayWeatherDetails.temp.max))}
									&#730;&#8593; -{" "}
								</span>
								<span className="min">
									Night{" "}
									{nextDayWeatherDetails && Math.round(Number(nextDayWeatherDetails.temp.min))}
									&#730;&#8595;
								</span>
							</div>
							<p className="description">{description[0].toUpperCase() + description.slice(1)}</p>
						</div>
						<div className="image">
							<div className="icon">
								<img
									src={`http://openweathermap.org/img/wn/${nextDayWeatherDetails.weather[0].icon}@4x.png`}
									alt="icon"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Tomorrow;
