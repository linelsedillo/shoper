import { Box, Heading, HStack, IconButton, Image, Input, Stack, Text, useToastStyles, VStack,Textarea, Group, Button, useDialog } from '@chakra-ui/react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import React, { useState } from 'react'
import { useColorModeValue } from './ui/color-mode'
import { useProductStore } from '@/store/product';
import { Toaster, toaster } from "@/components/ui/toaster"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Field } from './ui/field';
import { dialog } from 'framer-motion/client';

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bgColor = useColorModeValue("white", "gray.800");
    const {deleteProduct, updateProduct} = useProductStore()
    const [updatedProduct, setUpdatedProduct] = useState(product)
   
    const [open, setOpen] = useState(false)  //bind dialog state

    if (!product || !product.name || !product.image || !product.price) {
        console.error("Product details are incomplete or missing.");
        return null; // Return null to render nothing if details are incomplete
    }
    const handleUpdate = async(pid, updatedProduct) =>{
       const {success, message } = await updateProduct(pid, updatedProduct)
       if(!success) {
        toaster.create({
            title:"Error",
            description: message,
            status: "error",
            duration: 3000,
            isClosable: true,
            type:"error"

        })

        } else {

            setOpen(false); //close the dialog
            toaster.create({
                title:"Success",
                description: "Product updated successfully",
                status: "success",
                isClosable: true,
                type:"success"

            });
        }
    }

    const handleDelete = async (pid) =>{
        const {success, message}= await deleteProduct(pid)
        if(!success) {
            toaster.create({
                title:"Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
                type:"error"

            })

        } else {
            toaster.create({
                title:"Success",
                description: message,
                status: "success",
                isClosable: true,
                type:"success"

            })
        }
    }

    return (
        <>
       <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"}
       _hover={{ transform: "translateY(-10px)", shadow: "xl" }} bg={bgColor}>
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>
               <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    ${product.price}
               </Text>
               <HStack>
                    <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                        <DialogTrigger asChild>
                         <IconButton aria-label='Edit' bg='blue.400'><CiEdit /></IconButton>
                        </DialogTrigger>
                        <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Dialog Title</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                           <VStack>
                                <Input 
                                    placeholder='Product Name'
                                    name='name'
                                    value={updatedProduct.name}
                                    onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value}) }
                                />
                                <Input 
                                    placeholder='Price'
                                    name='price'
                                    type='number'                        
                                    value={updatedProduct.price}
                                    onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value}) }
                                />
                                <Input 
                                    placeholder='Image URL'
                                    name='image'
                                    value={updatedProduct.image}
                                    onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value}) }
                                />
                                
                            </VStack>
                        </DialogBody>
                        <DialogFooter>
                            <Button onClick={()=> {handleUpdate(product._id, updatedProduct)}}>Save</Button>
                            <DialogActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogActionTrigger>                            
                        </DialogFooter>
                        <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot >
                    <IconButton aria-label='Delete' bg='red.400'  onClick={()=> handleDelete(product._id)} >
                        <MdDelete />
                    </IconButton>
               </HStack>
            </Box>
            
            <Toaster />
       </Box>
       </>
    )
}

export default ProductCard
