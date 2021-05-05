import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, HashRouter } from "react-router-dom";
import "./App.css";
import ForecastNavigation from "./views/components/ForecastNavigation";
import SearchBar from "./views/components/SearchBar";
import Today from "./views/pages/Today";
import Tomorrow from "./views/pages/Tomorrow";
import Days from "./views/pages/Days";
import moment from "moment-timezone";
import Header from "./views/components/Header";
import userLocation from "./userLocation";

function App() {
	const [geolocationErrorMessage, setGeolocationErrorMessage] = useState();
	const [submitedCity, setSubmitedCity] = useState("");
	const [sessionActive, setSessionActive] = useState("false");

	const [weatherDetails, setWeatherDetails] = useState(null);
	const [nextDayWeatherDetails, setNextDayWeatherDetails] = useState(null);
	const [dailyForecast, setDailyForecast] = useState(null);
	const [city, setCity] = useState("");
	/**
	 * Set errors and loading for every component separately
	 */
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * Timezone, Date and Time
	 */
	const [tz, setTz] = useState();
	const [nextDayDate, setNextDayDate] = useState(null);

	const getCity = async (city) => {
		const APIKEY = process.env.REACT_APP_API_KEY;
		const cityURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;
		const coord = await fetch(cityURL)
			.then((response) => {
				if (!response.ok) {
					throw Error("could not fetch, error in cityURL, please enter a city name.");
				}
				return response.json();
			})
			.then((data) => {
				setCity(data.name);
				return data.coord;
			})
			.catch((err) => {
				setError(err.message);
				console.log("no city");
			});
		return coord;
	};

	const getCoord = async (lat, lon) => {
		const APIKEY = process.env.REACT_APP_API_KEY;
		const coordURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
		const result = await fetch(coordURL)
			.then((response) => {
				if (!response.ok) {
					throw Error("Could not fetch coord URL");
				}
				return response.json();
			})
			.then((data) => {
				setCity(data.name);
			})
			.catch((err) => {
				console.log(`${err.message}`);
			});
		return result;
	};

	const getWeatherDetails = (lat, lon) => {
		const APIKEY = process.env.REACT_APP_API_KEY;
		const oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`;
		fetch(oneCallURL)
			.then((response) => {
				if (!response.ok) {
					throw Error("Could not fetch data from one call URL");
				}
				return response.json();
			})
			.then((data) => {
				setWeatherDetails(data);
				const nextDay = moment().tz(data.timezone).add(1, "days").format("dddd, DD MMMM");
				setNextDayDate(nextDay);
				setTz(data.timezone);
				setGeolocationErrorMessage(null);
				setError(null);
				setIsLoading(false);
				console.log(data);
				return data.daily;
			})
			.then((daily) => {
				setDailyForecast(daily);
				return daily[1];
			})
			.then((nextDayData) => {
				setNextDayWeatherDetails(nextDayData);
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(`${err.message} `);
				setError(err.message);
			});
	};
	/**
	 * If session active, city remains the same on browser refresh and current window session
	 */
	const handleSession = () => {
		setSessionActive(!sessionActive);
		sessionStorage.setItem("active", `${sessionActive ? "active" : "active"}`);
	};
	/**
	 * Handle form submit
	 * Store the value on sessionStorage to be used in current session
	 */

	function handleSubmit(e) {
		e.preventDefault();
		handleSession();
		sessionStorage.setItem("city", city);
		setSubmitedCity(city);
	}

	/**
	 * Handle search input
	 * Show typed value
	 */
	function getSearchInput(e) {
		setCity(e.target.value);
	}

	useEffect(() => {
		/**
		 * Get weather data for user's location if permision allowed
		 */
		if (!sessionStorage.getItem("active")) {
			userLocation()
				.then((position) => {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;

					getCoord(lat, lon);
					getWeatherDetails(lat, lon);
					setGeolocationErrorMessage(null);
				})
				.catch((err) => {
					console.log(err.code);
					setGeolocationErrorMessage(err.message);
					setIsLoading(false);
				});
		}
		/**
		 * Get weather details for searched city
		 * Runs on input submit
		 */
		if (sessionStorage.getItem("active")) {
			getCity(sessionStorage.getItem("city"))
				.then((coord) => {
					getWeatherDetails(coord.lat, coord.lon);
					console.log("object");
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}, [submitedCity]);

	return (
		<div className="App">
			<Header />
			<SearchBar inputValue={city} getSearchInput={getSearchInput} handleSubmit={handleSubmit} />
			<HashRouter>
				<ForecastNavigation />
				<Switch>
					<Route path="/">
						<Redirect to="/today" />
					</Route>
					<Route path="/today">
						<Today
							isLoading={isLoading}
							geolocationErrorMessage={geolocationErrorMessage}
							error={error}
							weatherDetails={weatherDetails}
							timezone={tz}
						/>
					</Route>
					<Route path="/tomorrow">
						<Tomorrow
							isLoading={isLoading}
							geolocationErrorMessage={geolocationErrorMessage}
							error={error}
							nextDayDate={nextDayDate}
							nextDayWeatherDetails={nextDayWeatherDetails}
						/>
					</Route>
					<Route path="/sevendays">
						<Days
							isLoading={isLoading}
							geolocationErrorMessage={geolocationErrorMessage}
							error={error}
							dailyForecast={dailyForecast}
							timezone={tz}
						/>
					</Route>
				</Switch>
			</HashRouter>
		</div>
	);
}

export default App;
