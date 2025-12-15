import { motion as Motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ handleWhatsAppClick }) => {
    return (
        <Motion.button
            onClick={handleWhatsAppClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 border-2 border-white cursor-pointer"
        >
            <MessageCircle size={28} className="text-white" />
        </Motion.button>
    );
};

export default WhatsAppButton;
