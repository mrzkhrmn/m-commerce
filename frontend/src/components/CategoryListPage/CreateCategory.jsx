import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useShowToast } from "../../hooks/useToast";

export const CreateCategory = ({ setCategories }) => {
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const toast = useShowToast();

  async function handleAddCategory() {
    if (categoryName.length === 0) return console.log("Field cant be empty");
    setLoading(true);
    try {
      const res = await fetch(`/api/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      const data = await res.json();
      if (data.error) {
        console.log(data.error);
      }

      setCategories((prev) => [data, ...prev]);
      setCategoryName("");
      toast("Category Create", "Category created successfully!", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <FormControl>
      <FormLabel>Category Name</FormLabel>
      <Flex gap={1}>
        <Input
          w={80}
          type="text"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button isLoading={loading} onClick={handleAddCategory}>
          Add
        </Button>
      </Flex>
    </FormControl>
  );
};
