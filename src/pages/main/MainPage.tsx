import { Checkbox, Container, Divider, Heading, IconButton, Input, InputGroup, Stack, Text } from "@chakra-ui/react";
import "./Post.css";
import "./MainPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
//import { FiltersMenu } from "./Filters";
import Split from 'react-split'
import './Split.css';
import { MakePost } from "./makePost";
import { SearchBar } from "../../components/SearchBar";
import { SearchIcon } from "@chakra-ui/icons";
//import { filterData } from "./Filters";
import "./Filters.css";

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

function Post(post: Post): JSX.Element {
  return (
    <>
      <div className="PostContainer">
        <div className="PostContainer-Internal">
          <Heading as={"h1"} size={"md"}>
            {post.title}
          </Heading>
          <Heading as={"h2"} size={"sm"}>
            {post.username}
          </Heading>
          <Text fontSize={"md"}>{post.text}</Text>
          <div className="PostContainer-Internal-BottomFlex">
            <Heading as={"h2"} size={"xs"}>
              {post.type}
            </Heading>
            <Heading as={"h2"} size={"xs"}>
              {post.date}
            </Heading>
          </div>
        </div>
        {post.img !== null && <img src={post.img} alt="post image" />}
      </div>
    </>
  );
}

export function MainPage(): JSX.Element {
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

  async function getPosts() {
    console.log(token.auth);
    axios
      .get("http://localhost:3000/api/posts", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPosts(parsePosts(res.data));
      });
  }

  // useEffect(() => {
  //   if (text != "") {
  //     search(text);
  //   }
  //   else {
  //     getPosts();
  //   }
  // }, []);
  useEffect(() => {
    getPostsMaster(text, filterCheck);
  }, []);


  const [text, setText] = useState("");



  async function search(text: string) {

    console.log(text);
    if (text === "") {
      getPosts();
      //messageFailure("Missing infomration", "Please provide a text to search.");
    } else {
      axios
        .get("http://localhost:3000/api/posts/searchPosts", {
          params: { text: text }
        },

        )
        .then((res) => {
          console.log(res.data);
          setPosts(parsePosts(res.data));

        })
        .catch((err) => {
          console.log(err);
        }
        );
    }
  }

  async function getPostsMaster(text: string, filterCheck: any) {
    await filterChange();
    console.log(text);
    console.log(filterCheck);
    axios
      .get("http://localhost:3000/api/posts/master", {
        params: { text: text, filter: filterCheck }
      },

      )
      .then((res) => {
        console.log(res.data);
        setPosts(parsePosts(res.data));

      })
      .catch((err) => {
        console.log(err);
      }
      );
  }


  // useEffect(() => {
  //   if (text != "") {
  //     search(text);
  //   }
  //   else {
  //     getPosts();
  //   }
  // }, []);

  useEffect(() => {
    getPostsMaster(text, filterCheck);
  }, []);

  const dummyPost: Post = {
    title: "Need a drive to Chicago!",
    username: "Michael",
    text: "Anyone driving from Kalamazoo to Chicago this upcoming Friday (September 30th) in the late afternoon (3-4 PM ET)? I need a ride, I can chip in for the gas!",
    date: "03.09.2021",
    type: "Request",
    categories: [""],
    img: "/images/temp/dummyPost.png",
    key: 0,
  };

  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const [filterCheck, setFilterCheck] = useState("");

  async function filterChange() {
    if (checkedItems[0] && !checkedItems[1] && !checkedItems[2] && !(checkedItems[3])) {
      setFilterCheck("Offer");
    }
    else if (checkedItems[1] && !(checkedItems[3]) && !checkedItems[0] && !checkedItems[2]) {
      setFilterCheck("Request");
    }
    else if (checkedItems[2] && !(checkedItems[3]) && !checkedItems[1] && !checkedItems[0]) {
      setFilterCheck("Price:asc");
    }
    else if (checkedItems[3] && !(checkedItems[2]) && !checkedItems[1] && !checkedItems[0]) {
      setFilterCheck("Price:desc");
    }
    else {
      setFilterCheck("");
    }
    //setFilterCheck(e.target.value);
    //filterData = filterCheck;

  } //do we need cases for multiple filters being checked?

  return (
    <Split className="split MainPageContainer" sizes={[20, 80]} maxSize={[500, Infinity]} minSize={[240, 500]} expandToMin={false}>
      <div className="FiltersContainer">
        <div className="FiltersContainer-InnerContainer">
          <div className="FiltersContainer-InnerContainer-Category">
            <Heading as={"h3"} size={"xs"}>
              Request's Type
            </Heading>


            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              colorScheme="orange"
              onChange={(e) => { setCheckedItems([e.target.checked, e.target.checked]); getPostsMaster(text, filterCheck) }}
            >
              All
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
              <Checkbox
                colorScheme="orange"
                isChecked={checkedItems[0]}
                onChange={(e) => { setCheckedItems([e.target.checked, checkedItems[1]]); getPostsMaster(text, filterCheck) }}
              //onClick={() => getPostsMaster(text, filterCheck)}
              >
                Offer
              </Checkbox>
              <Checkbox
                colorScheme="orange"
                isChecked={checkedItems[1]}
                onChange={(e) => { setCheckedItems([checkedItems[0], e.target.checked]); getPostsMaster(text, filterCheck) }}
              //onClick={() => getPostsMaster(text, filterCheck)}
              >
                Requests
              </Checkbox>
              <Checkbox
                colorScheme="orange"
                isChecked={checkedItems[2]}
                onChange={(e) => { setCheckedItems([checkedItems[0], e.target.checked]); getPostsMaster(text, filterCheck) }}
              //onClick={() => getPostsMaster(text, filterCheck)}
              >
                Price: Low to High
              </Checkbox>
              <Checkbox
                colorScheme="orange"
                isChecked={checkedItems[3]}
                onChange={(e) => { setCheckedItems([checkedItems[0], e.target.checked]); getPostsMaster(text, filterCheck) }}
              //onClick={() => getPostsMaster(text, filterCheck)}
              >
                Price: High to Low
              </Checkbox>
            </Stack>
            <Divider />
          </div>
        </div>
      </div>
      <div className="MainPageContainer-PostsContainer">
        <div>
          <Heading as="h2" size="xs" variant="outlined">
            <InputGroup size="sm"
              width={768}
              outline="1px solid #F6AD55"
              borderRadius={"10px 10px 10px 10px"}
            >
              <IconButton
                aria-label="Search database"
                icon={<SearchIcon />}
                borderRadius={"10px 0px 0px 10px"}
                colorScheme="orange"
                onClick={() => getPostsMaster(text, filterCheck)}
              />
              <Input
                placeholder="Search"
                borderRadius={"0px 10px 10px 0px"}
                onChange={(e) => { setText(e.target.value); getPostsMaster(text, filterCheck) }}
                focusBorderColor="orange.500"
                _placeholder={{ color: 'orange.500' }}
              />
            </InputGroup>
          </Heading>
        </div>


        {posts.map((post) => (
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
    </Split>
  );
}
