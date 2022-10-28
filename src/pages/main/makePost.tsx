import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    ButtonGroup,
    useToast,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Select,
    InputRightElement,
    InputLeftElement,
    InputGroup,
} from "@chakra-ui/react";

import axios from "axios";
import imageCompression from "browser-image-compression";
import e from "express";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { setAuthRedux, setCreatePost } from '../../redux/coreReducer'
import { selectCreatePostSate } from "../../redux/coreReducer";
import { useSelector, useDispatch} from "react-redux";
import React from "react";


export function MakePost(): JSX.Element {
    const toast = useToast();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<FileList | null>(null);
    const [image1, setImage1] = useState<File | null>(null);

    const [validTitle, setValidTitle] = useState(true);
    const [validText, setValidText] = useState(true);
    const [validType, setValidType] = useState(true);
    const [validCategory, setValidCategory] = useState(true);


    const [shakeTitleStyle, setShakeTitleStyle] = useState("");
    function shakeTitle() {
        setValidTitle(false);
        setShakeTitleStyle("jello-vertical")
        setTimeout(() => {
            setShakeTitleStyle("")
        }, 800);
    }

    const [shakeTextStyle, setShakeTextStyle] = useState("");
    function shakePassword() {
        setValidText(false);
        setShakeTextStyle("jello-vertical")
        setTimeout(() => {
            setShakeTextStyle("")
        }, 800);
    }



    // function test(value: string){
    //   setEmail(value)
    //   console.log(email)
    // }

    var picture: File | null = null;
    const [token, setToken, removeToken] = useCookies(["auth"]);
    const dispatch = useDispatch();
    function setAuth(token: string) {
        setToken("auth", token, { secure: true, sameSite: "strict" });
        dispatch(setAuthRedux(true))
    }

    //Image compression function
    async function handleImageUpload(e: any) {
 
        //const imageFile = e.target.files[0];
        const imageFile = e.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            //await uploadToServer(compressedFile); // write your own logic
            //setImage1(compressedFile);
            picture = compressedFile;
            console.log(picture);
            //axios.post("http://localhost:8000/api/posts/", {
            //return(compressedFile);
        } catch (error) {
            console.log(error);
        }

    }

    async function makePost(title: string, text: string, type: string, category: string, picture: File | null) {
        //alert("Email is: " + email + " Password is: " + password)
        // var r = new global.FileReader();
        // //r.onload = function(){ alert(r.result); };
        // if (picture) {
        //     r.readAsArrayBuffer(picture);
        //     console.log(r);
        // }
        if (title === "") {
            messageFailure("Missing infomration", "Please provide your email address");
            shakeTitle()
        } else if (text === "") {
            messageFailure("Missing infomration", "Please provide your password");
            shakePassword()
        } else if (type === "") {
            messageFailure("Missing infomration", "Please provide your password");
            shakePassword()
        } else if (category === "") {
            messageFailure("Missing infomration", "Please provide your password");
            shakePassword()
        } else {
            axios
                .post("http://localhost:3000/api/posts/makepost", {
                    title: title,
                    text: text,
                    type: type,
                    category: category,
                    img: picture,
                })
                .then((res) => {
                    console.log(res);
                    setAuth(res.data);
                    messageSuccess("Success!", "You have successfully made a post");

                })
                .catch((err) => {
                    console.log(err);
                        messageFailure("Error", "Something went wrong. Please try again later");
                    }
                );
        }
    }

    function messageSuccess(title: string, desc: string) {
        toast({
            title: title,
            description: desc,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "bottom"
        });
    }

    function messageFailure(title: string, desc: string) {
        toast({
            title: title,
            description: desc,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom"
        });
    }


    const isOpenRedux = useSelector(selectCreatePostSate);


    return (
        <div>
            <Modal isOpen={isOpenRedux} onClose={() => {dispatch(setCreatePost(false))}} >
                <ModalOverlay />
                <ModalContent>
                        <ModalHeader>Create Post</ModalHeader>
                        <ModalBody pb={6}>
                        <FormControl isRequired>
                        <FormLabel> Post Title </FormLabel>
                        <Input
                            isInvalid={!validTitle}
                            className={"default-transition " + shakeTitleStyle}
                            onChange={(el) => { setTitle(el.target.value); setValidTitle(true) }}
                            placeholder="Title"
                            required
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel> Post Description </FormLabel>
                        <Input
                            isInvalid={!validText}
                            className={"default-transition " + shakeTextStyle}
                            onChange={(el) => { setText(el.target.value); setValidText(true) }}
                            placeholder="Text"
                            required
                        />
                    </FormControl>  

                    <FormControl isRequired>
                        <FormLabel> Post Type </FormLabel>
                        <span className="LoginSignupForm-Inline">
                            {/* <FormLabel> Category </FormLabel> */}
                            
                            <Select 
                                placeholder='Select Type'
                                isInvalid={!validType}
                                onChange={(el) => { setType(el.target.value); setValidType(true) }}
                                required
                            >
                                <option value='option 1'>Request</option>
                                <option value='option 2'>Offer</option>
                            </Select>
                            
                            
                            <Select
                                placeholder='Select Category'
                                isInvalid={!validCategory}
                                onChange={(el) => { setCategory(el.target.value); setValidCategory(true) }}
                                required
                            >
                                <option value='option 1'>Category 1</option>
                                <option value='option 2'>Category 2</option>
                                <option value='option 3'>Category 3</option>
                            </Select>
                        </span>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                pointerEvents='none'
                                color='gray.300'
                                fontSize='1.2em'
                                children='$'
                                />
                                <Input placeholder='Enter Price' />
                            </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Offer/Request Deadline</FormLabel>
                            <Input
                            placeholder="Select Date and Time"
                            size="md"
                            type="datetime-local"
                            />
                    </FormControl>


                    <FormControl>
                        <FormLabel> Add image </FormLabel>
                        <span className="LoginSignupForm-Inline">

                            <Input
                                type="file" accept=".jpg, .jpeg, .png" onChange={(el) => handleImageUpload(el)}
                            />

                        </span>
                    </FormControl>
                        </ModalBody>
                    <ModalFooter>
                        <Button 
                            colorScheme="gray"
                            type="submit"
                            loadingText="Creating Post"
                            onClick={() => {makePost(title, text, type, category, picture)}}
                            mr={3}
                        >
                            Create Post
                        </Button>
                        <Button colorScheme='orange' onClick={() => {dispatch(setCreatePost(false))}}>
                        Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            
        </div>
    );
}
