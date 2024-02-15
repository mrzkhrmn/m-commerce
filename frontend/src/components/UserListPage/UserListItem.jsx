import { Tr, Td, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { useShowToast } from "../../hooks/useToast";

export const UserListItem = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const toast = useShowToast();

  async function handleDeleteButton() {
    setLoading(true);
    try {
      if (window.confirm("Are you sure to delete this user?")) {
        const res = await fetch(`/api/user/${user._id}`, { method: "DELETE" });

        const data = await res.json();

        if (data.error) {
          console.log(data.error);
        }
        toast("User deletee", "User deleted successfully", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Tr>
      <Td>{user.username}</Td>
      <Td>{user.email}</Td>
      <Td>{user.isAdmin ? "✅" : "❌"}</Td>
      <Td>{user.createdAt}</Td>
      <Td>
        {user.isAdmin ? (
          <Text>Cant handle with admins.</Text>
        ) : (
          <>
            <Button backgroundColor={"transparent"} isLoading={loading}>
              <HiOutlinePencilSquare />
            </Button>
            <Button
              backgroundColor={"transparent"}
              onClick={handleDeleteButton}
              isLoading={loading}
            >
              <MdDeleteOutline />
            </Button>
          </>
        )}
      </Td>
    </Tr>
  );
};
