import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
  ButtonGroup
} from '@chakra-ui/react'

export function Signup(): JSX.Element {
    return(
      <div>
        <h1>Signup page</h1>
        <form>
          
          <FormControl isRequired>
            <FormLabel> Email </FormLabel>
            <Input placeholder="Email" required/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel> Userame </FormLabel>
            <Input placeholder="Username" required/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder='First Name' required />
          </FormControl>

          <FormControl isRequired>
            <FormLabel> Last Name </FormLabel>
            <Input placeholder="Last Name" required/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel> Preferred Name </FormLabel>
            <Input placeholder="Preferred Name" required/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel> Class Year </FormLabel>
            <Select placeholder='Select Year'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel> Password </FormLabel>
            <Input placeholder="Password" required/>
          </FormControl>

          <FormControl>
            <Button 
            colorScheme='orange'
            type='submit'
            variant='solid'
            loadingText='Signing Up'
            >
              Sign Up
            </Button>
          </FormControl>
        </form>
      </div>
    )
  }
  