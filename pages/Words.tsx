import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Button, Button2 } from '../components/buttons'

import styled from "styled-components";
import useSWR from 'swr';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'],  variable: '--inter-font', })
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
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

const fetcher = (url) => fetch(url).then((res) => res.json());

function Words({onChangePage}){

  const { data , error } = useSWR('/api/words', fetcher);

  const [userInputText, setUserInputText] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 296))
  }, []);

  const checkWord = () => {
    if (userInputText.toLowerCase() == data?.[randomNumber.toString()]?.german.toLowerCase()) {
      alert("correct")
      setUserInputText("")
      setRandomNumber(Math.floor(Math.random() * 140))
    } else {
      alert("wrong");
    }
  };

  const showAnswer = () => {
    setUserInputText(data?.[randomNumber.toString()]?.german)
  }

  return (
    <Wrapper>
      <Word>{data?.[randomNumber.toString()]?.english}</Word>
      <Input
        type="text"
        value={userInputText}
        onChange={(e) => setUserInputText(e.target.value)}
      />
      <Button onClick={checkWord}>submit</Button>
      <Button onClick={showAnswer}>cheat</Button>
      <Button2 onClick={() => onChangePage("genders")}>switch</Button2>
    </Wrapper>
  );
}

export default Words