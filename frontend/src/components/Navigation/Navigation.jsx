import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { CartButton } from "./CartButton";
import { LogoutButton } from "./LogoutButton";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/userAtom";

export const Navigation = () => {
  const user = useRecoilValue(userAtom);
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
      backgroundColor={"black"}
      paddingY={6}
      paddingX={20}
      alignItems={"center"}
    >
      <Flex flex={1} justifyContent={"center"}>
        <Box
          marginRight={"auto"}
          display={"flex"}
          alignItems={"center"}
          gap={6}
        >
          <RouterLink to={"/"}>
            <Text fontWeight={""} fontSize={"xl"}>
              Home
            </Text>
          </RouterLink>
          <Menu>
            <MenuButton
              as={Button}
              backgroundColor={"transparent"}
              paddingX={2}
              paddingY={1}
              fontWeight={"normal"}
              margin={0}
              fontSize={"xl"}
              rightIcon={<FaChevronDown fontSize={"medium"} />}
            >
              Jewels
            </MenuButton>
            <MenuList>
              <MenuItem>Rings</MenuItem>
              <MenuItem>Bracelets</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              backgroundColor={"transparent"}
              paddingX={2}
              paddingY={1}
              fontWeight={"normal"}
              margin={0}
              fontSize={"xl"}
              rightIcon={<FaChevronDown fontSize={"medium"} />}
            >
              Wears
            </MenuButton>
            <MenuList>
              <MenuItem>T-shirts</MenuItem>
              <MenuItem>Pants</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Flex>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          LOGO
        </Text>
      </Flex>
      <Flex flex={1} justifyContent={"center"}>
        <Box marginLeft={"auto"} display={"flex"} alignItems={"center"} gap={3}>
          <RouterLink>
            <Button backgroundColor={"transparent"} fontSize={"2xl"}>
              <FiSearch />
            </Button>
          </RouterLink>
          <RouterLink to={user ? "/profile" : "/auth"}>
            <Button backgroundColor={"transparent"} fontSize={"2xl"}>
              <FiUser />
            </Button>
          </RouterLink>
          <RouterLink>
            <CartButton />
          </RouterLink>
          {user && user.isAdmin && (
            <Menu>
              <MenuButton
                as={Button}
                backgroundColor={"transparent"}
                paddingX={2}
                paddingY={1}
                fontWeight={"normal"}
                margin={0}
                fontSize={"xl"}
              >
                <MdOutlineAdminPanelSettings />
              </MenuButton>
              <MenuList>
                <RouterLink to={"/userlist"}>
                  <MenuItem>User List</MenuItem>
                </RouterLink>
                <RouterLink to={"/categorylist"}>
                  <MenuItem>Category List</MenuItem>
                </RouterLink>
              </MenuList>
            </Menu>
          )}
          {user && (
            <RouterLink>
              <LogoutButton />
            </RouterLink>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
