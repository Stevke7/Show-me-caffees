"use client";

import Image from "next/image";
import logo from "@/public/two-beans.svg";
import { IconMapPinFilled } from "@tabler/icons-react";
import NavCards from "./sidenav-cards/navCards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseTrackLocation from "@/app/lib/use-track-location";
import { getPlaces } from "@/app/lib/get-places";
import { useEffect, useState } from "react";

export default function SideNav() {
	const [searchValue, setSearchValue] = useState<string>("");
	const [places, setPlaces] = useState<any[]>([]);

	const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
		UseTrackLocation();

	const handleBtnClick = async () => {
		handleTrackLocation();
		try {
			const data = await getPlaces(searchValue, latLong);
			setPlaces(data.resuslts);
			console.log({ data });
		} catch (error) {
			console.error(error);
		}
	};
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		console.log({ latLong, locationErrorMsg });
	}, [latLong, locationErrorMsg]);
	return (
		<div className="w-1/4 h-[100vh] bg-nav-bg px-2 py-8 flex flex-col">
			<div className="flex flex-col w-full items-center">
				<section className="flex flex-row w-full px-4 pb-8 gap-1 items-center">
					<Image src={logo} className="w-10 h-10" alt="coffee-logo" />
					<p className="text-bg-btn">CoffeeNearMe</p>
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
				>
					{isFindingLocation ? "Locating" : "Show me places"}
					<IconMapPinFilled className="text-white" />
				</button>
				<NavCards />
				<ToastContainer />
			</div>
		</div>
	);
}
