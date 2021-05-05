// import React, { useState, useEffect } from "react";

const DateTime = (props) => {
	return (
		<div className="date-time">
			<span className="date">{props.todayDate}, </span>
			<span className="clock">{props.todayClock}</span>
		</div>
	);
};

export default DateTime;
