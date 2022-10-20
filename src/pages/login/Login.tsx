import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup
} from '@chakra-ui/react'

export function Login(): JSX.Element {
  return(
    <div>
      <h1>Login page</h1>

      <form>
          <FormControl isRequired>
            <FormLabel> Email </FormLabel>
            <Input placeholder="Email" required/>
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
            loadingText='Logging In'
            >
              Login
            </Button>
          </FormControl>

        </form>
        
    </div>

  )
}