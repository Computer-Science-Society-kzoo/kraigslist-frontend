import {
  Button,
  Checkbox,
  Divider,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import "./Post.css";
import "./MainPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
//import { FiltersMenu } from "./Filters";
import Split from "react-split";
import "./Split.css";
import { SearchIcon } from "@chakra-ui/icons";
//import { filterData } from "./Filters";
import "./Filters.css";
import { selectPullNewPosts, setOpenPost } from "../../redux/coreReducer";
import { useDispatch, useSelector } from "react-redux";
import { RestAPIHOST } from "../../index";
import Moment from "react-moment";
import { setPostModalRedux } from "../../redux/postModalReducer";
import {
  AnimateFilterEntry,
  AnimatePostItems,
} from "../../components/animations/MotionAnimations";

export interface PostProps {
  date_created: string;
  title: string;
  username: string;
  text: string;
  date: string;
  type: string;
  categories: string[];
  img: string;
  userID: number;
  postID: number;
  price: number;
  deadline: string;
}

let thisPostTitle = "";
export { thisPostTitle };

let thisPostText = "";
export { thisPostText };

let thisPostDate = "";
export { thisPostDate };

export function Post(post: PostProps): JSX.Element {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="PostContainer"
        onClick={() => {
          dispatch(
            setPostModalRedux({
              title: post.title,
              text: post.text,
              username: post.username,
              type: post.type,
              img: post.img,
              offer_deadline: post.date,
              userID: post.userID,
              postID: post.postID,
              price: post.price,
            })
          );
          dispatch(setOpenPost(true));
          thisPostTitle = post.title;
          thisPostText = post.text;
          thisPostDate = post.date;
        }}
      >
        <div className="PostContainer-Internal">
          <Heading
            className="PostContainer-Internal-Title"
            as={"h1"}
            size={"md"}
          >
            {post.title}
          </Heading>
          <Heading as={"h2"} size={"sm"}>
            {post.username}
          </Heading>
          <Text className="PostContainer-Internal-Text" fontSize={"md"}>
            {post.text}
          </Text>
          <div className="PostContainer-Internal-BottomFlex">
            <Heading as={"h2"} size={"xs"}>
              {post.type}
            </Heading>
            <Heading as={"h2"} size={"xs"}>
              <Moment format="LLL">{post.date}</Moment>
            </Heading>
          </div>
        </div>
        {post.img !== "" && post.img !== null && (
          <img
            src={post.img}
            alt={post.title + "image"}
            className="PostContainer-Internal-Image"
          />
        )}
      </div>
    </>
  );
}

export function MainPage(): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        userID: post.userID,
        postID: post.id,
        price: post.price,
        deadline: post.offer_deadline,
      });
    });
    return parsedPosts;
  }

  const [text, setText] = useState("");

  async function getPostsMaster(
    text: string,
    filterCheck: any,
    filterCheck2: any,
    filterCheck3: any
  ) {

    axios
      .get(`${RestAPIHOST}/api/posts/master`, {
        params: {
          text: text,
          filter: filterCheck,
          filter2: filterCheck2,
          filter3: filterCheck3,
        },
        headers: {
          Authorization: `Bearer ${token.auth}`,
          Postid: 0,
        },
      })
      .then((res) => {
        setPosts(parsePosts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [checkedItems, setCheckedItems] = useState([true, true, true, true]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const [filterCheck, setFilterCheck] = useState(["", "", ""]);

  async function filterChange() {
    if (
      checkedItems[0] &&
      !checkedItems[1] &&
      !checkedItems[2] &&
      !checkedItems[3]
    ) {
      setFilterCheck(["Offer", "", ""]);
    } else if (
      checkedItems[1] &&
      !checkedItems[0] &&
      !checkedItems[2] &&
      !checkedItems[3]
    ) {
      setFilterCheck(["Request", "", ""]);
    } else if (
      checkedItems[2] &&
      !checkedItems[0] &&
      !checkedItems[1] &&
      !checkedItems[3]
    ) {
      setFilterCheck(["Information", "", ""]);
    } else if (
      checkedItems[3] &&
      !checkedItems[0] &&
      !checkedItems[1] &&
      !checkedItems[2]
    ) {
      setFilterCheck(["Other", "", ""]);
    } else if (
      checkedItems[3] &&
      checkedItems[0] &&
      !checkedItems[1] &&
      !checkedItems[2]
    ) {
      setFilterCheck(["Offer", "Other", ""]);
    } else if (
      checkedItems[0] &&
      !checkedItems[1] &&
      checkedItems[2] &&
      !checkedItems[3]
    ) {
      setFilterCheck(["Offer", "Information", ""]);
    } else if (
      !checkedItems[0] &&
      checkedItems[1] &&
      checkedItems[2] &&
      !checkedItems[3]
    ) {
      setFilterCheck(["Request", "Information", ""]);
    } else if (
      !checkedItems[0] &&
      checkedItems[1] &&
      !checkedItems[2] &&
      checkedItems[3]
    ) {
      setFilterCheck(["Request", "Other", ""]);
    } else if (
      !checkedItems[0] &&
      !checkedItems[1] &&
      checkedItems[2] &&
      checkedItems[3]
    ) {
      setFilterCheck(["Other", "Information", ""]);
    } else if (
      checkedItems[0] &&
      checkedItems[1] &&
      !checkedItems[2] &&
      !checkedItems[3]
    ) {
      setFilterCheck(["Offer", "Request", ""]);
    } else if (
      checkedItems[0] &&
      checkedItems[1] &&
      checkedItems[2] &&
      !checkedItems[3]
    ) {
      setFilterCheck(["Offer", "Request", "Information"]);
    } else if (
      checkedItems[0] &&
      checkedItems[1] &&
      !checkedItems[2] &&
      checkedItems[3]
    ) {
      setFilterCheck(["Offer", "Request", "Other"]);
    } else if (
      checkedItems[0] &&
      !checkedItems[1] &&
      checkedItems[2] &&
      checkedItems[3]
    ) {
      setFilterCheck(["Offer", "Other", "Information"]);
    } else if (
      !checkedItems[0] &&
      checkedItems[1] &&
      checkedItems[2] &&
      checkedItems[3]
    ) {
      setFilterCheck(["Other", "Request", "Information"]);
    } else {
      setFilterCheck(["", ""]);
    }
    //setFilterCheck(e.target.value);
    //filterData = filterCheck;
  }

  //filters for price
  const [checkedItems2, setCheckedItems2] = useState([false, false]);

  const [filterCheck2, setFilterCheck2] = useState("");

  async function filterChange2() {
    if (checkedItems2[0] && !checkedItems2[1]) {
      setFilterCheck2("asc");
    } else if (checkedItems2[1] && !checkedItems2[0]) {
      setFilterCheck2("desc");
    } else {
      setFilterCheck2("");
    }
  } //do we need cases for multiple filters being checked?

  //filters for deadline
  const [checkedItems3, setCheckedItems3] = useState([false, false]);

  const [filterCheck3, setFilterCheck3] = useState("");

  async function filterChange3() {
    if (checkedItems3[0] && !checkedItems3[1]) {
      setFilterCheck3("asc");
    } else {
      setFilterCheck3("");
    }
  }

  useEffect(() => {
    filterChange();
    filterChange2();
    filterChange3();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems, checkedItems2, checkedItems3]);

  const remoteTrigger = useSelector(selectPullNewPosts)

  useEffect(() => {
    getPostsMaster(text, filterCheck, filterCheck2, filterCheck3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, filterCheck, filterCheck2, filterCheck3]);
  //trying out something with onChange and filters
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // }

  useEffect(() => {
    getPostsMaster(text, filterCheck, filterCheck2, filterCheck3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteTrigger]);

  const [show, setShow] = useState(false);

  function localSearch(query: string){
    let temp = [...posts];
    temp = temp.filter((post) => {
      return post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.text.toLowerCase().includes(query.toLowerCase()) 
    })
    setPosts(temp);
  }

  return (
    <Split
      className="split MainPageContainer"
      sizes={[20, 80]}
      maxSize={[500, Infinity]}
      minSize={[240, 500]}
      expandToMin={false}
    >
      <AnimateFilterEntry keyName="MainFilter">
        <div
          className={
            !show ? "FiltersContainer" : "FiltersContainer FiltersContainerOpen"
          }
        >
          <div className="FiltersContainer-InnerContainer">
            <div className="FiltersContainer-InnerContainer-Category">
              <Heading as={"h3"} size={"xs"}>
                Type
              </Heading>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                colorScheme="orange"
                onChange={(e) => {
                  setCheckedItems([
                    e.target.checked,
                    e.target.checked,
                    e.target.checked,
                    e.target.checked,
                  ]);
                }}
              >
                All
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                <Checkbox
                  colorScheme="orange"
                  isChecked={checkedItems[0]} //making an onChange function
                  onChange={(e) => {
                    setCheckedItems([
                      e.target.checked,
                      checkedItems[1],
                      checkedItems[2],
                      checkedItems[3],
                    ]);
                  }}
                >
                  Offer
                </Checkbox>
                <Checkbox
                  colorScheme="orange"
                  isChecked={checkedItems[1]}
                  onChange={(e) => {
                    setCheckedItems([
                      checkedItems[0],
                      e.target.checked,
                      checkedItems[2],
                      checkedItems[3],
                    ]);
                  }}
                >
                  Requests
                </Checkbox>
                <Checkbox
                  colorScheme="orange"
                  isChecked={checkedItems[2]}
                  onChange={(e) => {
                    setCheckedItems([
                      checkedItems[0],
                      checkedItems[1],
                      e.target.checked,
                      checkedItems[3],
                    ]);
                  }}
                >
                  Information
                </Checkbox>
                <Checkbox
                  colorScheme="orange"
                  isChecked={checkedItems[3]}
                  onChange={(e) => {
                    setCheckedItems([
                      checkedItems[0],
                      checkedItems[1],
                      checkedItems[2],
                      e.target.checked,
                    ]);
                  }}
                >
                  Other
                </Checkbox>
              </Stack>

              <Divider />
            </div>
            <div className="FiltersContainer-InnerContainer-Category">
              <Heading as={"h3"} size={"xs"}>
                Price
              </Heading>

              <Checkbox
                colorScheme="orange"
                isChecked={checkedItems2[0]}
                onChange={(e) => {
                  setCheckedItems2([e.target.checked, false]);
                }}
              >
                Low to High
              </Checkbox>
              <Checkbox
                colorScheme="orange"
                isChecked={checkedItems2[1]}
                onChange={(e) => {
                  setCheckedItems2([false, e.target.checked]);
                }}
              >
                High to Low
              </Checkbox>

              <Divider />
            </div>
            <div className="FiltersContainer-InnerContainer-Category">
              <Heading as={"h3"} size={"xs"}>
                Deadline
              </Heading>

              <Checkbox
                colorScheme="orange"
                isChecked={checkedItems3[0]}
                onChange={(e) => {
                  setCheckedItems3([e.target.checked, false]);
                }}
              >
                Soonest to Latest
              </Checkbox>
              <Divider />
            </div>
            <div className="FiltersContainer-InnerContainer-Category">
              {show && (
                <Button
                  className="CloseFiltersContainerButton HideWhenNONMobile"
                  colorScheme="orange"
                  onClick={() => setShow(!show)}
                >
                  Close Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </AnimateFilterEntry>

      <div className="MainPageContainer-PostsContainer MainPageContainer-PostsContainerMAINPAGE MainPageContainer-PostsContainerMobile ">
        <div className="MainPageContainer-PostsContainerInnerContainer">
          <Heading as="h2" size="xs" variant="outlined">
            <InputGroup
              size="sm"
              className="MainPageContainer-PostsContainer-SearchBar"
              borderRadius={"10px 10px 10px 10px"}
            >
              <IconButton
                aria-label="Search database"
                icon={<SearchIcon />}
                borderRadius={"10px 0px 0px 10px"}
                colorScheme="orange"
                onClick={() =>
                  localSearch(text)
                  //getPostsMaster(text, filterCheck, filterCheck2, filterCheck3)
                }
              />
              <Input
                placeholder="Search"
                border={"0px solid #F6AD55"}
                borderRadius={"0px 10px 10px 0px"}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                focusBorderColor="orange.500"
                style={{ height: "30px", marginTop: "1px" }}
                _placeholder={{ color: "orange.500" }}
              />
            </InputGroup>
          </Heading>
         
        </div>
        <div>
        <Button
            colorScheme={"orange"}
            className=" HideWhenNONMobile"
            onClick={() => setShow(!show)}
          >
            Open Filters
          </Button>
        </div>

        <AnimatePostItems keyName="MainPagePosts">
          {posts.map((post) => (
            <Post
              date_created={post.date_created}
              title={post.title}
              username={post.username}
              text={post.text}
              date={post.date}
              type={post.type}
              categories={post.categories}
              img={post.img}
              postID={post.postID}
              price={post.price}
              deadline={post.deadline}
              userID={post.userID}
            ></Post>
          ))}
        </AnimatePostItems>
      </div>
    </Split>
  );
}
