"use client";

import Image from "next/image";
import logo from "@/public/two-beans.svg";
import { IconMapPinFilled } from "@tabler/icons-react";
import NavCards from "./sidenav-cards/navCards";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SideNav() {
	const notify = () =>
		toast.warn("🦄 Something is not right!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Bounce,
		});
	const showNearbyPlaces = () => {
		console.log("Loading nearby places.....");
		notify();
	};

	return (
		<div className="w-1/4 h-[100vh] bg-nav-bg px-2 py-8 flex flex-col">
			<div className="flex flex-col w-full items-center">
				<section className="flex flex-row w-full px-4 gap-1 items-center">
					<Image src={logo} className="w-10 h-10" alt="coffee-logo" />
					<p className="text-bg-btn">CoffeeNearMe</p>
				</section>
				<NavCards />
				<button
					className="flex flex-row w-[180px] h-16 bg-bg-btn my-8 rounded-md text-white justify-center items-center gap-4"
					title="Show me places"
					type="button"
					onClick={showNearbyPlaces}
				>
					Show places
					<IconMapPinFilled className="text-white" />
				</button>
				<ToastContainer />
			</div>
		</div>
	);
}
