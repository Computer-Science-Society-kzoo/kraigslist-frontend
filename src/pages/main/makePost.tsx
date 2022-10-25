import { Button, Container, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import "./Post.css";
import "./MainPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FiltersMenu } from "./Filters";
import Split from 'react-split'
import './Split.css';
import imageCompression from 'browser-image-compression';

import { useDispatch } from "react-redux";
import { setAuthRedux } from '../../redux/coreReducer'



export function makePostPage(): JSX.Element {
  const [image, setImage] = useState<File | null>(null);
  const [token, setToken, removeToken] = useCookies(["auth"]);
  
  const dispatch = useDispatch();

  function setAuth(token: string) {
    setToken("auth", token, { secure: true, sameSite: "strict" });
    dispatch(setAuthRedux(true))
  }

  async function createPost(email: string, password: string) {
    //alert("Email is: " + email + " Password is: " + password)
    if (email === "" && password === "") {
      axios
        .post("http://localhost:3000/api/auth/makepost", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          setAuth(res.data);
          console.log(res);
        })
        };
    }
  

  //Image compression function
  async function handleImageUpload(e: any) {

    const imageFile = e.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
  
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
  
      //await uploadToServer(compressedFile); // write your own logic
      setImage(compressedFile);
      //return(compressedFile);
    } catch (error) {
      console.log(error);
    }
  
  }
  return (
    <Split className="split MainPageContainer" sizes={[20, 80]} maxSize={[500, Infinity]} minSize={[240, 500]} expandToMin={false}>
      <FiltersMenu />
      <div className="MainPageContainer-PostsContainer">
      <FormControl isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          type="file" accept="image/*" 
        />
        <Button
            colorScheme="orange"
            type="submit"
            variant="solid"
            loadingText="Logging In"
            onClick={(event) => handleImageUpload(event)}
          >
            Upload
          </Button>
        {/* onChange="handleImageUpload(event)" */}
      </FormControl>
      </div>
    </Split>
  );
}
