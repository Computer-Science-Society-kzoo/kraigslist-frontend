import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export function Signup(): JSX.Element {
  return (
    <div>
        <span className="LoginSignupForm-Inline">
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input autoComplete="off" placeholder="First Name" required />
          </FormControl>

          <FormControl isRequired>
            <FormLabel> Last Name </FormLabel>
            <Input autoComplete="off" placeholder="Last Name" required />
          </FormControl>
        </span>

        <span className="LoginSignupForm-Inline">
          <FormControl isRequired>
            <FormLabel> Class Year </FormLabel>
            <Select placeholder="Select Year">
              <option>Freshman</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel> Preferred Name </FormLabel>
            <Input autoComplete="off" placeholder="Preferred Name" required />
          </FormControl>

          {/* <FormControl isRequired>
            <FormLabel> Userame </FormLabel>
            <Input placeholder="Username" required />
          </FormControl> */}
        </span>

        <FormControl isRequired>
          <FormLabel> Email </FormLabel>
          <Input placeholder="Email" required />
        </FormControl>

        <FormControl isRequired>
          <FormLabel> Password </FormLabel>
          <Input placeholder="Password" required />
        </FormControl>

        <FormControl>
          <Button
            colorScheme="orange"
            type="submit"
            variant="solid"
            loadingText="Signing Up"
          >
            Sign Up
          </Button>
        </FormControl>
    </div>
  );
}
