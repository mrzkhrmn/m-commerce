import { useRecoilValue } from "recoil";
import { authScreenAtom } from "../atoms/authScreenAtom";
import { SignupCard } from "../components/Auth/SignupCard";
import { LoginCard } from "../components/Auth/LoginCard";

export const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  return <>{authScreenState === "signup" ? <SignupCard /> : <LoginCard />}</>;
};
