import styled from "styled-components";
import React from "react";
import MainItem from "./MainItem";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadDictionaryFB } from "../../modules/dictionary";
import InfinityScroll from "../common/InfinityScroll";

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
  const dispatch = useDispatch();
  const { list } = useSelector(({ dictionary }) => ({
    list: dictionary.list,
  }));
  const { is_loading } = useSelector(({ dictionary }) => ({
    is_loading: dictionary.is_loading,
  }));
  const { paging } = useSelector(({ dictionary }) => ({
    paging: dictionary.paging,
  }));

  return (
    <>
      <MainListBlock>
        <InfinityScroll
          callNext={() => {
            dispatch(loadDictionaryFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          <div className="main-list">
            {list.map((item, index) => {
              return <MainItem item={item} key={index} />;
            })}
          </div>
        </InfinityScroll>
      </MainListBlock>
    </>
  );
};

export default MainList;
