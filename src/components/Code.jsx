import React from "react";
import styled from "styled-components";
import recursionData from "../data/recursion.json";
import { findElementByName } from "../lib/functions";
import { useShaderStore } from "../store/Store";
import SyntaxHighlighter from "react-syntax-highlighter";
import { themeColors } from "../lib/color";
import { IoCloseOutline } from "react-icons/io5";

export const Code = () => {
  const { shader, code, updateObject } = useShaderStore();

  const fragment = findElementByName(recursionData, shader.name).fragment ?? null;
  const vertex = findElementByName(recursionData, shader.name).vertex ?? null;
  const codes = [fragment, vertex];

  return (
    <>
      <CodeContainer $showCode={code.show}>
        <SyntaxHighlighter language="glsl" useInlineStyles={false} showLineNumbers>
          {codes[code.file] === "" ? "code not available yet" : codes[code.file]}
        </SyntaxHighlighter>
        <CloseContainer onClick={() => updateObject("code", "show", false)}>
          <IoCloseOutline size={"2rem"} color="white" />
        </CloseContainer>
      </CodeContainer>
    </>
  );
};

const CloseContainer = styled.button`
  width: 4rem;
  height: 4rem;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:hover {
    svg {
      transition: stroke 0.3s ease-in-out;
      stroke: ${themeColors.pink};
    }
  }
`;

const CodeContainer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: ${(props) => (props.$showCode ? 0 : "100%")};
  transition: all 0.5s ease-in-out;
  background-color: rgba(47, 58, 81, 0.95);
  padding: 2.5rem 2rem;
  backdrop-filter: blur(0.5rem);
  overflow: scroll;
  /* border: 3px solid ${themeColors.darkBlue};  */
  /* border-radius: 3rem; */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
