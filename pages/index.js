import Head from "next/head";
import React, { useEffect, useState } from "react";

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

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  background-color: #2f4858;
  color: white;
  padding: 4px;
  margin-bottom: 20px;
`;


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data , error } = useSWR('/api/staticdata', fetcher);

  const [userInputText, setUserInputText] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);


  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 140))
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
    <div className={inter.className}>
     <Head>
        <title>German words</title>
        <meta
          name="description"
          content="learn 2000 German words"
        />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Wrapper>
      <Word>{data?.[randomNumber.toString()]?.english}</Word>
      <Input
        type="text"
        value={userInputText}
        onChange={(e) => setUserInputText(e.target.value)}
      />
      <Button onClick={checkWord}>submit</Button>
      <Button onClick={showAnswer}>cheat</Button>
    </Wrapper>
    </div>
  );
}
