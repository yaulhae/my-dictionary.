import produce from "immer";

const CHANGE_INPUT = "/dictionary/CHANGE_INPUT";
const SUBMIT_TEXT = "/dictionary/SUBMIT_TEXT";

export const changeInput = (name, text) => ({
  type: CHANGE_INPUT,
  name,
  text,
});

export const submitText = (item) => ({
  type: SUBMIT_TEXT,
  item,
});

const initialState = {
  list: [],
  write: {
    word: "",
    pinyin: "",
    meaning: "",
    sentence: "",
    interpretation: "",
  },
};

function dictionary(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return produce(state, (draft) => {
        draft["write"][action.name] = action.text;
      });
    case SUBMIT_TEXT:
      return produce(state, (draft) => {
        console.log(action.item);
        draft["list"].push(action.item);
      });
    default:
      return state;
  }
}

export default dictionary;
