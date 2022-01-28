import styled from "styled-components";
import React from "react";
import { useDispatch } from "react-redux";
import { changeInput, submitText } from "../../modules/dictionary";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainWriteBlock = styled.div`
  max-width: 400px;
  margin: 100px auto;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  h1 {
    font-weight: 700;
    font-size: 1.125rem;
    margin: 1.25em 0;
    text-align: center;
    color: #0a7029;
  }
  .input-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25em;
    input {
      border: none;
      border-bottom: 1px solid #0a7029;
      &:focus {
        outline: none;
      }
    }
  }
  form button {
    display: block;
    margin: 0 auto;
    color: white;
    background-color: rgb(10, 112, 41);
    width: 40%;
    padding: 0.5em 0;
    border-radius: 8px;
    font-weight: 100;
  }
`;

const MainWrite = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(({ dictionary }) => ({
    list: dictionary.write,
  }));
  const navigate = useNavigate();

  const changeText = (event) => {
    dispatch(changeInput(event.target.name, event.target.value));
  };
  const submitTexts = (e) => {
    e.preventDefault();
    dispatch(submitText(list));
    navigate("/");
  };
  return (
    <MainWriteBlock>
      <h1>단어 추가하기</h1>
      <form>
        <div className="input-box">
          <label htmlFor="word">단어</label>
          <input
            id="word"
            type="text"
            name="word"
            onChange={(e) => {
              changeText(e);
            }}
          />
        </div>
        <div className="input-box">
          <label htmlFor="pinyin">병음</label>
          <input
            id="pinyin"
            type="text"
            name="pinyin"
            onChange={(e) => {
              changeText(e);
            }}
          />
        </div>
        <div className="input-box">
          <label htmlFor="meaning">의미</label>
          <input
            id="meaning"
            type="text"
            name="meaning"
            onChange={(e) => {
              changeText(e);
            }}
          />
        </div>
        <div className="input-box">
          <label htmlFor="sentence">예문</label>
          <input
            id="sentence"
            type="text"
            name="sentence"
            onChange={(e) => {
              changeText(e);
            }}
          />
        </div>
        <div className="input-box">
          <label htmlFor="interpretation">해석</label>
          <input
            id="interpretation"
            type="text"
            name="interpretation"
            onChange={(e) => {
              changeText(e);
            }}
          />
        </div>
        <button onClick={submitTexts}>저장하기</button>
      </form>
    </MainWriteBlock>
  );
};

export default MainWrite;
