import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";

const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

export const SingleChat = () => {
  const chat = useSelector((state) => state.appReducer.selectedChat);
  const user = useSelector((state) => state.appReducer.user);
  const selectedChat = useSelector((state) => state.appReducer.selectedChat);
  const [socketConnected, setSocketConnected] = useState(false);
  // const [messages, setMessages] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const { notification, setNotification } = ChatState();
 
  //   console.log("hello");
  const fetchMessages = () => {
    // console.log("user", user);
    axios
      .get(`/api/message/${chat._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        socket.emit("join chat", chat._id);
        // console.log("message", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && msg) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setMsg("");
        const response = await axios.post(
          "/api/message",
          {
            content: msg,
            chatId: chat._id,
          },
          config
        );
        socket.emit("new message", response.data);
        setData([...data, response.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chat._id]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // console.log("data", data[0]);
      // console.log("new msg recd", newMessageRecieved);
      setData([...data, newMessageRecieved]);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        // console.log("else", newMessageRecieved);
        setData([...data, newMessageRecieved]);
      }
    });
  });

  console.log(data);

  return (
    <div>
      <Stack>
        <Flex justifyContent="space-between" p="10px" bg="teal">
          <Text color="white" fontSize="20px">
            {chat.chatName}
          </Text>
          <Button
            variant="outline"
            bg="white"
          >
            Request an expert
          </Button>
        </Flex>
        <Box h="60vh" overflowY={"scroll"}>
          {data.map((msg) => (
            <Box
              key={msg._id}
              w="90%"
              textAlign="left"
              m="10px"
              bg={"#f3f4f6"}
              padding="10px"
              borderRadius="25px"
            >
              {msg.content}
            </Box>
          ))}
        </Box>
        <Box mb="10px">
          <FormControl onKeyDown={sendMessage} isRequired>
            <Input
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              value={msg}
              placeholder="Enter message"
            />
          </FormControl>
        </Box>
      </Stack>
    </div>
  );
};
