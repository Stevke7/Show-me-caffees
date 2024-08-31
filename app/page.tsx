import Image from "next/image";
import SideNav from "./ui/sidenav/sidenav";
import CoffeeMap from "./lib/map";

export default function Home() {
	return (
		<div className="flex flex-row">
			<SideNav />
			<CoffeeMap />
		</div>
	);
}
