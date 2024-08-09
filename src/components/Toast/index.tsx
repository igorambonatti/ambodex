import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';

interface ToastProps {
  title: string;
  message: string;
}

export const ErrorToast = ({ title, message }: ToastProps) => (
  <div>
    <h4 className="font-bold text-[#FF5353]">{title}</h4>
    <p className="font-normal text-[#FF5353]">{message}</p>
  </div>
);

export const SuccessToast = ({ title, message }: ToastProps) => (
  <div>
    <h4 className="font-bold text-primary">{title}</h4>
    <p className="font-normal text-primary">{message}</p>
  </div>
);

export const showErrorToast = (title: string, message: string) => {
  toast.error(<ErrorToast title={title} message={message} />, {
    autoClose: 5000,
    hideProgressBar: true,
    icon: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
  });
};

export const showSuccessToast = (title: string, message: string) => {
  toast.success(<SuccessToast title={title} message={message} />, {
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    icon: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
  });
};

export const StyledToastContainer = () => (
  <ToastContainer className="StyledToastContainer" />
);
