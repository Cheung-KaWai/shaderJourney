import React from "react";
import styled from "styled-components";
import { useShaderStore } from "../store/Store";

export const CodeButtons = () => {
  const { code, updateObject } = useShaderStore();

  return (
    <CodeButtonsContainer>
      <button onClick={() => updateObject("code", "show", !code.show)}>show code</button>
      {code.show && (
        <>
          <button onClick={() => updateObject("code", "file", 1)}>vertex</button>
          <button onClick={() => updateObject("code", "file", 0)}>fragment</button>
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
  gap: 1rem;
`;
