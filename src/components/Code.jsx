import React, { useEffect, useState } from "react";
import styled from "styled-components";
import recursionData from "../data/recursion.json";
import { findElementByName } from "../lib/functions";
import { useShaderStore } from "../store/Store";
import SyntaxHighlighter from "react-syntax-highlighter";

export const Code = () => {
  const { shader } = useShaderStore();
  const [showCode, setShowCode] = useState(false);
  const [file, setFile] = useState(0);

  const fragment = findElementByName(recursionData, shader.name).fragment ?? null;
  const vertex = findElementByName(recursionData, shader.name).vertex ?? null;

  const codes = [fragment, vertex];

  return (
    <>
      <CodeButtons>
        {showCode && (
          <>
            <button onClick={() => setFile(0)}>fragment</button>
            <button onClick={() => setFile(1)}>vertex</button>
          </>
        )}
        <button onClick={() => setShowCode((prev) => !prev)}>show code</button>
      </CodeButtons>
      <CodeContainer $showCode={showCode}>
        <SyntaxHighlighter language="glsl" useInlineStyles={false} showLineNumbers>
          {codes[file]}
        </SyntaxHighlighter>
      </CodeContainer>
    </>
  );
};

const CodeButtons = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
  display: flex;
  gap: 1rem;
`;

const CodeContainer = styled.div`
  width: calc((100svw - 20rem) / 2);
  height: 100svh;
  position: absolute;
  right: 0;
  transform: translateX(${(props) => (props.$showCode ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2.5rem 2rem;
  backdrop-filter: blur(0.5rem);
`;
