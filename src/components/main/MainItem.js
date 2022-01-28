import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
const MainItemBlock = styled.div`
  padding: 1.25em;
  border: 2px solid rgb(10, 112, 41);
  border-radius: 10px;

  .main-item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    b {
      font-size: 1.5rem;
      font-weight: 700;
    }
    svg {
      margin-left: 0.5em;
      color: rgb(10, 112, 41);
    }
  }
  > p:nth-child(2) {
    font-size: 0.875em;
  }
  > p:nth-child(4) {
    font-size: 0.875em;
    color: rgb(10, 112, 41);
  }
  > p:nth-child(5) {
    font-size: 0.875em;
    color: rgb(10, 112, 41);
  }

  @media screen and (min-width: 1024px) {
    width: calc((100% - 40px) / 3);
  }
`;

const MainItem = ({ item }) => {
  return (
    <MainItemBlock>
      <div className="main-item-title">
        <b>{item.word}</b>
        <div>
          <FontAwesomeIcon icon={faCheck} />
          <FontAwesomeIcon icon={faEdit} />
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <p>{item.pinyin}</p>
      <p>{item.meaning}</p>
      <p>{item.sentence}</p>
      <p>{item.interpretation}</p>
    </MainItemBlock>
  );
};

export default MainItem;
