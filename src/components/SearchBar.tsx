import { Heading, InputGroup, IconButton, Input } from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

export function SearchBar(): JSX.Element {
  return (
    <div className="search.css">
      <Heading as="h2" size="xs" variant="outlined">
        <InputGroup size="sm">
          <IconButton 
          aria-label="Search database" 
          icon={<SearchIcon />} 
          borderRadius={"10px 0px 0px 10px"}
          colorScheme="orange" 
          />
          <Input placeholder="Search" 
          borderRadius={"0px 10px 10px 0px"}
          focusBorderColor="orange.500"
          />
        </InputGroup>
      </Heading>
    </div>
  );
}
