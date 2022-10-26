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
} from "@chakra-ui/react";

import axios from "axios";
import imageCompression from "browser-image-compression";
import e from "express";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setAuthRedux } from '../../redux/coreReducer'


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
        var r = new global.FileReader();
        //r.onload = function(){ alert(r.result); };
        if (picture) {
            r.readAsArrayBuffer(picture);
            console.log(r);
        }
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
                    img: r.result,
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

    return (
        <div className="LoginSignupForm-Container">
            <FormControl isRequired>
                <FormLabel> Title </FormLabel>
                <Input
                    isInvalid={!validTitle}
                    className={"default-transition " + shakeTitleStyle}
                    onChange={(el) => { setTitle(el.target.value); setValidTitle(true) }}
                    placeholder="Title"
                    required
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel> Text </FormLabel>
                <Input
                    isInvalid={!validText}
                    className={"default-transition " + shakeTextStyle}
                    onChange={(el) => { setText(el.target.value); setValidText(true) }}
                    placeholder="Text"
                    required
                />
            </FormControl>

            <FormControl isRequired>
                <span className="LoginSignupForm-Inline">
                    {/* <FormLabel> Category </FormLabel> */}
                    <Input
                        isInvalid={!validType}
                        //className={shakeTypeStyle}
                        onChange={(el) => { setType(el.target.value); setValidType(true) }}
                        placeholder="Type"
                        required
                    />
                    <Input
                        isInvalid={!validCategory}
                        //className={shakeCategoryStyle}
                        onChange={(el) => { setCategory(el.target.value); setValidCategory(true) }}
                        placeholder="Category"
                        required
                    />
                </span>
            </FormControl>


            <FormControl>
                <FormLabel> Add image </FormLabel>
                <span className="LoginSignupForm-Inline">

                    <Input
                        type="file" accept=".jpg, .jpeg, .png" onChange={(el) => handleImageUpload(el)}
                    />
                    <Button
                        colorScheme="orange"
                        type="submit"
                        variant="solid"
                        loadingText="Logging In"
                        onClick={() => {makePost(title, text, type, category, picture)}}
                    >
                        Create Post
                    </Button>
                </span>
            </FormControl>
        </div>
    );
}
