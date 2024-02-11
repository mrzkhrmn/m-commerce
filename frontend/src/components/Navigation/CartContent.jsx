import {
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  Drawer,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { CartContentItem } from "./CartContentItem";

export const CartContent = ({ onClose, isOpen }) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent color={"black"}>
        <DrawerCloseButton />
        <DrawerHeader
          backgroundColor={"white"}
          borderBottom={"1px"}
          borderColor={"black"}
        >
          My cart ( 0 )
        </DrawerHeader>
        <DrawerBody backgroundColor={"white"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            h={"full"}
          >
            <Box>
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
              <CartContentItem />
            </Box>
            <Flex flexDirection={"column"} paddingBottom={4}>
              <Flex alignItems={"center"} justifyContent={"center"} gap={8}>
                <Text fontSize={"lg"}>X items total price:</Text>
                <Text fontSize={"lg"} fontWeight={"semibold"} paddingY={2}>
                  399.99$
                </Text>
              </Flex>
              <Flex flexDirection={"column"} gap={2}>
                <Button
                  backgroundColor={"green.500"}
                  _hover={{ backgroundColor: "green.600" }}
                >
                  Sepeti Onayla
                </Button>
                <Button variant="outline" color={"red.500"} colorScheme={"red"}>
                  Sepeti Temizle
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
