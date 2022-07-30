import React, { useEffect } from "react";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { ChatList } from "../components/ChatList";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { useDispatch, useSelector } from "react-redux";
import { SingleChat } from "../components/SingleChat";
import { setIsRoomCreated } from "../redux/AppReducer/action";
const Question = () => {
  const [qstn, setQstn] = useState("");
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);
  const [flag, setFlag] = useState(false);

  const User = useSelector((state) => state.appReducer.user);
  const singleChat = useSelector((state) => state.appReducer.singleChat);
  const isRoomCreated = useSelector((state) => state.appReducer.isRoomCreated);
  // console.log("redux", User);
  const handleAsk = () => {
    console.log(User.token)
    // console.log(user);
    const config = {
      headers: {
        Authorization: `Bearer ${User.token}`,
      },
    };
    axios
      .post(
        "/api/chat/groupall",
        {
          name: qstn,
        },
        config
      )
      .then((res) => {
        setFlag(!flag);
        setChatList([...chatList, res.data]);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(setIsRoomCreated(!isRoomCreated));
  };
  const fetchChats = () => {
    axios
      .get("/api/chat", {
        headers: { Authorization: `Bearer ${User?.token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setChatList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchChats();
  }, [flag, isRoomCreated]);
  return (
    <Box w="100%" h="100vh">
      <Flex>
        <Box w="35%" border="1px solid black" mr="10px" h="100vh">
          <Stack>
            <Input
              placeholder="New Question"
              value={qstn}
              onChange={(e) => setQstn(e.target.value)}
            />
            <Button onClick={handleAsk} colorScheme="teal">
              Add a question
            </Button>
          </Stack>
          <ChatList chatList={chatList} />
        </Box>
        <Box w="65%" border="1px solid green" h="100vh">
          <Box w="100%" borderBottom={"1px solid"}>
            <Text fontSize="2xl" fontWeight="500">Messages</Text>
          </Box>
          <Box h="75vh">{singleChat && <SingleChat />}</Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Question;
