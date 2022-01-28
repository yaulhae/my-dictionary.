import styled from "styled-components";
import React from "react";
import MainHeader from "../components/main/MainHeader";
import MainWrite from "../components/write/MainWrite";

const MainWritePageBlock = styled.div``;

const MainWritePage = () => {
  return (
    <MainWritePageBlock>
      <MainHeader />
      <MainWrite />
    </MainWritePageBlock>
  );
};

export default MainWritePage;
