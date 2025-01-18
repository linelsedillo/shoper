
import {Outlet} from 'react-router-dom';

import React from 'react'
import Navbar from '@/components/Navbar';

const MainLayout = () => {
    console.log("adada")
    return (
        <>
            <Navbar/>
            <Outlet />
        </>
    )
}

export default MainLayout
