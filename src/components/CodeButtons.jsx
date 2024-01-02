import React from "react";
import styled from "styled-components";
import { useShaderStore } from "../store/Store";
import { themeColors } from "../lib/color";
import recursionData from "../data/recursion.json";
import { findElementByName } from "../lib/functions";

export const CodeButtons = () => {
  const { code, updateObject, shader } = useShaderStore();
  const data = findElementByName(recursionData, shader.name);

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data[code.file === 0 ? "fragment" : "vertex"]);
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };

  return (
    <CodeButtonsContainer>
      {!code.show && (
        <>
          <Name>{data.name}</Name>
          <Button $selected={code.show} onClick={() => updateObject("code", "show", true)}>
            Show code
          </Button>
        </>
      )}
      {code.show && (
        <>
          <Button $selected={code.file === 0} onClick={() => updateObject("code", "file", 0)}>
            fragment.glsl
          </Button>
          <Button $selected={code.file === 1} onClick={() => updateObject("code", "file", 1)}>
            vertex.glsl
          </Button>
          <Button onClick={handleCopyClipboard}>Copy code</Button>
        </>
      )}
    </CodeButtonsContainer>
  );
};

const CodeButtonsContainer = styled.div`
  position: absolute;
  left: 5rem;
  z-index: 2;
  top: 2rem;
  display: flex;
  gap: 2rem;
  width: calc(100svw - 35rem);
`;

const Button = styled.button`
  background-color: transparent;
  font-family: "Karla", sans-serif;
  border: none;
  color: ${(props) => (props.$selected ? themeColors.pink : "#fff")};
  font-size: 1.4rem;
  font-weight: 200;
  cursor: pointer;

  &:last-child {
    margin-left: auto;
  }
`;

const Name = styled.p`
  color: white;
  font-size: 1.4rem;
  font-weight: 200;

  &::first-letter {
    text-transform: capitalize;
  }
`;
