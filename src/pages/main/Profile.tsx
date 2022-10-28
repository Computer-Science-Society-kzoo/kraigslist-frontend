import { EditIcon } from "@chakra-ui/icons";
import { 
    FormControl,
        FormLabel,
        Heading,
        Input,
        InputGroup,
        InputRightAddon,
        Stack,
        } from "@chakra-ui/react";
import { Form } from "react-router-dom";

export function Profile(): JSX.Element {
    return(
        <div>
            <Header />
            <ProfileInfo/>
        </div>
    );
}

function Header(): JSX.Element {
    return (
        <Heading as='h2' size='md'>
            Profile Settings
        </Heading>
    )
}

function ProfileInfo(): JSX.Element {
    return (
        <div>
            <Stack>
                <FormControl isDisabled={true}>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                        <Input placeholder="First Name" />
                        <InputRightAddon children={<EditIcon/>}/>
                    </InputGroup>
                </FormControl>
            </Stack>
        </div>
    )
}