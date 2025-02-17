// resources/js/Components/AnimatedToast.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast } from "@/components/ui/toast";

const AnimatedToast = ({ children, ...props }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      >
        <Toast {...props}>{children}</Toast>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedToast;