
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group" title="Página Inicial">
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
        BrinquedoKIDS
      </span>
      <Home className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

export default Logo;
