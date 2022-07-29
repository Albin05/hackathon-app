import React from "react";
import { Box, Button, Flex, Input, Stack } from "@chakra-ui/react";
import { ChatList } from "../components/ChatList";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { useSelector } from "react-redux";
import { SingleChat } from "../components/SingleChat";
const Home = () => {
  const [qstn, setQstn] = useState("");

  const User = useSelector((state) => state.appReducer.user);
  const singleChat = useSelector((state) => state.appReducer.singleChat);
  // console.log("redux", User);
  const handleAsk = () => {
    // console.log(user);
    const config = {
      headers: {
        Authorization: `Bearer ${User.token}`,
      },
    };
    axios.post(
      "/api/chat/groupall",
      {
        name: qstn,
      },
      config
    );
  };
  return (
    <Box w="100%" h="100vh">
      <Box>User Navbar</Box>
      <Flex>
        <Box w="35%" border="1px solid red" h="100vh">
          <Stack>
            <Input
              placeholder="New Question"
              value={qstn}
              onChange={(e) => setQstn(e.target.value)}
            />
            <Button onClick={handleAsk}>Ask</Button>
          </Stack>
          <ChatList />
        </Box>
        <Box w="65%" border="1px solid green" h="100vh">
          <Box w="100%" borderBottom={"1px solid"}>
            chatBox Navbar
          </Box>
          <Box h="75vh">{singleChat && <SingleChat />}</Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
