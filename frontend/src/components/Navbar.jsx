import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useColorMode, useColorModeValue } from './ui/color-mode';
import {IoMoon} from "react-icons/io5";
import { LuSun } from 'react-icons/lu';

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Container maxW={"1010px"} px={4}>
            <Flex 
            h={16} 
            alignItems={"center"} 
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}>
                <Link to={"/"}>
                    <Text
                        fontSize={{base: "22px", sm: "28px"}}
                        fontWeight={"bold"}
                        // color="red"
                        textTransform={"uppercase"}
                        textAlign={"center"}
                        bgGradient='linear-gradient(to left, rgb(121, 40, 202), rgb(255, 0, 128))'
                        bgClip='text'
                    >
                        Product Store 🛒
                    </Text>
                </Link>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                           
                            <CiSquarePlus fontSize={20} />
                        </Button>
                    </Link>   
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon/> : <LuSun size={20} />}
                    </Button>                 
                </HStack>
                
            </Flex>
        </Container>
    )
}

export default Navbar
