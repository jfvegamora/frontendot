import { useEffect } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastNotificationProps {
  type: 'success' | 'error';
  message: string;
}

function ToastNotification({ type, message }: ToastNotificationProps) {
  useEffect(() => {
    const options: ToastOptions = {
      autoClose: type === 'success' ? 2000 : 3000,
    };

    if (type === 'success') {
      toast.success(message, options);
    } else if (type === 'error') {
      toast.error(message, options);
    }
  }, [type, message]);

  // Este componente no renderiza nada en el DOM
  return null;
}

export default ToastNotification;
