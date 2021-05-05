import React from "react";

const Minmax = (props) => {
	const nextDayWeatherDetails = props.nextDayWeatherDetails;
	return (
		<div className="minmax-wrapper">
			<span className="max">
				Day {nextDayWeatherDetails && Math.round(Number(nextDayWeatherDetails.temp.max))}
				&#730;&#8593; -{" "}
			</span>
			<span className="min">
				Night {nextDayWeatherDetails && Math.round(Number(nextDayWeatherDetails.temp.min))}
				&#730;&#8595;
			</span>
		</div>
	);
};

export default Minmax;
