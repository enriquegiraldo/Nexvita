import { motion as Motion } from 'framer-motion';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTelegramPlane,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    const socialLinks = [
        {
            icon: FaFacebookF,
            url: 'https://facebook.com/FitDrolean',
            label: 'Facebook',
            hoverColor: 'hover:text-[#1877F2]'
        },
        {
            icon: FaXTwitter,
            url: 'https://twitter.com/FitDrolean',
            label: 'X (Twitter)',
            hoverColor: 'hover:text-white'
        },
        {
            icon: FaInstagram,
            url: 'https://instagram.com/FitDrolean',
            label: 'Instagram',
            hoverColor: 'hover:text-[#E4405F]'
        },
        {
            icon: FaYoutube,
            url: 'https://youtube.com/@FitDrolean',
            label: 'YouTube',
            hoverColor: 'hover:text-[#FF0000]'
        },
        {
            icon: FaTiktok,
            url: 'https://tiktok.com/@FitDrolean',
            label: 'TikTok',
            hoverColor: 'hover:text-white'
        },
        {
            icon: FaTelegramPlane,
            url: 'https://t.me/FitDrolean',
            label: 'Telegram',
            hoverColor: 'hover:text-[#0088CC]'
        },
        {
            icon: FaLinkedinIn,
            url: 'https://linkedin.com/company/FitDrolean',
            label: 'LinkedIn',
            hoverColor: 'hover:text-[#0A66C2]'
        },
    ];

    return (
        <footer className="py-12 px-4 bg-gradient-to-t from-brand-silver-900 to-brand-silver-800 border-t border-brand-purple-600/30">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-brand-purple-600 to-brand-purple-400 rounded-lg flex items-center justify-center shadow-lg shadow-brand-purple-500/30">
                                <span className="font-bold text-white text-xl">F</span>
                            </div>
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple-400 via-brand-neon-green-neon to-brand-purple-600">
                                FitDrolean
                            </span>
                        </div>
                        <p className="text-brand-silver-400 text-sm">
                            Transformación tecnológica humana. Tu sistema de entrenamiento personalizado.
                        </p>
                        <p className="text-brand-silver-500 text-sm mt-2">
                            📞 +57 310 755 3317
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="font-semibold text-brand-silver-200 mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            {['about', 'services', 'results', 'anamnesis', 'contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link}`}
                                        className="text-brand-silver-400 hover:text-brand-neon-green-neon transition-colors text-sm"
                                    >
                                        {link.charAt(0).toUpperCase() + link.slice(1)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="text-center md:text-right">
                        <h3 className="font-semibold text-brand-silver-200 mb-4">Síguenos</h3>
                        <div className="flex justify-center md:justify-end space-x-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <Motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`text-brand-silver-400 ${social.hoverColor} transition-colors`}
                                        aria-label={social.label}
                                    >
                                        <Icon size={24} />
                                    </Motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-brand-silver-700 pt-6 text-center">
                    <p className="text-brand-silver-400 mb-2">
                        FitDrolean © {new Date().getFullYear()} - Transformación tecnológica humana
                    </p>
                    <p className="text-brand-silver-500 text-xs max-w-2xl mx-auto">
                        Todos los derechos reservados. Los resultados pueden variar dependiendo del compromiso y seguimiento del plan personalizado.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
