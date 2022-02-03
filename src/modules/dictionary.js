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
  query,
  orderBy,
  limit,
  startAt,
} from "firebase/firestore";

//액션상수 정의
const LOAD_DICTIONARY = "/dictionary/LOAD_DICTIONARY";
const CHANGE_INPUT = "/dictionary/CHANGE_INPUT";
const SUBMIT_TEXT = "/dictionary/SUBMIT_TEXT";
const UPDATE_DICTIONARY = "/dictionary/UPDATE_DICTIONARY";
const INITIALIZE_FORM = "/dictionary/INITIALIZE_FORM";
const LOAD_DICTIONARYONE = "/dictionary/LOAD_DICTIONARTONE";
const CHECK_DICTIONARY = "/dictionary/CHECK_DICTIONARY";
const LOADING = "/dictionary/LOADING";

//액션객체 정의
export const loadDictionary = (dictionary_list, paging) => ({
  type: LOAD_DICTIONARY,
  dictionary_list,
  paging,
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

export const checkedDictionary = (id) => ({
  type: CHECK_DICTIONARY,
  id,
});

export const loading = (is_loading) => ({
  type: LOADING,
  is_loading,
});

//미들웨어 정의
export const loadDictionaryFB = (start = null, size = 18) => {
  return async function (dispatch, getState) {
    let _paging = getState().dictionary.paging;
    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const dictionary_Ref = collection(db, "dictionary");
    const dictionary_list = query(
      dictionary_Ref,
      orderBy("word"),
      startAt(start),
      limit(size + 1)
    );

    if (start) {
    }

    const querySnapshot = await getDocs(dictionary_list);

    let dictionarys = [];

    let paging = {
      start: querySnapshot.docs[0],
      next:
        querySnapshot.docs.length === size + 1
          ? querySnapshot.docs[querySnapshot.docs.length - 1]
          : null,
      size: size,
    };

    querySnapshot.forEach((dictionary) => {
      dictionarys.push({ id: dictionary.id, ...dictionary.data() });
    });
    dictionarys.pop();
    dispatch(loadDictionary(dictionarys, paging));

    // const dictionary_list = await getDocs(collection(db, "dictionary"));
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

export const checkDictionaryFB = (dictionary_id) => {
  return async function (dispatch) {
    const docRef = doc(db, "dictionary", dictionary_id);
    const dictionary = (await getDoc(docRef)).data();
    await updateDoc(docRef, {
      checked: !dictionary.checked,
    });

    dispatch(checkedDictionary(dictionary_id));
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
  paging: { start: null, next: null, size: 18 },
  is_loading: false,
};

function dictionary(state = initialState, action) {
  switch (action.type) {
    case LOAD_DICTIONARY:
      return produce(state, (draft) => {
        draft["list"].push(...action.dictionary_list);
        draft["paging"] = action.paging;
        draft.is_loading = false;
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
    case CHECK_DICTIONARY:
      return produce(state, (draft) => {
        const new_list = draft["list"].map((d) => {
          return d.id === action.id ? { ...d, checked: !d.checked } : d;
        });
        draft["list"] = new_list;
      });
    case LOADING:
      return produce(state, (draft) => {
        draft["is_loading"] = action.is_loading;
      });
    default:
      return state;
  }
}

export default dictionary;
