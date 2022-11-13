export function main(){
  return;}
// import "./Filters.css";
// import { Divider, Heading, Stack } from "@chakra-ui/react";
// import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";

// //var filterData = "";
// //declare var filterData: any;

// declare global {
//   var filterData: string;
// }

// export function FiltersMenu() {
//   //globalThis.filterData = "";

//   let filterData = "Offer";
//   const [checkedItems, setCheckedItems] = useState([false, false]);

//   const allChecked = checkedItems.every(Boolean);
//   const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

//   const [filterCheck, setFilterCheck] = useState("");

//   function filterChange() {
//     //setFilterCheck(e.target.value);
//     filterData = filterCheck;
//     console.log(filterData);
//   }

  

//   // async function filterBy() {

//   //   console.log(checkedItems);
//   //   if (checkedItems[0] === true) {
//   //     axios
//   //       .get(`${RestAPIHOST}/api/posts/getPostsByType`, {
//   //         params: { type: "offer" }
//   //       },

//   //       )
//   //       .then((res) => {
//   //         console.log(res.data);
//   //         filterData = res.data;

//   //       })
//   //       .catch((err) => {
//   //         console.log(err);
//   //       }
//   //       );
//   //     //messageFailure("Missing infomration", "Please provide a text to search.");
//   //   } else if (checkedItems[1] === true) {
//   //     axios
//   //       .get(`${RestAPIHOST}/api/posts/getPostsByType`, {
//   //         params: { type: "request" }
//   //       },

//   //       )
//   //       .then((res) => {
//   //         console.log(res.data);
//   //         filterData = res.data;

//   //       })
//   //       .catch((err) => {
//   //         console.log(err);
//   //       }
//   //       );
//   //   } else if (allChecked === true) {
//   //     axios
//   //       .get(`${RestAPIHOST}/api/posts/searchPosts`, {
//   //         params: { type: "request" }
//   //       },

//   //       )
//   //       .then((res) => {
//   //         console.log(res.data);
//   //         filterData = res.data;

//   //       })
//   //       .catch((err) => {
//   //         console.log(err);
//   //       }
//   //       );
//   //   } else {
//   //       return;}
//   // }
  

//   return (
    
//     <div className="FiltersContainer">
//       <div className="FiltersContainer-InnerContainer">
//         <div className="FiltersContainer-InnerContainer-Category">
//           <Heading as={"h3"} size={"xs"}>
//             Request's Type
//           </Heading>


//           <Checkbox
//             isChecked={allChecked}
//             isIndeterminate={isIndeterminate}
//             colorScheme="orange"
//             onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
//           >
//             All
//           </Checkbox>
//           <Stack pl={6} mt={1} spacing={1}>
//             <Checkbox
//               colorScheme="orange"
//               isChecked={checkedItems[0]}
//               onChange={(e) => {setCheckedItems([e.target.checked, checkedItems[1]]); setFilterCheck("Offer"); filterChange();}}
//             >
//               Offer
//             </Checkbox>
//             <Checkbox
//               colorScheme="orange"
//               isChecked={checkedItems[1]}
//               onChange={(e) => {setCheckedItems([checkedItems[0], e.target.checked]); setFilterCheck("Request"); filterChange();}}
//             >
//               Requests
//             </Checkbox>
//           </Stack>
//           <Divider />
//         </div>
//       </div>
//     </div>
//   );
// }

// // function TypeFilter() {
// //   // const [checkedItems, setCheckedItems] = useState([false, false]);

// //   // const allChecked = checkedItems.every(Boolean);
// //   // const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

// //   return (
// //     <div className="FiltersContainer-InnerContainer-Category">
// //       <Heading as={"h3"} size={"xs"}>
// //         Request's Type
// //       </Heading>


// //       <Checkbox
// //         isChecked={allChecked}
// //         isIndeterminate={isIndeterminate}
// //         colorScheme="orange"
// //         onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
// //       >
// //         All
// //       </Checkbox>
// //       <Stack pl={6} mt={1} spacing={1}>
// //         <Checkbox
// //           colorScheme="orange"
// //           isChecked={checkedItems[0]}
// //           onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
// //         >
// //           Offer
// //         </Checkbox>
// //         <Checkbox
// //           colorScheme="orange"
// //           isChecked={checkedItems[1]}
// //           onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
// //         >
// //           Requests
// //         </Checkbox>
// //       </Stack>
// //       <Divider />
// //     </div>
// //   );
// // }
