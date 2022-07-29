import { Box, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatState } from "../Context/ChatProvider";
import { saveSelectedChat, setSingleChat } from "../redux/AppReducer/action.js";

export const ChatList = ({ chatList }) => {
  const [chats, setChats] = useState([]);
  // const { user, setUser } = ChatState();
  // console.log("user", user);
  const [loggedUser, setLoggedUser] = useState();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.appReducer.user);
  const isRoomCreated = useSelector((state) => state.appReducer.isRoomCreated);

  const handleSelectedChat = (id) => {
    dispatch(setSingleChat(false));
    // console.log("id", id);
    dispatch(saveSelectedChat(id));
    dispatch(setSingleChat(true));
  };

  return (
    <Stack>
      {chatList.length > 0 && (
        <Stack>
          {chatList.map((chat) => (
            <Box key={chat._id}>
              <Text
                cursor="pointer"
                onClick={() => {
                  handleSelectedChat(chat);
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
