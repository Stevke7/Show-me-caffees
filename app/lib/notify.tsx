import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const locatingFailed = () =>
	toast.warn("Ooops Your browser doesn't support Geolocation!", {
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

export const locatingSuccess = () =>
	toast.success("Locating success", {
		position: "top-right",
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
		transition: Bounce,
	});
