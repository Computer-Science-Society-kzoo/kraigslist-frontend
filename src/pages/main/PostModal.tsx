import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Heading,
  Text,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { selectOpenPostSate } from "../../redux/coreReducer";
import { setOpenPost } from "../../redux/coreReducer";
import { selectPostModalRedux } from "../../redux/postModalReducer";
import Moment from "react-moment"
import './PostModal.css'
import axios from "axios";
import { RestAPIHOST } from "../..";
import { useState } from "react";
import { useCookies } from "react-cookie";

//Post Modal Interface
export function ModalPost(): JSX.Element {
  const isOpenRedux = useSelector(selectOpenPostSate);
  const dispatch = useDispatch();

  const post = useSelector(selectPostModalRedux);

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  function returnPriceText(price: number, type: string): string {
    if (type === "Other") {
      return "Price: $" + price
    } else {
      return type + " Price: $" + price
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken, removeToken] = useCookies(["auth", "myid"]);

  const myid = Number(token["myid"]);


  
  function startConversation(){
    setSending(true)
    axios.post(RestAPIHOST + "/api/messages/newconversation", {
      message: message,
      postID: post.postID,
    }, {
        headers: {
            Authorization: "Bearer " + token.auth,
        }}).then((res) => {
            setSending(false)
            setMessage("")
            dispatch(setOpenPost(false))
        }).catch((err) => {
            setSending(false)
            console.log(err)
            console.log(err.message)
        })
    }
    

    


  return (
    <div>
      <Modal
        isCentered 
        size={"3xl"}
        isOpen={isOpenRedux}
        onClose={() => {
          dispatch(setOpenPost(false));
        }}
      >
        <ModalOverlay />
        <ModalContent className="PostModalCont">
          <ModalCloseButton />
          <ModalBody>
            <div
              className="PostModalContainer"
              
            >
              <div className="PostModalContainer-Internal">
                <Heading
                  className="PostModalContainer-Internal-Title"
                  as={"h1"}
                  size={"md"}
                >
                  {post.title}
                </Heading>
                <Heading as={"h2"} size={"sm"}>
                  {post.username}
                </Heading>
                <Text className="PostModalContainer-Internal-Text" fontSize={"md"}>
                  {post.text}
                </Text>
              </div>
              {post.price !== null &&
                <div className="PostModalContainer-Internal-BottomFlex">
                  <Heading as={"h2"} size={"xs"}>
                    {returnPriceText(post.price, post.type )}
                  </Heading>
                </div>
                }
              {post.img !== "" && post.img !== null && (
                <img
                  src={post.img}
                  alt={post.title + " image"}
                  className="PostModalContainer-Internal-Image"
                />
              )}
              <div className="PostModalContainer-Internal-BottomFlex">
                
                  <Heading as={"h2"} size={"xs"}>
                    Created at <Moment format="LLL">{post.date_created}</Moment>
                  </Heading>
                  <Heading as={"h2"} size={"xs"}>
                    Deadline: <Moment format="LLL">{post.offer_deadline}</Moment>
                  </Heading>
                </div>
            </div>
            
          </ModalBody>
          {myid !== post.userID && 
          <ModalFooter>
            <span className="PostModalStartConversation">
                <InputGroup size="md">
                    <Input
                    outline={"1px solid var(--k-orange)"}
                    borderRadius={"12px 0px 0px 12px"}
                    pr="4.5rem"
                    type="text"
                    placeholder="Enter message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={sending}
                    focusBorderColor={"orange.500"}
                    />
                </InputGroup>
                <Button
                colorScheme="orange"
                mr={3}
                onClick={() => {
                    startConversation()
                }}
                >
                Start Conversation
                </Button>
            </span>

    
          </ModalFooter>
}
        </ModalContent>
      </Modal>
    </div>
  );
}
