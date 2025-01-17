import { useState } from 'react';

import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from './components/ui/color-mode';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
      </Route>
     
    </>

  )
)

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Box minH={"100vh"}  bg={useColorModeValue("gray.100", "gray.900") }>
        <RouterProvider router={router} />
      </Box>
    </>
  )
}

export default App
