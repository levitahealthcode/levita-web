// Header.tsx
import React, { useEffect, useState } from 'react';
import Navbar, { navLinks } from './Navbar';
import levita from '../assets/levitabig2.svg'; // ✅ import your logo

const HamburgerIcon = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="md:hidden p-2 -mr-2"
    aria-label="Open menu"
  >
    <svg
      className="w-8 h-8 text-levita-blue-dark cursor-pointer"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
);

const MobileMenu = ({
  isOpen,
  onClose,
  onScrollToContact,
}: {
  isOpen: boolean;
  onClose: () => void;
  onScrollToContact: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 bg-white/95 backdrop-blur-md z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="container mx-auto px-6 h-full">
        <div
          className="flex justify-between items-center"
          style={{ height: '96px' }} // taller header height to fit logo
        >
          {/* ✅ Mobile logo */}
          <a
            href="/"
            onClick={onClose}
            rel="home"
            className="flex items-center"
          >
            <img
              src={levita}
              alt="Levita Health"
              className="h-16 sm:h-20 w-auto object-contain" // bigger logo
            />
          </a>

          <button
            onClick={onClose}
            className="p-2 -mr-2"
            aria-label="Close menu"
          >
            <svg
              className="w-8 h-8 text-levita-blue-dark cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
          <nav
            className="flex flex-col items-center space-y-8"
            aria-label="Primary (mobile)"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-3xl font-semibold text-levita-blue-dark hover:text-levita-blue-light transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Contact Button */}
          <button
            type="button"
            onClick={() => {
              onClose();
              setTimeout(() => onScrollToContact(), 80);
            }}
            className="mt-12 bg-levita-blue-light text-white font-bold py-3 px-8 rounded-full hover:bg-levita-blue-dark transition-colors shadow-lg"
          >
            Contact Us!
          </button>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getHeaderHeight = () => {
    const hdr = document.querySelector('header');
    if (hdr) return hdr.getBoundingClientRect().height;
    return 96; // updated default
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (!el) {
      console.warn('[Header] contact section not found. Not navigating.');
      return;
    }

    const top = el.getBoundingClientRect().top + window.pageYOffset;
    const headerHeight = getHeaderHeight();
    const offset = 8;
    const target = Math.max(0, top - headerHeight - offset);
    window.scrollTo({ top: target, behavior: 'smooth' });

    try {
      history.replaceState(null, '', '#contact');
    } catch (e) {}
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 shadow-md backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6"> {/* no padding */}
          <div
            className="flex justify-between items-center"
            style={{ height: '96px' }} // ⬆️ header height
          >
            {/* ✅ Desktop logo */}
            <a href="#home" rel="home" className="flex items-center">
              <img
                src={levita}
                alt="Levita Health"
                className="h-20 md:h-24 lg:h-28 w-auto object-contain" // ⬆️ much bigger
              />
            </a>

            <nav className="hidden md:block" aria-label="Primary">
              <Navbar />
            </nav>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollToContact();
              }}
              className="hidden md:inline-block bg-levita-blue-light text-white font-bold py-3 px-8 rounded-full hover:bg-levita-blue-dark transition-colors shadow-sm"
            >
              Contact Us!
            </button>

            <HamburgerIcon onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onScrollToContact={scrollToContact}
      />
    </>
  );
};

export default Header;
