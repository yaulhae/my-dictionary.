import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const MainHeaderBlock = styled.div`
  font-family: "Shrikhand", cursive;
  font-size: 2rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  border-bottom: 1px solid black;
`;

const MainHeader = () => {
  return (
    <MainHeaderBlock>
      <Link to={"/"}>
        <h1>MyDictionary</h1>
      </Link>
    </MainHeaderBlock>
  );
};

export default MainHeader;
