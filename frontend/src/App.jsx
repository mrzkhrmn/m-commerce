import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import { userAtom } from "./atoms/userAtom";
import { UpdateProfilePage } from "./pages/UpdateProfilePage";
import { UserListPage } from "./pages/AdminPages/UserListPage";
import { CategoryListPage } from "./pages/AdminPages/CategoryListPage";

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

        <Route
          path="/userlist"
          element={
            user && user.isAdmin ? <UserListPage /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/categorylist"
          element={
            user && user.isAdmin ? <CategoryListPage /> : <Navigate to={"/"} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
