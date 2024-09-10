'use client';
import { createContext, useCallback, useContext, useState } from 'react';
import { getPlaces } from '../lib/get-places';

interface PlacesContextType {
  places: any[];
  fetchPlaces: (query: string, latlong: string) => Promise<void>;
}

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [places, setPlaces] = useState<any[]>([]);

  const fetchPlaces = useCallback(async (query: string, latlong: string) => {
    try {
      const data = await getPlaces(query, latlong);
      setPlaces(data.results || []);
      console.log('PLACES', data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }, []);

  return (
    <PlacesContext.Provider value={{ places, fetchPlaces }}>
      {children}
    </PlacesContext.Provider>
  );
};
export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error('usePlaces must be used within a PlacesProvider');
  }
  return context;
};
