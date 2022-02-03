import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { checkDictionaryFB } from "../../modules/dictionary";
import { useDispatch } from "react-redux";

const MainItemBlock = styled.div`
  padding: 1.25em;
  border: 2px solid rgb(10, 112, 41);
  border-radius: 10px;
  background: ${(props) => props.reveal && "#0A7029"};
  color: ${(props) => props.reveal && "white"};
  .main-item-title {
    position: relative;

    b {
      width: 80%;
      font-size: 1.5rem;
      font-weight: 700;
      min-height: 28px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: nowrap;
    }

    svg {
      position: absolute;
      right: 0;
      top: 0.8rem;
      margin-left: 0.5em;
      color: rgb(10, 112, 41);
      color: ${(props) => props.reveal && "white"};
    }
    .svg_1 {
      right: 3em;
    }
    .svg_2 {
      right: 1.3em;
    }
  }
  > p:nth-child(2) {
    font-size: 0.875em;
  }
  > p:nth-child(4) {
    font-size: 0.875em;
    color: rgb(9, 132, 227);
    color: ${(props) => props.reveal && "white"};
  }
  > p:nth-child(5) {
    font-size: 0.875em;
    color: rgb(9, 132, 227);
    color: ${(props) => props.reveal && "white"};
  }
  @media screen and (min-width: 120px) {
    width: calc((100%) / 1);
  }
  @media screen and (min-width: 768px) {
    width: calc((100% - 20px) / 2);
  }
  @media screen and (min-width: 1024px) {
    width: calc((100% - 40px) / 3);
  }
`;

const MainItem = React.memo(({ item }) => {
  const dispatch = useDispatch();
  return (
    <MainItemBlock reveal={item.checked}>
      <div className="main-item-title">
        <b>{item.word}</b>
        <div>
          <FontAwesomeIcon
            icon={faCheck}
            className="svg_1"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(checkDictionaryFB(item.id))}
          />
          <Link to={`/write/${item.id}/edit`}>
            <FontAwesomeIcon icon={faEdit} className="svg_2" />
          </Link>
          <FontAwesomeIcon icon={faTimes} className="svg_3" />
        </div>
      </div>
      <p>{item.pinyin}</p>
      <p>{item.meaning}</p>
      <p>{item.sentence}</p>
      <p>{item.interpretation}</p>
    </MainItemBlock>
  );
});

export default MainItem;
