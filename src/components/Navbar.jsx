import React, { useState } from "react";
import { getAuth, signOut} from "firebase/auth"

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const auth = getAuth();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-slate-400 p-4 flex justify-between items-center">
      <div className="text-white text-xl">TodoMaster</div>
      <div>
        Dashboard
      </div>
      <div className="relative">
        {/* Avatar and name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleDropdown}>
          <img
            className="w-10 h-10 rounded-full"
            src={user?.avatar || "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"} // Assuming you pass avatar in user object
            alt="User Avatar"
          />
          <span className="text-white font-medium">{"Ayan Bera"}</span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
            <div className="py-2">
              <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Update Profile
              </a>
              <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <button
                
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                    signOut(auth).then(() => {
                      // Sign-out successful.
                      console.log("Sign-out successful.");
                    }).catch((error) => {
                      // An error happened.
                      console.log("An error happened.", error);
                    });
                  }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
