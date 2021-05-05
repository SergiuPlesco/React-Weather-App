import React from "react";
import moment from "moment-timezone";

const Days = (props) => {
	const dailyForecast = props.dailyForecast;

	const toggleDetails = (e) => {
		e.target.nextElementSibling.classList.toggle("show");
	};
	return (
		<div className="container">
			{props.geolocationErrorMessage && (
				<div>{props.geolocationErrorMessage}, search places...</div>
			)}
			{props.isLoading && <div>Loading...</div>}
			{props.error && <div>{props.error}...</div>}
			{dailyForecast &&
				dailyForecast.map((day, index) => {
					return (
						<div className="daily-forecast" key={index}>
							<div className="summary" onClick={(e) => toggleDetails(e)}>
								<div className="summary-title">
									<p className="weekday">
										{index === 0
											? "Today"
											: `${moment().tz(props.timezone).add(index, "days").format("dddd, DD MMMM")}`}
									</p>
									<p className="weekday-description">
										{dailyForecast &&
											day.weather[0].description.charAt(0).toUpperCase() +
												day.weather[0].description.slice(1)}
									</p>
								</div>
								<div className="summary-icon">
									<img
										src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
										alt="icon"
									/>
									<div className="summary-temp">
										<p>{Math.round(Number(day.temp.max))}&#730;</p>
										<p>{Math.round(Number(day.temp.min))}&#730;</p>
									</div>
								</div>
							</div>
							<div className="details">
								<table>
									<tbody>
										<tr>
											<td className="details-title">Wind:</td>
											<td className="details-value">{day.wind_speed} km/h</td>
										</tr>
										<tr>
											<td className="details-title">Humidity:</td>
											<td className="details-value">{day.humidity}%</td>
										</tr>
										<tr>
											<td className="details-title">UV Index:</td>
											<td className="details-value">{Math.round(Number(day.uvi))}</td>
										</tr>
										<tr>
											<td className="details-title">Sunrise/sunset:</td>
											<td className="details-value">
												{`${moment.unix(Number(day.sunrise)).tz(props.timezone).format("HH:mm")}`},
												{`${moment.unix(Number(day.sunset)).tz(props.timezone).format("HH:mm")}`}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Days;
