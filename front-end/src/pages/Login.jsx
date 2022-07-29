import React, { useState } from "react";
import { Button, Container, FormControl, Input } from "@chakra-ui/react";
import axios from "axios";
import ChatProvider, { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../redux/AppReducer/action.js";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const { user, setUser } = ChatState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios({
      url: "http://localhost:5000/api/user/login",
      method: "POST",
      data: {
        email,
        password,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
    saveUser(data);
    console.log(data);
    navigate("/");
  };
  return (
    <Container>
      <FormControl>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <Input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>
    </Container>
  );
};
