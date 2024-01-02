import React from "react";
import { FiGithub } from "react-icons/fi";
import { GrLinkedinOption } from "react-icons/gr";
import styled from "styled-components";

export const Links = () => {
  return (
    <LinkContainer>
      <ExternLink href="https://www.linkedin.com/in/ka-wai-cheung-0849ba223/" target="_blank">
        <GrLinkedinOption color="white" size={"1.2rem"} />
      </ExternLink>
      <ExternLink href="https://github.com/Cheung-KaWai/shaderJourney" target="_blank">
        <FiGithub color="white" size={"1.2rem"} />
      </ExternLink>
    </LinkContainer>
  );
};

const LinkContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 1rem;
  gap: 1rem;
`;

const ExternLink = styled.a`
  display: block;
  cursor: pointer;
`;
