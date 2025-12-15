import { motion as Motion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';

const Navbar = ({ isMenuOpen, setIsMenuOpen, currentSection, scrollToSection, handleWhatsAppClick }) => {
    const navItems = ['about', 'services', 'results', 'anamnesis', 'contact'];

    return (
        <>
            <nav className="fixed w-full z-50 px-4 py-4 backdrop-blur-sm bg-[rgba(10,10,10,0.9)] border-b border-purple-900/30">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2"
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center">
                            <span className="font-bold text-white text-xl">D</span>
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                            DROLEAN
                        </span>
                    </Motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`relative font-medium transition-all duration-300 ${currentSection === section
                                        ? 'text-purple-400'
                                        : 'text-gray-300 hover:text-purple-300'
                                    }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                                {currentSection === section && (
                                    <Motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-400"
                                        initial={false}
                                    />
                                )}
                            </button>
                        ))}
                        <button
                            onClick={handleWhatsAppClick}
                            className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg font-medium flex items-center space-x-2 hover:opacity-90 transition-opacity"
                        >
                            <MessageCircle size={18} />
                            <span>WhatsApp</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-300 hover:text-purple-300"
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
                    className="fixed top-16 left-0 w-full bg-[#0a0a0a] border-b border-purple-900/30 backdrop-blur-sm z-40"
                >
                    <div className="flex flex-col items-center py-6 space-y-4">
                        {navItems.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`text-lg font-medium ${currentSection === section
                                        ? 'text-purple-400'
                                        : 'text-gray-300 hover:text-purple-300'
                                    }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </button>
                        ))}
                        <button
                            onClick={handleWhatsAppClick}
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg font-medium flex items-center space-x-2"
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
