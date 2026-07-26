// src/components/Footer.jsx
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand info */}
        <div className="text-center md:text-left">
          <h3 className="font-display text-2xl font-bold text-white mb-2">Yas<span className="text-gold">Talk</span></h3>
          <p className="text-gray-400 text-sm">Connecting you across languages, instantly and naturally.</p>
        </div>

        {/* Social Media Links with Official Names */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Facebook */}
          <a 
            href="https://www.facebook.com/share/1DE3FSyqdQ/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-colors text-gray-300 hover:text-white"
          >
            <FaFacebookF size={18} className="text-blue-500" />
            <span className="text-sm font-medium">YasTalk Official</span>
          </a>
          
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/yastalkapp?igsh=MXdmbWZjMWk3ZWljdg==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-colors text-gray-300 hover:text-white"
          >
            <FaInstagram size={18} className="text-pink-500" />
            <span className="text-sm font-medium">@yastalkapp</span>
          </a>

          {/* TikTok */}
          <a 
            href="https://vt.tiktok.com/ZSX62n2pM/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-colors text-gray-300 hover:text-white"
          >
            <FaTiktok size={18} className="text-cyan-400" />
            <span className="text-sm font-medium">YasTalk TikTok</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} YasTalk. All rights reserved.
      </div>
    </footer>
  );
}