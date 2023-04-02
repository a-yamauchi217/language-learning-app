import React, { useEffect, useState } from "react";

import styled from "styled-components";
import useSWR from 'swr';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const Wrapper = styled.div`

  background-color: #ffd1d1;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Word = styled.div`
  font-size: 32px;
  text-align: center;
  margin-bottom: 50px;
`;

const Input = styled.input`
  height: auto;
  max-width: calc(100vw - 64px);
  text-decoration: none;
  font-size: 32px;
  padding: 8px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  background-color: #2f4858;
  color: white;
  padding: 4px;
`;


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data , error } = useSWR('/api/staticdata', fetcher);

  const [userInputText, setUserInputText] = useState("");
  const [randomNumber, setRandomNumber] = useState(1);


  useEffect(() => {
    alert(error)
  }, [error]);

  const checkWord = () => {
    if (userInputText == data?.[randomNumber.toString()]?.german) {
      alert("correct")
      setUserInputText("")
      setRandomNumber(Math.floor(Math.random() * 60))
    } else {
      alert("wrong");
    }
  };

  return (
    <Wrapper>
      <Word>{data?.[randomNumber.toString()]?.english}</Word>
      <Input
        type="text"
        value={userInputText}
        onChange={(e) => setUserInputText(e.target.value)}
      />
      <Button onClick={checkWord}>submit</Button>
    </Wrapper>
  );
}
