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
    Textarea,
    IconButton,
    InputLeftAddon,
    Icon,
} from "@chakra-ui/react";

import { AttachmentIcon } from "@chakra-ui/icons";

import axios from "axios";
import imageCompression from "browser-image-compression";
import e from "express";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { setAuthRedux, setCreatePost } from '../../redux/coreReducer'
import { selectCreatePostSate } from "../../redux/coreReducer";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { isNullOrUndefined } from "util";
import { useNavigate } from "react-router-dom";
import { RestAPIHOST } from "../../index";

export function MakePost(): JSX.Element {

    const [token, setToken, removeToken] = useCookies(["auth"]);


    const toast = useToast();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [type, setType] = useState("");
    const [offer_deadline, setOfferDeadline] = useState<Date | null>(null);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<FileList | null>(null);
    const [image1, setImage1] = useState<File | null>(null);

    const [validTitle, setValidTitle] = useState(true);
    const [validText, setValidText] = useState(true);
    const [validType, setValidType] = useState(true);


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


    //A function that converts Uint8Array to bytes
    // function uint8ArrayToBase64(array: Uint8Array) {
    //     var CHUNK_SIZE = 0x8000; //arbitrary number
    //     var index = 0;
    //     var length = array.length;
    //     var result: string = '';
    //     var slice;
    //     while (index < length) {
    //         slice = array.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
    //         result += String.fromCharCode.apply(null, slice);
    //         index += CHUNK_SIZE;
    //     }
    //     return btoa(result);
    // }

    var bytee: string;
    //A function that converts array of bytes to base64
    function bytesToBase64(bytes: any) {
        var binary = '';
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        bytee = btoa(binary);
        return btoa(binary);
    }



    // function test(value: string){
    //   setEmail(value)
    //   console.log(email)
    // }
    var imageBuffer: Buffer; let bytes: any = [];
    let binaryString: any;
    let buffer: any = null;
    let view: any = null;
    var picture: any | null = null;
    var picture1: string;
    const dispatch = useDispatch();

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


            const reader = new FileReader();
            reader.readAsArrayBuffer(picture);
            reader.onload = () => {
                console.log(reader.result);
                bytesToBase64(new Uint8Array(reader.result as ArrayBuffer));
                picture = reader.result;
                //picture1 = reader.result.toString('base64');
                //picture = compressedFile;
                //var newBuff = btoa([].reduce.call(new Uint8Array(buffer),function(p,c){return p+String.fromCharCode(c)},''))

                // view = new Uint32Array(buffer);
                //imageBuffer = Buffer.from(reader.result as ArrayBuffer);
                //binaryString = imageBuffer
                bytes = new Uint8Array(reader.result as ArrayBuffer);
                //console.log(binaryString);
                // console.log(bytes);
                // console.log(String.fromCharCode(bytes));
                console.log(picture);
                //console.log(imageBuffer);
            };
            //reader.readAsArrayBuffer(picture);
            console.log("Array contains", bytes.byteLength, "bytes.");
            // console.log(picture);
            //axios.post("http://localhost:8000/api/posts/", {
            //return(compressedFile);
        } catch (error) {
            console.log(error);
        }

    }

    async function makePost(title: string, text: string, type: string, offer_deadline: Date | null, price: number, picture: any) {
        //alert("Email is: " + email + " Password is: " + password)
        // var r = new global.FileReader();
        // //r.onload = function(){ alert(r.result); };
        // if (picture) {
        //     r.readAsArrayBuffer(picture);
        //     console.log(r);
        // }

        console.log(picture);

        console.log(token.auth);
        if (title === "") {
            messageFailure("Missing infomration", "Please provide a title for your post.");
            shakeTitle()
        } else if (text === "") {
            messageFailure("Missing infomration", "Please provide a description for your post.");
            shakePassword()
        } else if (type === "") {
            messageFailure("Missing infomration", "Please select an offer or request type.");
            shakePassword()
        } else {
            axios
                .post(`${RestAPIHOST}/api/posts/makepost`, {
                    title: title,
                    text: text,
                    type: type,
                    offer_deadline: offer_deadline,
                    price: price,
                    img: picture,
                }, {
                    headers: {
                        "Authorization": "Bearer " + token.auth
                    }
                })
                .then((res) => {
                    console.log(res);
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
    const toHomepage = useNavigate();

    function closeAndCreatePost() {
        if (title === "") {
            messageFailure("Missing infomration", "Please provide a title for your post.");
            shakeTitle()
        } else if (text === "") {
            messageFailure("Missing infomration", "Please provide a description for your post.");
            shakePassword()
        } else if (type === "") {
            messageFailure("Missing infomration", "Please select an offer or request type.");
            shakePassword()
        } else
        {
            makePost(title, text, type, offer_deadline, parseInt(price), picture);
            dispatch(setCreatePost(false));
            toHomepage("/");
        }
    }

    return (
        <div>
            <Modal isOpen={isOpenRedux} onClose={() => { dispatch(setCreatePost(false)) }} >
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
                            <Textarea
                                isInvalid={!validText}
                                className={"default-transition " + shakeTextStyle}
                                onChange={(el) => { setText(el.target.value); setValidText(true) }}
                                placeholder="Description"
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
                                    <option value='Request'>Request</option>
                                    <option value='Offer'>Offer</option>
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
                                <Input placeholder='Enter Price'
                                    onChange={(el) => { setPrice(el.target.value); }} />
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Offer/Request Deadline</FormLabel>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                                onChange={(el) => { setOfferDeadline(el.target.valueAsDate); }}
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
                            onClick={() => { closeAndCreatePost() }}
                            mr={3}
                        >
                            Create Post
                        </Button>
                        <Button colorScheme='orange' onClick={() => { dispatch(setCreatePost(false)) }}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}
