"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
	"pk.eyJ1IjoiemVtbzY5IiwiYSI6ImNseXltbzFrajA5dnIyaXM2cTJraTdoMGUifQ.2EcWIoChIBwyWJjK_hoSWg";

export default function CoffeeMap() {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (mapContainerRef.current) {
			const map = new mapboxgl.Map({
				container: mapContainerRef.current as HTMLElement, // Type assertion here
				style: "mapbox://styles/mapbox/dark-v11", // stylesheet location
				center: [19.216204176181012, 44.756819009258116], // starting position [lng, lat]
				zoom: 13, // starting zoom
			});

			// Add navigation control (the +/- zoom buttons)
			map.addControl(new mapboxgl.NavigationControl(), "top-right");

			return () => map.remove();
		}
	}, []); // empty dependency array means this effect will only run once on mount

	return <div ref={mapContainerRef} className="w-full h-[100vh] rounded-md" />;
}
