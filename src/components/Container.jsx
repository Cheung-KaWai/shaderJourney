import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
  width: 100svw;
  height: 100svh;
  display: flex;
`;

export const Container = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>;
};
