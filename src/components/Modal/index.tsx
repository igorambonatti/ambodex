import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

export interface ModalRef {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  containerClasses?: string;
  title?: string;
}

const Modal = forwardRef<ModalRef, ModalProps>(
  ({ children, onClose, containerClasses, title }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          onClose?.();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <motion.div
              className={twMerge(
                'rounded bg-[#1B1B1B] shadow-lg',
                containerClasses,
              )}
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between p-6">
                <span className="text-[24px] text-white">{title}</span>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src="assets/icons/icon_close.svg"
                    alt="close icon"
                    height={22}
                    width={22}
                  />
                </button>
              </div>
              <div>{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
