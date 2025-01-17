import React, { useEffect } from 'react'
import { HStack, Button, Box, Container, VStack, Text, SimpleGrid,  } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useProductStore } from '@/store/product';
import ProductCard from '@/components/ProductCard';


const HomePage = () => {
    const {fetchProducts, products} = useProductStore();
   
    useEffect(()=>{
        fetchProducts();
    },[fetchProducts])

    return (
        <Container
         maxW={'container.xl'}
         py={12}
        >
            <VStack spaceX={8}>
                <Text
                as={"h2"}
                fontSize={"35px"}
                fontWeight={"bold"}
                bgGradient={"linear-gradient(to left, #22d3ee, #3b82f6)"}
                bgClip={"text"}
                textAlign={"center"}
                >
                    Current Products 🚀
                </Text>
                <SimpleGrid columns={{base: 1, md: 2, lg:3}} spacing={10} gap="40px" w={"full"}>
                    {products.map((product)=> (
                        <ProductCard key={product._id} product={product} />
                    ))}

                </SimpleGrid>
                {products.length === 0 &&(
                    <Text
                    fontSize={"xl"}
                    textAlign={"center"}
                    fontWeight={"bold"}
                    color={"gray.500"}               
                    >
                        No products found 😶 { " "}
                        <Link to={"/create"}>
                            <Text as={'span'} color={'blue.500'} _hover={{textDecoration: 'underline'}}>
                                Create a product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    )
}

export default HomePage
