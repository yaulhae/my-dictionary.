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

function App() {
  useEffect(async () => {
    const docRef = doc(db, "dictionary", "gEbaV4s6Xil4RhuRdL49");
    deleteDoc(docRef);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/write" element={<MainWritePage />} />
    </Routes>
  );
}

export default App;
