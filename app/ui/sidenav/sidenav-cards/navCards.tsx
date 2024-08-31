import { IconCircleArrowRightFilled } from "@tabler/icons-react";

export default function NavCards() {
	return (
		<div className="flex lex-col px-4 w-full px-2 mt-8 gap-4 ">
			<div className="w-full flex flex-row bg-back-color px-2 py-2 place-content-between items-center rounded-md cursor-pointer">
				<div className="flex flex-col text-white">
					<p>Garden Pub</p>
					<p>Bijeljina</p>
				</div>
				<span className="cursor-pointer">
					<IconCircleArrowRightFilled className="text-bg-btn" size={40} />
				</span>
			</div>
		</div>
	);
}
