import { IconCircleArrowRightFilled } from '@tabler/icons-react';
import { usePlaces } from '@/app/context/placesContext';

export default function NavCards() {
  const { places } = usePlaces();

  return (
    <div className="flex flex-col px-4 w-full px-2 mt-8 gap-4 ">
      {places.map((place: any) => (
        <div
          key={place.fsq_id}
          className="w-full flex flex-row bg-back-color px-2 py-2 place-content-between items-center rounded-md cursor-pointer"
        >
          <div className="flex flex-col text-white">
            <p>{place.name}</p>
            <p>{place.distance} meters away</p>
          </div>
          <span className="cursor-pointer">
            <IconCircleArrowRightFilled className="text-bg-btn" size={40} />
          </span>
        </div>
      ))}
    </div>
  );
}
