import { Bounce, toast } from "react-toastify";

export const showToaste = (type, message) => {
  const config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  }
  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    default:
      toast.info(message, config);
      break;
  }
}
