import { Button, useDisclosure } from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";
import { CartContent } from "./CartContent";

export const CartButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} backgroundColor={"transparent"} fontSize={"2xl"}>
        <IoCartOutline />
      </Button>
      <CartContent isOpen={isOpen} onClose={onClose} />
    </>
  );
};
