'use client';

import Image from 'next/image';
import logo from '@/public/two-beans.svg';
import { IconMapPinFilled } from '@tabler/icons-react';
import NavCards from './sidenav-cards/navCards';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseTrackLocation from '@/app/lib/use-track-location';
import { getPlaces } from '@/app/lib/get-places';
import { useEffect, useState, useCallback, useRef } from 'react';
import { usePlaces } from '@/app/context/placesContext';
import { useDebounce } from 'use-debounce';

export default function SideNav() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const { places, fetchPlaces } = usePlaces();
  const fetchedRef = useRef<{ latLong: string; search: string } | null>(null);

  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    UseTrackLocation();

  const handleBtnClick = useCallback(async () => {
    if (!debouncedSearchValue.trim()) {
      toast.error('Please enter a search value');
      return;
    }
    try {
      await handleTrackLocation();
      // Instead of checking latLong immediately, we'll wait for the useEffect to handle it
    } catch (error) {
      console.error('Error tracking location:', error);
      toast.error('Error tracking location');
    }
  }, [handleTrackLocation, debouncedSearchValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (latLong && debouncedSearchValue.trim()) {
      // Check if we've already fetched for this combination
      if (
        fetchedRef.current?.latLong !== latLong ||
        fetchedRef.current?.search !== debouncedSearchValue
      ) {
        console.log('Fetching places with:', debouncedSearchValue, latLong);
        fetchPlaces(debouncedSearchValue, latLong);
        // Update the ref to indicate we've fetched for this combination
        fetchedRef.current = { latLong, search: debouncedSearchValue };
      }
    }
  }, [latLong, locationErrorMsg, debouncedSearchValue, fetchPlaces]);

  return (
    <div className="w-1/4 max-h-[100vh] overflow-y-auto bg-nav-bg px-2 py-8 flex flex-col">
      <div className="flex flex-col w-full items-center">
        <section className="flex flex-row w-full px-4 pb-8 gap-1 items-center">
          <Image src={logo} className="w-10 h-10" alt="coffee-logo" />
          <p className="text-bg-btn">PlacesNearMe</p>
        </section>
        <input
          title="Search"
          placeholder="Search places"
          className="w-full px-2 rounded-md h-10"
          value={searchValue}
          onChange={handleInput}
        />
        <button
          className="flex flex-row w-4/5 h-16 bg-bg-btn my-8 rounded-md text-white justify-center items-center gap-4"
          title="Show me places"
          type="button"
          onClick={handleBtnClick}
          //disabled={isFindingLocation || !searchValue.trim()}
        >
          {isFindingLocation ? 'Locating' : 'Show me places'}
          <IconMapPinFilled className="text-white" />
        </button>
        <NavCards />
        <ToastContainer />
      </div>
    </div>
  );
}
