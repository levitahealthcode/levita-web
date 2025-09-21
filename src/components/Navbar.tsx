import React from 'react';

// Exporting navLinks to be used in the mobile menu
export const navLinks = [
  { href: '#product', label: 'Product' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#resources', label: 'Resources' },
  //{ href: '#contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  return (
    // This navbar is hidden on mobile (md breakpoint)
    <nav className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href} className="text-levita-blue-dark hover:text-levita-blue-light font-medium transition-colors">
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
