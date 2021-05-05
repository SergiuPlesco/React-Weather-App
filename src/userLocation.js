/**
 * Get user coordinates
 * @returns Promise with user coordinates
 */
const userLocation = () => {
	if (navigator.geolocation) {
		return new Promise((resolve, reject) => {
			const options = {
				enableHighAccuracy: true,
				maximumAge: 30000,
			};
			navigator.geolocation.getCurrentPosition(resolve, reject, options);
		});
	}
};

export default userLocation;
