import React from "react";
import styled from "styled-components";
import { useShaderStore } from "../store/Store";
import recursionData from "../data/recursion.json";

const MenuItem = (props) => {
  const { update } = useShaderStore();

  const nestedList = (props.items || []).map((item, index) => (
    <MenuItem
      key={index}
      level={`${props.level !== "" ? props.level + "." : ""}${(index + 1).toString().padStart(2, "0")}`}
      {...item}
      onClick={(e) => {
        e.stopPropagation();
        const shaderIndex = parseFloat(`${props.level !== "" ? props.level + "." : ""}${(index + 1).toString().padStart(2, "0")}`);
        if (!Number.isInteger(shaderIndex)) {
          update("shader", {
            index: shaderIndex,
            name: item.name,
          });
        }
      }}
    />
  ));

  // Remove leading zero from the whole number part
  const formattedLevel = props.level.replace(/^0+/, "");

  return (
    <>
      <li onClick={props.onClick}>
        {formattedLevel + " " + props.name}
        {nestedList.length > 0 && <NestedList>{nestedList}</NestedList>}
      </li>
    </>
  );
};

export const Menu = () => {
  return (
    <MenuContainer>
      <NestedList>
        {recursionData.map((props, index) => (
          <MenuItem {...props} key={index} level={""} />
        ))}
      </NestedList>
    </MenuContainer>
  );
};

const MenuContainer = styled.nav`
  width: 20rem;
  background-color: gray;
  flex-shrink: 0;
`;

const NestedList = styled.ul`
  padding-left: 2rem;
`;
