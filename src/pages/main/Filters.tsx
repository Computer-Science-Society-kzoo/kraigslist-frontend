import "./Filters.css";
import { Divider, Heading, Stack } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useState } from "react";

export function FiltersMenu() {
  return (
    <div className="FiltersContainer">
      <div className="FiltersContainer-InnerContainer">
        <TypeFilter />
      </div>
    </div>
  );
}

function TypeFilter() {
  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <div className="FiltersContainer-InnerContainer-Category">
      <Heading as={"h3"} size={"xs"}>
        Request's Type
      </Heading>

      
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        colorScheme="orange"
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      >
        All
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
        <Checkbox
          colorScheme="orange"
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Offer
        </Checkbox>
        <Checkbox
          colorScheme="orange"
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Requests
        </Checkbox>
      </Stack>
      <Divider />
    </div>
  );
}
