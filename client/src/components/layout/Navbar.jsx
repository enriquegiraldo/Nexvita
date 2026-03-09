import { motion as Motion } from 'framer-motion';
import { Menu, X, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const Navbar = ({ isMenuOpen, setIsMenuOpen, currentSection, scrollToSection }) => {
    const navItems = ['about', 'services', 'results', 'anamnesis', 'contact'];

    const socialLinks = [
        { icon: FaInstagram, url: 'https://instagram.com/FitDrolean', label: 'Instagram', hoverColor: 'hover:text-[#E4405F]' },
        { icon: FaFacebookF, url: 'https://facebook.com/FitDrolean', label: 'Facebook', hoverColor: 'hover:text-[#1877F2]' },
        { icon: FaYoutube, url: 'https://youtube.com/@FitDrolean', label: 'YouTube', hoverColor: 'hover:text-[#FF0000]' },
        { icon: FaXTwitter, url: 'https://twitter.com/FitDrolean', label: 'X (Twitter)', hoverColor: 'hover:text-white' },
    ];
    const handleTelegramClick = () => {
        const telegramUser = "tu_usuario"; // <--- Cambia esto por tu nick de Telegram
        window.open(`https://t.me/${telegramUser}`, '_blank');
    };


    return (
        <>
            <nav className="fixed w-full z-50 px-4 py-4 backdrop-blur-sm bg-brand-silver-900/95 border-b border-brand-purple-600/30">
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
                            FitDrolean
                        </span>
                    </Motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`relative font-medium transition-all duration-300 ${currentSection === section
                                    ? 'text-brand-neon-green-neon'
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
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`text-brand-silver-400 ${social.hoverColor} transition-colors`}
                                        aria-label={social.label}
                                    >
                                        <Icon size={20} />
                                    </Motion.a>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleTelegramClick}
                            className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg font-medium flex items-center space-x-2 hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30"
                        >
                            <Send size={18} />
                            <span>Telegram</span>
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
                    className="fixed top-20 left-0 w-full bg-brand-silver-900 border-b border-brand-purple-600/30 backdrop-blur-sm z-40"
                >
                    <div className="flex flex-col items-center py-6 space-y-4">
                        {navItems.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`text-lg font-medium ${currentSection === section
                                    ? 'text-brand-neon-green-neon'
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
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`text-brand-silver-400 ${social.hoverColor} transition-colors`}
                                        aria-label={social.label}
                                    >
                                        <Icon size={24} />
                                    </Motion.a>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleTelegramClick}
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg font-medium flex items-center space-x-2 shadow-lg shadow-blue-500/30"
                        >
                            <Send size={20} />
                            <span>Telegram</span>
                        </button>
                    </div>
                </Motion.div>
            )}
        </>
    );
};

export default Navbar;
