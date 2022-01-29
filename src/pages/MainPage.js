import styled from "styled-components";
import React from "react";
import MainHeader from "../components/main/MainHeader";
import MainList from "../components/main/MainList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MainPageBlock = styled.div``;

const MainPage = () => {
  return (
    <MainPageBlock>
      <MainHeader />
      <MainList />
      <Link to="/write/save">
        <FontAwesomeIcon
          icon={faPlusCircle}
          style={{
            color: "rgb(10, 112, 41)",
            fontSize: "2.5rem",
            position: "fixed",
            bottom: "2rem",
            right: "3rem",
          }}
        />
      </Link>
    </MainPageBlock>
  );
};

export default MainPage;
