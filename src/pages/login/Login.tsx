import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup
} from '@chakra-ui/react'

import axios from 'axios'
import { useState } from 'react'

import './Login.css'

export function Login(): JSX.Element {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  // function test(value: string){
  //   setEmail(value)
  //   console.log(email)
  // }

  async function login(email: string, password: string) {
    //alert("Email is: " + email + " Password is: " + password)
    const json = JSON.stringify({ email: email, password: password })
    axios.post('http://localhost:3000/api/auth/login', { email: email, password: password })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <div>
      <h1>Login page</h1>

      <div className='LoginSignupForm'>
          <FormControl isRequired>
            <FormLabel> Email </FormLabel>
            <Input onChange={(el) => setEmail(el.target.value)} placeholder="Email" required/>
          </FormControl>
          

          <FormControl isRequired>
            <FormLabel> Password </FormLabel>
            <Input type={"password"} onChange={(el) => setPassword(el.target.value)} placeholder="Password" required/>
          </FormControl>

          <FormControl>
            <Button 
              colorScheme='orange'
              type='submit'
              variant='solid'
              loadingText='Logging In'
              onClick={() => login(email, password)}
            >
              Login
            </Button>
          </FormControl>

        </div>
        
    </div>

  )
}