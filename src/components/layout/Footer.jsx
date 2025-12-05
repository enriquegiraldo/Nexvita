const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-gradient-to-t from-[#0a0a0a] to-[#111] border-t border-purple-900/30">
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="font-bold text-white text-xl">D</span>
                    </div>
                </div>

                <p className="text-gray-400 mb-4">
                    DROLEAN © {new Date().getFullYear()} - Transformación tecnológica humana
                </p>

                <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                    Todos los derechos reservados. Los resultados pueden variar dependiendo del compromiso y seguimiento del plan personalizado.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
