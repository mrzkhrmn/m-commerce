import { Button } from "@chakra-ui/react";

export const CategoryListItem = ({ category }) => {
  return <Button>{category.name}</Button>;
};
