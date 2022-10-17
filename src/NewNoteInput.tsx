import React from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';


interface NewNoteInputProps {
    addNote(note: string): void;
}

export const NewNoteInput:React.FC<NewNoteInputProps> = ({ addNote }) => {
    const [note, setNote] = React.useState("");

    const updateNote = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNote(event.target.value);
    };

    const onAddNoteClick = () => {
        addNote(note);
        setNote("");
    };


    return (
        <div>
            <input onChange={updateNote} value={note} type="text" name="note" placeholder="Note" />
            <Button colorScheme={"red"} onClick={onAddNoteClick}>Add note</Button>
        </div>
    );
}