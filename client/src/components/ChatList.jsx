import { Box, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatState } from "../Context/ChatProvider";
import { saveSelectedChat, setSingleChat } from "../redux/AppReducer/action.js";

export const ChatList = () => {
  const [chats, setChats] = useState([]);
  // const { user, setUser } = ChatState();
  // console.log("user", user);
  const [loggedUser, setLoggedUser] = useState();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.appReducer.user);

  const fetchChats = () => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // };

    // console.log("axios", user);
    axios
      .get("/api/chat", {
        headers: { Authorization: `Bearer ${User?.token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setChats(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectedChat = (id) => {
    dispatch(setSingleChat(false));
    // console.log("id", id);
    dispatch(saveSelectedChat(id));
    dispatch(setSingleChat(true));
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <Stack>
      {chats.length > 0 && (
        <Stack>
          {chats.map((chat) => (
            <Box key={chat._id}>
              <Text
                cursor="pointer"
                onClick={() => {
                  handleSelectedChat(chat._id);
                }}
              >
                {chat.chatName}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
