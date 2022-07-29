import { Box, FormControl, Input, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const SingleChat = () => {
  const id = useSelector((state) => state.appReducer.selectedChat);
  const user = useSelector((state) => state.appReducer.user);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  //   console.log("hello");
  const fetchMessages = () => {
    console.log("user", user);
    axios
      .get(`/api/message/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        // console.log("message", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && msg) {
      //   socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setMsg("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: msg,
            chatId: id,
          },
          config
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  return (
    <div>
      <Stack>
        <Box>Single Chat</Box>
        <Box h="60vh" overflowY={"scroll"}>
          {data.map((msg) => (
            <Box key={msg._id}>{msg.content}</Box>
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
