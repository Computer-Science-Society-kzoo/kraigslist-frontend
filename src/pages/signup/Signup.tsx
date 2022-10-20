import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from '@chakra-ui/react'

export function Signup(): JSX.Element {
    return(
      <div>
        <h1>Signup page</h1>
        <form>
          <FormControl isRequired>
            <FormLabel> Email </FormLabel>
            <Input type="text" name="email" required/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder='First name' />
          </FormControl>

          <div>
            <FormLabel>
              First Name 
              <Input type="text" name="fName" required/>
            </FormLabel>
          </div>

          <div>
            <FormLabel>
              Last Name 
              <Input type="text" name="lName" required/>
            </FormLabel>
          </div>

          <div>
            <FormLabel>
              Prefered Name 
              <Input type="text" name="pName" required/>
            </FormLabel>
          </div>

          <div>
            <FormLabel>
              Year 
              <Input type="text" name="fName" required/>
            </FormLabel>
          </div>

          <div>
            <FormLabel>
              Password 
              <Input type="text" name="pword" required/>
            </FormLabel>
          </div>
        </form>
      </div>
    )
  }
  