import { Checkbox, Container, Divider, Heading, Stack, Text } from "@chakra-ui/react";
import "./MainPage.css";
import "./Post.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
//import { FiltersMenu } from "./Filters";
import Split from 'react-split'
import './Split.css';
import { RestAPIHOST} from "../../index";
import { Post } from "./MainPage";

interface Post {
  title: string;
  username: string;
  text: string;
  date: string;
  type: string;
  categories: string[];
  img: string;
  key: number;
}


export function YourPostsPage(): JSX.Element {
  const [token, setToken, removeToken] = useCookies(["auth"]);

  const [posts, setPosts] = useState<Post[]>([]);

  function parsePosts(posts: any) {
    let parsedPosts: Post[] = [];
    posts.forEach((post: any) => {
      parsedPosts.push({
        title: post.title,
        username: post.username,
        text: post.text,
        date: post.dt_created,
        type: post.type,
        categories: post.categories,
        img: post.img,
        key: post.id,
      });
    });
    return parsedPosts;
  }

  async function myPosts(token: any) {
    console.log(token);
    axios
      .get(`${RestAPIHOST}/api/posts/getMyPosts`,
        { withCredentials: true }

      )
      .then((res) => {
        console.log(res.data);
        setPosts(parsePosts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }




  //write a function to filter parsedPosts based on the given username
  // function filterPostsbyUsername(posts: Post[], username: string) {
  //   let filteredPosts: Post[] = posts.filter((post) => post.username === username);
  //   return filteredPosts
  // }

  // async function myPosts() {
  //   axios
  //     .get(`${RestAPIHOST}/api/posts/myPosts`, {
  //       params: { token: token["auth"] },
  //     },
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setPosts(parsePosts(res.data));

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     }
  //     );
  // }

  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const [filterCheck, setFilterCheck] = useState("");

  useEffect(() => {
    myPosts(token["auth"]);
  }, []);

  //write a function that sorts the posts by date
  function sortPostsbyDate(posts: Post[]) {
    let sortedPosts: Post[] = posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return sortedPosts;
  }


  return (
    // <Split className="split MainPageContainer" sizes={[20, 80]} maxSize={[500, Infinity]} minSize={[240, 500]} expandToMin={false}>
    //   <div className="FiltersContainer">
    //     <div className="FiltersContainer-InnerContainer">
    //       <div className="FiltersContainer-InnerContainer-Category">
    //         <Heading as={"h3"} size={"xs"}>
    //           Request's Type
    //         </Heading>
    //         <Checkbox
    //           isChecked={allChecked}
    //           isIndeterminate={isIndeterminate}
    //           colorScheme="orange"
    //           onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
    //         >
    //           All
    //         </Checkbox>
    //         <Stack pl={6} mt={1} spacing={1}>
    //           <Checkbox
    //             colorScheme="orange"
    //             isChecked={checkedItems[0]}
    //             onChange={(e) => { setCheckedItems([e.target.checked, checkedItems[1]]); setFilterCheck("Offer") }}
    //           >
    //             Offer
    //           </Checkbox>
    //           <Checkbox
    //             colorScheme="orange"
    //             isChecked={checkedItems[1]}
    //             onChange={(e) => { setCheckedItems([checkedItems[0], e.target.checked]); setFilterCheck("Request"); }}
    //           >
    //             Requests
    //           </Checkbox>
    //         </Stack>
    //         <Divider />
    //       </div>
    //     </div>
    //   </div>
    <div className="MainPageContainer-PostsContainer">

      {sortPostsbyDate(posts).map((post) => (
        <Post
          title={post.title}
          username={post.username}
          text={post.text}
          date={post.date}
          type={post.type}
          categories={post.categories}
          img={post.img}
          key={post.key}
        ></Post>
      ))}
    </div>
    // </Split>
  );
}
