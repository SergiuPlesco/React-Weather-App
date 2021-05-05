import { useEffect, useState } from "react";
import moment from "moment-timezone";

const Today = (props) => {
	const weatherDetails = props.weatherDetails;
	const [currentDate, setCurrentDate] = useState(
		moment.tz(props.timezone).format("DD MMMM, HH:mm:ss")
	);

	/**
	 * Update the clock every second
	 */
	useEffect(() => {
		const timerID = setInterval(() => {
			setCurrentDate(moment.tz(props.timezone).format("DD MMMM, HH:mm:ss"));
		}, 1000);
		return () => {
			clearInterval(timerID);
		};
	}, [props.timezone]);

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
			{weatherDetails && (
				<div className="conditions">
					<div className="date-time">
						<p className="date">{currentDate}</p>
					</div>

					<div className="minmax-wrapper">
						<span className="max">
							Day {weatherDetails && Math.round(Number(weatherDetails.daily[0].temp.max))}
							&#730;&#8593; -{" "}
						</span>
						<span className="min">
							Night {weatherDetails && Math.round(Number(weatherDetails.daily[0].temp.min))}
							&#730;&#8595;
						</span>
					</div>

					<div className="weather-details">
						<div className="degrees">
							<p className="number">
								{weatherDetails && Math.round(Number(weatherDetails.current.temp))}
								&#730;C
							</p>

							<p className="feels-like">
								Feels like {weatherDetails && Math.round(Number(weatherDetails.current.feels_like))}
								&#730;
							</p>
						</div>
						<div className="image">
							<div className="icon">
								<img
									src={`https://openweathermap.org/img/wn/${
										weatherDetails && weatherDetails.current.weather[0].icon
									}@4x.png`}
									alt="icon"
								/>
							</div>

							<p className="description">
								{weatherDetails.current.weather[0].description[0].toUpperCase() +
									weatherDetails.current.weather[0].description.slice(1)}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Today;
