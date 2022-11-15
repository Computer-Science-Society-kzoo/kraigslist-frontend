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
import { Post, PostProps } from "./MainPage";
import { AnimatePostItems } from "../../components/animations/MotionAnimations";

export function YourPostsPage(): JSX.Element {
  const [token, setToken, removeToken] = useCookies(["auth"]);

  const [posts, setPosts] = useState<PostProps[]>([]);

  function parsePosts(posts: any) {
    let parsedPosts: PostProps[] = [];
    posts.forEach((post: any) => {
      parsedPosts.push({
        date_created: post.dt_created,
        title: post.title,
        username: post.username,
        text: post.text,
        date: post.dt_created,
        type: post.type,
        categories: post.categories,
        img: post.img,
        userID: post.user_id,
        postID: post.id,
        price: post.price,
        deadline: post.offer_deadline,
      });
    });
    return parsedPosts;
  }


  async function myPosts(token2: any) {


    axios
      .get(`${RestAPIHOST}/api/posts/getmyposts`, {
        headers: {
          Authorization: `Bearer ${token.auth}`,
          Postid: 0
          //page: page,
        },
      })
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
  function sortPostsbyDate(posts: PostProps[]) {
    let sortedPosts: PostProps[] = posts.sort((a, b) => {
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
    <div className="MainPageContainer-PostsContainerYOURPOSTS MainPageContainer-PostsContainer MainPageContainer-PostsContainerMobile">

    
    <AnimatePostItems keyName={"YourPosts"}>
        {sortPostsbyDate(posts).map((post) => (
          <Post
            title={post.title}
            username={post.username}
            text={post.text}
            date={post.date}
            type={post.type}
            categories={post.categories}
            img={post.img}
            date_created={post.date_created} 
            userID={post.userID}
            postID={post.postID}
            price={post.price}
            deadline={post.deadline}
            key={post.postID}
          ></Post>
        ))}
      </AnimatePostItems>

      {posts.length === 0 &&
        <div className="ConversationContainer-NoConversations">
        <Text fontSize="xl" noOfLines={3}>
          You have no posts published yet
        </Text>
        <Text fontSize="xs" noOfLines={3}>
          Create a new post by clicking the button in the header / burger menu
        </Text>
      </div>
      }
    </div>
    // </Split>
  );
}
