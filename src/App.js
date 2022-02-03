import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainWritePage from "./pages/MainWritePage";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addDictionaryFB,
  loadDictionaryFB,
  submitText,
} from "./modules/dictionary";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDictionaryFB());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/write/save" element={<MainWritePage />} />
      <Route path="/write/:id/edit" element={<MainWritePage />} />
    </Routes>
  );
}

export default App;
