import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Routes, Route } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { userQuery } from '../utils/data';
import { client } from '../client';
import { useRef } from 'react';
import logo from '../assets/logoWhiteBg.svg'
import { fetchUser } from '../utils/fetchUser';

export default function Home() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState(null);
    const scrollRef = useRef();

    const userInfo=fetchUser();
    useEffect(() => {
        //sub is the google id(google oauth 2.0)
        const query = userQuery(userInfo?.sub);
        const getData = async () => {
            try {
                const data = await client.fetch(query);
                setUser(data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    },[]);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    });
    return (
        <div className="flex h-screen flex-col bg-gray-50 transition-height duration-75 ease-out md:flex-row">
            <div className="hidden h-screen flex-initial md:flex">
                <Sidebar user={user && user} />
            </div>
            {/* Top bar for small screens */}
            <div className="flex flex-row md:hidden">
                <div className="shadow-md flex w-full flex-row items-center justify-between p-3">
                    <HiMenu
                        fontsize={40}
                        className="cursor-pointer"
                        onClick={() => setToggleSidebar(true)}
                    />
                    <Link to="/">
                        <img src={logo} alt="" className='w-12' />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} className="w-10" alt="img"/>
                    </Link>
                </div>
                {/* Sidebar for small screens */}
                {toggleSidebar && (
                    <div className="fixed z-10 h-screen w-4/5 animate-slide-in overflow-y-auto bg-white shadow-md">
                        <div className="absolute flex w-full items-center justify-end p-2">
                            <AiFillCloseCircle
                                fontSize={30}
                                className="cursor-pointer"
                                onClick={() => setToggleSidebar(false)}
                            />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                    </div>
                )}
            </div>

            <div className="h-screen flex-1 overflow-y-scroll pb-2" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/*" element={<Pins user={user && user} />} />
                </Routes>
            </div>
        </div>
    );
}
