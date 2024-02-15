import {
  Flex,
  Spinner,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Th,
  Tbody,
  Thead,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserListItem } from "../../components/UserListPage/UserListItem";

export const UserListPage = () => {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function getAllUsers() {
      try {
        const res = await fetch("/api/user", { method: "GET" });
        const data = await res.json();

        if (data.error) {
          console.log(data.error);
          return;
        }

        setUserList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <Flex justifyContent={"center"} py={12}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!loading) {
    return (
      <TableContainer py={12} px={8}>
        <Table variant="simple">
          <TableCaption>Handle users</TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Is Admin</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userList?.map((user) => (
              <UserListItem key={user._id} user={user} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
};
