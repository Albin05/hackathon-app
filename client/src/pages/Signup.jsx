import React from "react";
import { Button, Container, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios({
      url: "http://localhost:5000/api/user",
      method: "POST",
      data: {
        name,
        email,
        password,
      },
    });

    console.log(data);
  };
  return (
    <Container>
      <FormControl>
        <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      </FormControl>
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

export default Signup;
