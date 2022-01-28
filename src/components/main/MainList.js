import styled from "styled-components";
import React from "react";
import MainItem from "./MainItem";
import { useState } from "react";
import { useSelector } from "react-redux";

const MainListBlock = styled.div`
  max-width: 1300px;
  margin: 48px auto 0;
  padding: 50px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 100;
  .main-list {
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    justify-content: flex-start;
    gap: 20px;
  }
`;

const MainList = () => {
  const { list } = useSelector(({ dictionary }) => ({
    list: dictionary.list,
  }));
  return (
    <MainListBlock>
      <div className="main-list">
        {list.map((item, index) => {
          return <MainItem item={item} />;
        })}
      </div>
    </MainListBlock>
  );
};

export default MainList;
