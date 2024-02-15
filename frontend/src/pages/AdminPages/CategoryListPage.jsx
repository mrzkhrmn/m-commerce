import { Divider, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allCategoriesAtom } from "../../atoms/allCategoriesAtom";
import { CategoryListItem } from "../../components/CategoryListPage/CategoryListItem";
import { CreateCategory } from "../../components/CategoryListPage/CreateCategory";

export const CategoryListPage = () => {
  const [categories, setCategories] = useRecoilState(allCategoriesAtom);
  const [loading, setLoading] = useState(false);
  console.log(categories);

  useEffect(() => {
    async function getAllCategories() {
      setLoading(true);
      try {
        const res = await fetch(`/api/category`, { method: "GET" });
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          return;
        }
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllCategories();
  }, [setCategories]);

  if (loading) {
    return (
      <Flex justifyContent={"center"} py={12}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  return (
    categories.length > 0 && (
      <Flex py={12} px={8} gap={4} flexWrap={"wrap"}>
        <CreateCategory setCategories={setCategories} />
        <Divider my={8} />
        {categories?.map((category) => (
          <CategoryListItem key={category._id} category={category} />
        ))}
      </Flex>
    )
  );
};
