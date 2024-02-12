import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import { userAtom } from "./atoms/userAtom";
import { UpdateProfilePage } from "./pages/UpdateProfilePage";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={user ? <Navigate to={"/"} /> : <AuthPage />}
        />
        <Route path="/profile" element={<UpdateProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
