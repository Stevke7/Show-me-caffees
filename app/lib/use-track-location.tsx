import { useState, useCallback } from 'react';
import { locatingFailed, locatingSuccess } from './notify';

type Position = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export default function UseTrackLocation() {
  const [locationErrorMsg, setLocationErrorMsg] = useState<string>('');
  const [latLong, setLatLong] = useState<string>('');
  const [isFindingLocation, setIsFindingLocation] = useState<boolean>(false);

  const success = useCallback((position: Position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const newLatLong = `${latitude},${longitude}`;
    setLatLong(newLatLong);
    locatingSuccess();
    setLocationErrorMsg('');
    setIsFindingLocation(false);
    console.log('Location set:', newLatLong);
  }, []);

  const error = useCallback(() => {
    setLocationErrorMsg('Unable to retrieve your location');
    locatingFailed();
    setIsFindingLocation(false);
    console.log('Location error');
  }, []);

  const handleTrackLocation = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      setIsFindingLocation(true);
      if (!navigator.geolocation) {
        setLocationErrorMsg('Geolocation not supported by your browser!');
        setIsFindingLocation(false);
        reject('Geolocation not supported');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            success(position);
            resolve();
          },
          (err) => {
            error();
            reject(err);
          }
        );
      }
    });
  }, [success, error]);

  return {
    locationErrorMsg,
    latLong,
    handleTrackLocation,
    isFindingLocation,
  };
}
