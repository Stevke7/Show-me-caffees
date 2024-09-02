export const getPlaces = async (query: string, latlong: string) => {
	const token = process.env.NEXT_PUBLIC_FOURSQUARE_API;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			//Authorization: "fsq31MOOBCmBXHSrij5J4kUDzP8Ocq1+7Jgdt9P8+2DBUfA=",
			...(token ? { Authorization: token } : {}), //Include Authorization if token is defined, do it like this because of typescript
		},
	};

	const response = await fetch(
		`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&radius=10000`,
		options
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}

	return await response.json();
};
