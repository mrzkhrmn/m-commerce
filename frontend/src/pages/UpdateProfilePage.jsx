import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import {
  Avatar,
  Flex,
  Heading,
  Stack,
  FormControl,
  Center,
  Button,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShowToast } from "../hooks/useToast";

export const UpdateProfilePage = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);

  const [inputData, setInputData] = useState({});
  const [updating, setUpdating] = useState(false);

  const toast = useShowToast();
  const navigate = useNavigate();

  function handleInputDataChange(e) {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  }

  const fileRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      const data = await res.json();
      if (data.error) {
        toast("Error", data.error, "error");
        return;
      }
      setCurrentUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast("User update", "User updated successfully", "success");
    } catch (error) {
      toast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDeleteUserProfile() {
    setUpdating(true);
    try {
      if (window.confirm("Are you sure to delete this profile?")) {
        const res = await fetch(`/api/user/profile`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.error) {
          toast("Error", data.error, "error");
          return;
        }
        toast("Success", "Profile deleted successfully", "success");
        localStorage.removeItem("userInfo");
        setCurrentUser(null);
        navigate("/auth");
      }
    } catch (error) {
      toast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  }

  return (
    currentUser && (
      <form onSubmit={handleSubmit}>
        <Flex align={"center"} justify={"center"} my={6}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"} jus>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile Edit
              </Heading>
              <Button
                size={"sm"}
                variant={"outline"}
                colorScheme="red"
                onClick={handleDeleteUserProfile}
                isLoading={updating}
              >
                Delete Profile
              </Button>
            </Flex>
            <FormControl id="userName">
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar
                    size="xl"
                    name={currentUser.username}
                    src={currentUser.profilePic}
                    boxShadow={"md"}
                  />
                </Center>
                <Center w="full">
                  <Button w="full" onClick={() => fileRef.current.click()}>
                    Change Avatar
                  </Button>
                  <Input type="file" hidden ref={fileRef} />
                </Center>
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>User name</FormLabel>
              <Input
                placeholder="johndoe"
                _placeholder={{ color: "gray.500" }}
                type="text"
                id="username"
                value={inputData.username}
                onChange={handleInputDataChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                id="email"
                value={inputData.email}
                onChange={handleInputDataChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                id="password"
                onChange={handleInputDataChange}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
                isLoading={updating}
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                bg={"green.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "green.500",
                }}
                type="submit"
                isLoading={updating}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    )
  );
};
