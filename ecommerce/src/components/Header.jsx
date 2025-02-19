import React, { useContext, useState } from 'react'; // Import React and hooks for state and context management
import Logo from '../components/Logo'; // Import the Logo component to display the logo
import { IoSearch } from "react-icons/io5"; // Import search icon from react-icons
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon from react-icons
import { FaRegUserCircle } from "react-icons/fa"; // Import user icon from react-icons
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link component for navigation between routes
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for Redux state management
import { SummaryApi } from '../common'; // Import API endpoints from a common file
import { toast } from 'react-toastify'; // Import toast library for showing notifications
import { setUserDetails } from '../store/userSlice'; // Import Redux action to update user details
import Context from '../context'; // Import shared context for application-wide state

const Header = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch to dispatch actions
  const [menuDisplay, setMenuDisplay] = useState(false); // State to control visibility of the user menu
  const context = useContext(Context); // Access shared context for global state management
  const user = useSelector(state => state?.user?.user); // Fetch the current user from Redux state
const navigate = useNavigate();
const searchInput = useLocation();
console.log("searchInput",searchInput?.search.split("=")[1])
const[input,setInput] = useState(searchInput?.search.split("=")[1]);
const handlesearch =(e)=>{
const {value} = e.target;
setInput(value);
if(value){
navigate(`/search?q=${value}`,{ replace: true })
}else{
  navigate("/")
}
}
  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Make a fetch call to the logout API endpoint
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method, // Use API-defined method (GET/POST/etc.)
        credentials: 'include', // Include cookies for authentication
      });

      // Parse the API response
      const dataapi = await fetchData.json();

      if (dataapi.success) {
        // If logout is successful, show a success toast message
        toast.success(dataapi.message);
        dispatch(setUserDetails(null)); // Clear user details from Redux state
      } else if (dataapi.error) {
        // If logout fails, show an error toast message
        toast.error(dataapi.message);
      }
    } catch (error) {
      console.error("Logout failed:", error); // Log any unexpected errors
    }
  };

  return (
    <header className='h-16 shadow-md fixed w-full z-40 bg-white'>
      {/* Header container with fixed height and shadow */}
      <div className='h-full container mx-auto flex items-center justify-between px-4'>
        
        {/* Logo section */}
        <div>
          <Logo w={90} h={50} /> {/* Render the Logo component with specific width and height */}
        </div>

        {/* Search bar (visible only on larger screens) */}
        <div className='   hidden lg:flex items-center w-full justify-between max-w-sm  relative'>
          <input
          value={input}
          onChange={(e)=>handlesearch(e)}
            className='outline-none w-full max-w-sm border rounded-full focus-within:shadow-md py-1 px-2 text'
            type="text"
            placeholder='Search product here ....' // Placeholder text for search input
          />
          <div className='text-lg min-w-50 flex items-center justify-center rounded-r-full h-8 bg-red-600 absolute right-0 p-1 cursor-pointer'>
            <IoSearch /> {/* Render the search icon */}
          </div>
        </div>

        {/* User, cart, and authentication section */}
        <div className='flex gap-4 items-center'>

          {/* User profile icon and dropdown */}
          <div className='relative flex justify-center'>
            {user?._id && ( // Show user icon if user is logged in
              <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
                <FaRegUserCircle /> {/* Render the user icon */}
              </div>
            )}

            {/* Dropdown menu for user */}
            {menuDisplay && (
              <div className='absolute bg-white top-11 bottom-0 h-fit p-3 shadow-lg rounded'>
                <nav>
                  <Link
                    className='whitespace-nowrap hover:bg-slate-100 p-2'
                    to={"/admin-panel"} // Link to admin panel
                    onClick={() => setMenuDisplay(prev => !prev)} // Close menu on click
                  >
                    admin panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {/* Shopping cart icon with item count */}
          {user?._id && ( // Show cart only if user is logged in
            <Link to={"cart"} className='text-2xl cursor-pointer relative'>
              <div><FaShoppingCart /></div> {/* Render the cart icon */}
              <div className='bg-red-600 text-white w-4 h-4 rounded-full p-1 flex items-center justify-center absolute top-0 -right-1'>
                <p className='text-sm'>{context.countCartProducts}</p> {/* Display item count */}
              </div>
            </Link>
          )}

          {/* Authentication buttons */}
          <div>
            {user?._id ? ( // Show Logout button if user is logged in
              <button
                onClick={handleLogout} // Trigger logout on click
                className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700'
              >
                Logout
              </button>
            ) : ( // Show Login button if user is not logged in
              <Link
                to="/login" // Link to login page
                className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; // Export the Header component for use in other parts of the app
