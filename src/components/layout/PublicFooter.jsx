import { Link } from "react-router-dom";

export function PublicFooter() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M50 5 L93 25 V75 L50 95 L7 75 V25 L50 5 Z" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
              <path d="M28 35 V65 M48 35 V65 M28 50 H48" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M60 35 H65 C73.284 35 80 41.716 80 50 C80 58.284 73.284 65 65 65 H60 V35 Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="80" cy="50" r="3" fill="currentColor"/>
            </svg>
            <span className="font-bold text-xl tracking-[0.2em] text-white/90">
              HELPDESK
            </span>
          </div>
          <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed max-w-sm mb-6">
            A meticulously designed workspace for modern support teams. Build relationships, not backlogs.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-[0.2em]">
            Product
          </h4>
          <ul className="space-y-4 text-xs uppercase tracking-widest text-white/50">
            <li>
              <Link to="/features" className="hover:text-white transition-colors">Features</Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Changelog</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-[0.2em]">
            Resources
          </h4>
          <ul className="space-y-4 text-xs uppercase tracking-widest text-white/50">
            <li>
              <Link to="/kb" className="hover:text-white transition-colors">Help Center</Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">API Documentation</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Community</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-[0.2em]">
            Company
          </h4>
          <ul className="space-y-4 text-xs uppercase tracking-widest text-white/50">
            <li>
              <a href="#" className="hover:text-white transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Partners</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[10px] text-white/30 uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} HELPDESK. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
