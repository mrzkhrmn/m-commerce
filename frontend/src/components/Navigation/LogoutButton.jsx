import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useShowToast } from "../../hooks/useToast";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const toast = useShowToast();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      if (window.confirm("Are you sure to want logout?")) {
        const res = await fetch("/api/user/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.error) {
          toast("Error", data.error, "error");
          return;
        }
        localStorage.removeItem("userInfo");
        toast("Success", "Logged out", "success");
        setUser(null);
        navigate("/auth");
      }
    } catch (error) {
      toast("Error", error, "error");
    }
  }
  return (
    <Button backgroundColor={"transparent"} onClick={handleLogout}>
      <FiLogOut size={20} />
    </Button>
  );
};
