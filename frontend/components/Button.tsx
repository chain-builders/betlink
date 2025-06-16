import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.115 }}
      onClick={onClick}
      className={`${className} relative inline-flex cursor-pointer items-center font-semibold rounded-[2.5rem] bg-[#a817bc] py-[7px] mb-3 text-[15px] tracking-[0.1rem] text-white shadow-[inset_0px_-2px_0px_3px_#550a85,inset_0px_1px_0px_6px_#c13ae3]`}
    >
      {children}
    </motion.button>
  );
};

export default Button;