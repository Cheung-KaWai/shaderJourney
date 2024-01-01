import React, { useState } from "react";
import styled from "styled-components";
import recursionData from "../data/recursion.json";
import { findElementByName } from "../lib/functions";
import { useShaderStore } from "../store/Store";
import SyntaxHighlighter from "react-syntax-highlighter";

export const Code = () => {
  const { shader } = useShaderStore();

  const fragment = findElementByName(recursionData, shader.name).fragment ?? null;
  const vertex = findElementByName(recursionData, shader.name).vertex ?? null;
  console.log(fragment);
  return (
    <CodeContainer>
      <SyntaxHighlighter language="glsl">{fragment}</SyntaxHighlighter>
    </CodeContainer>
  );
};

const CodeContainer = styled.div`
  width: 40svw;
  height: 100svh;
  background-color: red;
  position: absolute;
  right: 0;
`;
