import { Modal,
         ModalOverlay,
         ModalContent,
         ModalHeader,
         ModalBody,
         ModalCloseButton,
         ModalFooter,
         Button,
         Heading,
         Text,
        } from "@chakra-ui/react"
import  { useSelector, useDispatch } from "react-redux";
import  { selectOpenPostSate } from "../../redux/coreReducer";
import { setOpenPost } from "../../redux/coreReducer";
import { thisPostTitle } from "./MainPage"
import { thisPostText } from "./MainPage"
import { thisPostDate } from "./MainPage"

//Post Modal Interface
interface ModalPost {
    title: string;
    username: string;
    text: string;
    date: string;
    type: string;
    categories: string[];
    img: string;
    key: number;
  }

export function ModalPost(): JSX.Element {

    const isOpenRedux = useSelector(selectOpenPostSate);
    const dispatch = useDispatch();

    return(
        <div>
            <Modal isOpen={isOpenRedux} onClose={() => {dispatch(setOpenPost(false))}}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{thisPostTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>{thisPostText}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => {dispatch(setOpenPost(false))}}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </div>
    )
}