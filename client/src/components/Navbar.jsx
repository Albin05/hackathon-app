import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box>
      <Flex direction="row" justifyContent="space-between">
        <Box border="1px solid red">
          <Image src="https://cdn.iconscout.com/icon/free/png-64/quiz-4039217-3354814.png" />
        </Box>
        <Box padding="20px">
          <Link to="/login">
            <Button colorScheme="teal">Login</Button>
          </Link>
          <Link to="/signup">
            <Button colorScheme="teal" ml="10px">Signup</Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
