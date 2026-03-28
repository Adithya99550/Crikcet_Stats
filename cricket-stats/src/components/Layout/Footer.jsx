import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© 2026 Cricket Stats Hub</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for cricket fans</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
