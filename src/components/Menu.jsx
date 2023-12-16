import React from "react";
import styled from "styled-components";
import { useShaderStore } from "../store/Store";

export const Menu = () => {
  const { update } = useShaderStore();

  return (
    <MenuContainer>
      <ul>
        <li onClick={() => update("shader", 0)}>horizontal line</li>
        <li onClick={() => update("shader", 1)}>linear line</li>
        <li onClick={() => update("shader", 2)}>responsive grid</li>
      </ul>
    </MenuContainer>
  );
};

const MenuContainer = styled.nav`
  width: 20rem;
  background-color: gray;
  flex-shrink: 0;
`;
