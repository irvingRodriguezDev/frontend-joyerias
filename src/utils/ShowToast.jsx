import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (icon, title, text = "") => {
  const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: icon === "success" ? "#388e3c" : "red",
      color: "white",
    },
  };

  switch (icon) {
    case "success":
      toast.success(`${title} ${text}`, options);
      break;
    case "error":
      toast.error(`${title} ${text}`, options);
      break;
    case "info":
      toast.info(`${title} ${text}`, options);
      break;
    case "warning":
      toast.warning(`${title} ${text}`, options);
      break;
    default:
      toast(`${title} ${text}`, options);
  }
};

export default showToast;
