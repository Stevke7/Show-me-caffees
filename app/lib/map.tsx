'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import UseTrackLocation from './use-track-location';
import { usePlaces } from '../context/placesContext';

export default function CoffeeMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { latLong, locationErrorMsg } = UseTrackLocation();
  const { places } = usePlaces();

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
    if (mapContainerRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [19.216204176181012, 44.756819009258116], // Default center
        zoom: 11,
      });

      mapInstanceRef.current.on('load', () => {
        mapInstanceRef.current?.addControl(
          new mapboxgl.NavigationControl(),
          'top-left'
        );
        mapInstanceRef.current?.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          }),
          'top-left'
        );
      });
    }
    return () => {
      // Only remove the map when the component is unmounted
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && latLong) {
      const [lng, lat] = latLong.split(',').map(Number);
      mapInstanceRef.current.setCenter([lng, lat]);
      console.log('Updated map center:', lng, lat);
    }
  }, [latLong]);

  useEffect(() => {
    if (mapInstanceRef.current && places.length > 0) {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add new markers
      places.forEach((place) => {
        if (place.geocodes && place.geocodes.main) {
          const { latitude, longitude } = place.geocodes.main;

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${place.name}</h3>
             <p>${place.location.formatted_address}</p>
             <p>Distance: ${place.distance} meters</p>`
          );

          const marker = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(mapInstanceRef.current!);

          markersRef.current.push(marker);
        } else {
          console.warn('Place does not have valid geocodes:', place);
        }
      });
      console.log('Added markers for places:', places.length);
    }
  }, [places]);

  return <div ref={mapContainerRef} className="w-full h-[100vh] rounded-md" />;
}
