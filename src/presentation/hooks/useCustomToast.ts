import { toast } from "react-toastify";

type ToastType = "success" | "error";

interface ToastOptions{
    message:string;
    type:ToastType;
}

const useCustomToast = () => {
    const showToast = ({message, type}:ToastOptions) => {
        toast(message, {
            type: type,
            autoClose: type === "success" ? 2000 : 3000
        });
    };

    return {
        show: (options:ToastOptions) => showToast(options)
    }
};

export default useCustomToast;