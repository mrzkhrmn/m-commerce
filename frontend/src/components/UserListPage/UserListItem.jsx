import {
  Tr,
  Td,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  ModalFooter,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { useShowToast } from "../../hooks/useToast";
import { useRecoilState } from "recoil";
import { allUsersAtom } from "../../atoms/allUsersAtom";

export const UserListItem = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useRecoilState(allUsersAtom);
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
        setUsers(users.filter((prev) => prev._id !== user._id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) {
        console.log(data.error);
        return;
      }

      setFormData({});
      onClose();
      toast("Update user", "User updated successfully!", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <>
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
              <Button
                backgroundColor={"transparent"}
                isLoading={loading}
                onClick={onOpen}
              >
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdate}
              isLoading={loading}
            >
              Update
            </Button>
            <Button onClick={onClose} isLoading={loading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
