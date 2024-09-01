"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import UseTrackLocation from "./use-track-location";

mapboxgl.accessToken =
	"pk.eyJ1IjoiemVtbzY5IiwiYSI6ImNseXltbzFrajA5dnIyaXM2cTJraTdoMGUifQ.2EcWIoChIBwyWJjK_hoSWg";

export default function CoffeeMap() {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const { latLong } = UseTrackLocation();

	useEffect(() => {
		if (mapContainerRef.current) {
			const map = new mapboxgl.Map({
				container: mapContainerRef.current as HTMLElement,
				style: "mapbox://styles/mapbox/dark-v11", // stylesheet location
				center: [19.216204176181012, 44.756819009258116], // starting position [lng, lat]
				zoom: 11, // starting zoom
			});

			// Add navigation control (the +/- zoom buttons)
			map.addControl(new mapboxgl.NavigationControl(), "top-left");
			map.addControl(
				new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
					showUserHeading: true,
				}),
				"top-left"
			);

			return () => map.remove();
		}
	}, []);

	return <div ref={mapContainerRef} className="w-full h-[100vh] rounded-md" />;
}
