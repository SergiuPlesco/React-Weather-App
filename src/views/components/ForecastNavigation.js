import { NavLink } from "react-router-dom";

const ForecastNavigation = () => {
	return (
		<div className="forecast">
			<NavLink className="forecast-link" activeClassName="active" to="/today">
				<p>Today</p>
			</NavLink>
			<NavLink className="forecast-link" activeClassName="active" to="/tomorrow">
				<p>Tomorrow</p>
			</NavLink>
			<NavLink className="forecast-link" activeClassName="active" to="/sevendays">
				<p>7 Days</p>
			</NavLink>
		</div>
	);
};

export default ForecastNavigation;
