import { Home } from '@mui/icons-material'
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/logoWhiteBg.svg'

export default function Sidebar({ user, closeToggle }) {
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false)
    }

    const isNotActiveStyle =
        'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
    const isActiveStyle =
        'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

    //category
    const categories = [
        { name: 'Animals' },
        { name: 'Wallpapers' },
        { name: 'Photography' },
        { name: 'Gaming' },
        { name: 'Coding' },
        { name: 'Others' },
    ]
    return (
        <div className="h-scrollbar flex h-full min-w-210 flex-col justify-between overflow-y-scroll bg-white">
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="my-6 flex w-20 items-center gap-2 px-5 pt-1"
                    onClick={handleCloseSidebar}
                >
                    <img src={logo} alt="" className="w-full" />
                </Link>

                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                        onClick={handleCloseSidebar}
                    >
                        <Home /> Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) =>
                                isActive ? isActiveStyle : isNotActiveStyle
                            }
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            {user&&(
                <Link to={`user.profile/${user._id}`} className="flex my-5 mb-3 items-center gap-2 p-2 bg-white rounded-lg shadow-lg mx-3 md:cursor-not-allowed"
                onClick={handleCloseSidebar}>
                    <img className="h-10 w-10 rounded-full" src={user.image} alt="user-profile" />
                    <p>{user.userName}</p>
                </Link>
            )}
        </div>
    )
}
