import { useState } from "react";
import { locatingFailed, locatingSuccess } from "./notify";

type Position = {
	coords: {
		latitude: number;
		longitude: number;
	};
};

export default function UseTrackLocation() {
	const [locationErrorMsg, setLocationErrorMsg] = useState<string>("");
	const [latLong, setaLatLong] = useState<string>("");
	const [isFindingLocation, setIsFindingLocation] = useState<boolean>(false);

	const success = (position: Position) => {
		const latitude = position.coords.latitude;
		const longitutde = position.coords.longitude;

		setaLatLong(`${latitude},${longitutde}`);
		locatingSuccess();
		setLocationErrorMsg("");
		setIsFindingLocation(false);
	};

	const error = () => {
		setLocationErrorMsg("Unable to retrieve your location");
		locatingFailed();
		setIsFindingLocation(false);
	};

	const handleTrackLocation = () => {
		setIsFindingLocation(true);
		if (!navigator.geolocation) {
			setLocationErrorMsg("Geolocation not supported by your browser!");
			setIsFindingLocation(false);
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};

	return {
		locationErrorMsg,
		latLong,
		handleTrackLocation,
		isFindingLocation,
	};
}
