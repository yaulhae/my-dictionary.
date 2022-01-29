import produce from "immer";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

//액션상수 정의
const LOAD_DICTIONARY = "/dictionary/LOAD_DICTIONARY";
const CHANGE_INPUT = "/dictionary/CHANGE_INPUT";
const SUBMIT_TEXT = "/dictionary/SUBMIT_TEXT";
const UPDATE_DICTIONARY = "/dictionary/UPDATE_DICTIONARY";
const INITIALIZE_FORM = "/dictionary/INITIALIZE_FORM";
const LOAD_DICTIONARYONE = "/dictionary/LOAD_DICTIONARTONE";

//액션객체 정의
export const loadDictionary = (dictionary_list) => ({
  type: LOAD_DICTIONARY,
  dictionary_list,
});

export const changeInput = (name, text) => ({
  type: CHANGE_INPUT,
  name,
  text,
});

export const submitText = (item) => ({
  type: SUBMIT_TEXT,
  item,
});

export const updateDictionary = (id, dictionary) => ({
  type: UPDATE_DICTIONARY,
  id,
  dictionary,
});

export const initializeForm = () => ({
  type: INITIALIZE_FORM,
});

export const loadDictionaryOne = (id) => ({
  type: LOAD_DICTIONARYONE,
  id,
});
//미들웨어 정의
export const loadDictionaryFB = () => {
  return async function (dispatch) {
    const dictionary_list = await getDocs(collection(db, "dictionary"));
    let dictionarys = [];

    dictionary_list.forEach((dictionary) => {
      dictionarys.push({ id: dictionary.id, ...dictionary.data() });
    });
    dispatch(loadDictionary(dictionarys));
  };
};

export const addDictionaryFB = (write) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "dictionary"), write);
    const _dictionary = await getDoc(docRef);
    const dictionary = { id: _dictionary.id, ..._dictionary.data() };

    dispatch(submitText(dictionary));
  };
};

export const updateDictionaryFB = (dictionary_id, dictionary_text) => {
  return async function (dispatch) {
    const docRef = doc(db, "dictionary", dictionary_id);
    await updateDoc(docRef, dictionary_text);
    dispatch(updateDictionary(dictionary_id, dictionary_text));
  };
};

//리듀서 정의
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
    case LOAD_DICTIONARY:
      return produce(state, (draft) => {
        draft["list"] = action.dictionary_list;
      });
    case CHANGE_INPUT:
      return produce(state, (draft) => {
        draft["write"][action.name] = action.text;
      });
    case SUBMIT_TEXT:
      return produce(state, (draft) => {
        draft["list"].push(action.item);
      });
    case UPDATE_DICTIONARY:
      return {
        ...state,
        list: state.list.map((item, index) => {
          return item.id === action.id
            ? { ...item, ...action.dictionary }
            : item;
        }),
      };
    // 여기서 state와 initialState는 다르다? 흠...
    case INITIALIZE_FORM:
      return { ...state, write: initialState.write };
    case LOAD_DICTIONARYONE:
      return {
        ...state,
        write: state.list.filter((item, index) => {
          return item.id === action.id;
        })[0],
      };
    default:
      return state;
  }
}

export default dictionary;
