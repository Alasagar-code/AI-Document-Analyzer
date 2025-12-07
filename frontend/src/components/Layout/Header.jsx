import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../Shared/ThemeToggle";
import Button from "../Shared/Button";
import { useTheme } from "../../contexts/useTheme";

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const userMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Debug: Check if event handler is triggered
      console.log('Document click event detected:', event.target);
      
      // Check if click is outside the menu container
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        console.log('Click detected outside menu container');
        setShowUserMenu(false);
      } else {
        console.log('Click detected inside menu container');
      }
    }
    
    if (showUserMenu) {
      // Debug: Log ref value when menu is open
      console.log('Menu ref value:', userMenuRef.current);
      
      // Use capture phase to ensure we catch events before they bubble
      document.addEventListener("click", handleClickOutside, true);
    }
    
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    try {
      onLogout?.();
    } finally {
      navigate("/", { replace: true });
    }
  };

  return (
    <header className={`border-b ${isDark ? 'bg-background text-text border-border' : 'bg-background text-text border-border'} transition-colors duration-200`}>
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3">
          <span className="font-semibold text-primary text-xl">
            AI Document Analyzer
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          {user && (
            <>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/history" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                History
              </Link>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm">
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                </button>
              </div>
            </>
          )}
          {user ? (
            <div className="relative">
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg z-10 py-2" ref={userMenuRef}>
                  <div className="px-4 pb-2 flex flex-col items-center text-sm">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-medium text-lg mb-2">
                      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-lg">{user.name || user.email}</span>
                    <span className="text-muted-foreground text-sm">{user.email}</span>
                    <span className="text-muted-foreground text-xs mt-1">Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <hr className="border-border mx-2" />
                  <div className="px-2 py-1">
                    <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted cursor-pointer">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>Profile</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted cursor-pointer">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.83-.05 1.764-.07 2.7-.07 1.935 0 3.5 1.565 3.5 3.5 0 1.935-1.565 3.5-3.5 3.5s-3.5-1.565-3.5-3.5c0-.934.479-1.867 1.305-2.552V6.304c0-.498.07-1.005.222-1.497A4.925 4.925 0 0110.325 4.317z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 20l4 2-4-2M12 22l-4-2 4-2m-5 4h18"></path>
                      </svg>
                      <span>Settings</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted cursor-pointer" onClick={handleLogout}>
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Button 
                  as={Link}
                  to="/register"
                  variant="primary"
                  className="text-sm"
                >
                  Register
                </Button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
  }),
  onLogout: PropTypes.func,
};
