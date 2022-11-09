import { Heading, InputGroup, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import e from "express";

export function SearchBar(): JSX.Element {

  const [text, setText] = useState("");


  async function search(text: string) {

    console.log(text);        
    if (text === "") {
      return
        //messageFailure("Missing infomration", "Please provide a text to search.");
    } else {
        axios
            .get("http://localhost:3000/api/posts/searchPosts", {
                params : {text: text}},
            
            )
            .then((res) => {
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err);
                }
            );
    }
}


  return (
    <div>
      <Heading as="h2" size="xs" variant="outlined">
        <InputGroup size="sm"
        width={768}
        outline="1px solid #F6AD55"
        borderRadius={"10px 10px 10px 10px"}
        >
          <IconButton 
          aria-label="Search database" 
          icon={<SearchIcon />} 
          borderRadius={"10px 0px 0px 10px"}
          colorScheme="orange" 
          onClick={() => search(text)}
          />
          <Input 
          placeholder="Search" 
          borderRadius={"0px 10px 10px 0px"}
          onChange={(e) => setText(e.target.value)}
          focusBorderColor="orange.500"
          _placeholder={{ color: 'orange.500' }}
          />
        </InputGroup>
      </Heading>
    </div>
  );
}
