import React, { useEffect, useState } from "react";

import styled from "styled-components";
import useSWR from 'swr';
import { Button, Button2 } from '../components/buttons'

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



const fetcher = (url) => fetch(url).then((res) => res.json());

function Genders({onChangePage}) {

  const { data , error } = useSWR('/api/genders', fetcher);
  const [update, setUpdate] = useState(false);
  const [showArticle, setShowArticle] = useState(false)
  const [wordSet, setWordSet] = useState({german: '', article: '', english: ''});


  useEffect(() => {
    if(data){
      const keys = Object.keys(data);
      const key = keys[ keys.length * Math.random() << 0]
      setWordSet({ german: data[key].word, english: key, article: data[key].article })
    }    
  }, [data, update]);



  const check= (input) => {
    if (input === wordSet.article) {
      setShowArticle(true)
      setTimeout(()=>{
        setUpdate(!update)
        setShowArticle(false)
      },3000)
    } else {
      alert("wrong");
    }
  };

  return (
    <div className={inter.className}>
    <Wrapper>
      <Word>{wordSet.english}</Word>
      <Word>{showArticle && wordSet.article} {wordSet.german}</Word>
      <Button onClick={()=> check('die')}>die</Button>
      <Button onClick={()=> check('der')}>der</Button>
      <Button onClick={()=> check('das')}>das</Button>
      <Button2 onClick={() => onChangePage("words")}>switch</Button2>
    </Wrapper>
    </div>
  );
}

export default Genders
