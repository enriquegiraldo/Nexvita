import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ handleWhatsAppClick }) => {
    return (
        <motion.button
            onClick={handleWhatsAppClick}
            aria-label="Contactar por WhatsApp"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-brand-neon-green-neon to-brand-neon-green-500 shadow-lg shadow-brand-neon-green-neon/50 border-2 border-brand-silver-200 focus:outline-none focus:ring-4 focus:ring-brand-neon-green-500/50"
        >
            <FaWhatsapp size={28} className="text-white" />
        </motion.button>
    );
};

export default WhatsAppButton;