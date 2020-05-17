import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import axios from "axios";

const postStateAtom = atom({
  key: "postStateAtom",
  default: [],
});

const MyComp = () => {
  const setPostState = useSetRecoilState(postStateAtom);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      // console.log(res.data);
      for (const post of res.data) {
        console.log(post.body);
        setPostState((oldPostState) => [
          ...oldPostState,
          atom({
            key: post.id,
            default: post.body,
          }),
        ]);
      }
    });
  }, []);
  return <div></div>;
};

const SinglePost = ({ atom }) => {
  const post = useRecoilValue(atom);
  return <div>{post}</div>;
};

const MyPosts = () => {
  const postState = useRecoilValue(postStateAtom);
  return (
    <>
      {postState &&
        postState.map((atom) => {
          <SinglePost atom={atom} />;
        })}
    </>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <MyComp />
      <MyPosts />
    </RecoilRoot>
  );
};

render(React.createElement(App), root);
