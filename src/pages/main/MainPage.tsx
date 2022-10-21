import { Container, Heading, Text } from "@chakra-ui/react";
import './Post.css';
import './MainPage.css'
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

interface Post {
  title: string;
  username: string;
  text: string;
  date: string;
  type: string;
  categories: string[];
  img: string;
}

function Post(post: Post): JSX.Element {

  const [token, setToken, removeToken] = useCookies(['auth']);

  async function getPosts(){
    console.log(token.auth)
    axios.get("http://localhost:3000/api/posts/all", {withCredentials: true })
    .then((res) => {
      console.log(res);
    });
  }

  useEffect(() => {
    getPosts();
  }, []);


  return (
    <>
        <div className="PostContainer">
            <div className="PostContainer-Internal">
                <Heading as={"h1"} size={"md"}>{post.title}</Heading>
                <Heading as={"h2"} size={"sm"}>{post.username}</Heading>
                <Text fontSize={"md"}>{post.text}</Text>
                <div className="PostContainer-Internal-BottomFlex">
                    <Heading as={"h2"} size={"xs"}>{post.type}</Heading>
                    <Heading as={"h2"} size={"xs"}>{post.date}</Heading>
                </div>
            </div>
            <img src={post.img} alt="post image" />
        </div>
    </>
  );
}

export function MainPage(): JSX.Element {
  const dummyPost: Post = {
    title: "Need a drive to Chicago!",
    username: "Michael",
    text: "Anyone driving from Kalamazoo to Chicago this upcoming Friday (September 30th) in the late afternoon (3-4 PM ET)? I need a ride, I can chip in for the gas!",
    date: "03.09.2021",
    type: "Request",
    categories: [""],
    img: "/images/temp/dummyPost.png",
  };

  return (
    <div className="MainPageContainer">
      <Post
        title={dummyPost.title}
        username={dummyPost.username}
        text={dummyPost.text}
        date={dummyPost.date}
        type={dummyPost.type}
        categories={dummyPost.categories}
        img={dummyPost.img}
      ></Post>
    </div>
  );
}
