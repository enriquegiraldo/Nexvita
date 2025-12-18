import { motion as Motion } from 'framer-motion';
import { Menu, X, MessageCircle, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const Navbar = ({ isMenuOpen, setIsMenuOpen, currentSection, scrollToSection, handleWhatsAppClick }) => {
    const navItems = ['about', 'services', 'results', 'anamnesis', 'contact'];
    
    const socialLinks = [
        { icon: Instagram, url: 'https://instagram.com/fitdrolean', label: 'Instagram' },
        { icon: Facebook, url: 'https://facebook.com/fitdrolean', label: 'Facebook' },
        { icon: Youtube, url: 'https://youtube.com/@fitdrolean', label: 'YouTube' },
        { icon: Twitter, url: 'https://twitter.com/fitdrolean', label: 'Twitter' },
    ];

    return (
        <>
            <nav className="fixed w-full z-50 px-4 py-4 backdrop-blur-sm bg-[rgba(13,17,23,0.95)] border-b border-brand-purple-600/30">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-3"
                    >
                        <div className="w-12 h-12 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-lg flex items-center justify-center shadow-lg shadow-brand-purple-500/30">
                            <span className="font-bold text-white text-xl">F</span>
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                            fitdrolean
                        </span>
                    </Motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`relative font-medium transition-all duration-300 ${currentSection === section
                                        ? 'text-brand-purple-400'
                                        : 'text-brand-silver-300 hover:text-brand-purple-300'
                                    }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                                {currentSection === section && (
                                    <Motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-brand-purple-400 to-brand-neon-green-neon"
                                        initial={false}
                                    />
                                )}
                            </button>
                        ))}
                        
                        {/* Social Media Icons */}
                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-brand-silver-700">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <Motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-brand-silver-400 hover:text-brand-neon-green-neon transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon size={20} />
                                    </Motion.a>
                                );
                            })}
                        </div>
                        
                        <button
                            onClick={handleWhatsAppClick}
                            className="ml-4 px-4 py-2 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-lg font-medium flex items-center space-x-2 hover:opacity-90 transition-opacity shadow-lg shadow-brand-purple-500/30"
                        >
                            <MessageCircle size={18} />
                            <span>WhatsApp</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-brand-silver-300 hover:text-brand-purple-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed top-20 left-0 w-full bg-[#0d1117] border-b border-brand-purple-600/30 backdrop-blur-sm z-40"
                >
                    <div className="flex flex-col items-center py-6 space-y-4">
                        {navItems.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`text-lg font-medium ${currentSection === section
                                        ? 'text-brand-purple-400'
                                        : 'text-brand-silver-300 hover:text-brand-purple-300'
                                    }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </button>
                        ))}
                        
                        {/* Mobile Social Media Icons */}
                        <div className="flex items-center space-x-4 pt-4 border-t border-brand-silver-700 w-full justify-center">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <Motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-brand-silver-400 hover:text-brand-neon-green-neon transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon size={24} />
                                    </Motion.a>
                                );
                            })}
                        </div>
                        
                        <button
                            onClick={handleWhatsAppClick}
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-lg font-medium flex items-center space-x-2 shadow-lg shadow-brand-purple-500/30"
                        >
                            <MessageCircle size={20} />
                            <span>Contactar por WhatsApp</span>
                        </button>
                    </div>
                </Motion.div>
            )}
        </>
    );
};

export default Navbar;
