import { Flex, Image, Text, Button, Box } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa6";

export const CartContentItem = () => {
  return (
    <Box borderBottom={"1px"} marginBottom={2} paddingBottom={2}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Image src="bracelet1.jpg" w={12} />
        <Flex flexDirection={"column"}>
          <Text>Product Title</Text>
          <Text>39$</Text>
        </Flex>
        <Flex alignItems={"center"} gap={2}>
          <Button
            color={"black"}
            _hover={{ backgroundColor: "gray.100" }}
            padding={0}
          >
            <FaMinus />
          </Button>
          <Text>1</Text>
          <Button
            color={"black"}
            _hover={{ backgroundColor: "gray.100" }}
            padding={0}
          >
            <FaPlus />
          </Button>
        </Flex>
        <Text>39$</Text>
      </Flex>
    </Box>
  );
};
