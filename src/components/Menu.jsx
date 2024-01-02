import React from "react";
import styled from "styled-components";
import { useShaderStore } from "../store/Store";
import recursionData from "../data/recursion.json";
import { themeColors } from "../lib/color";

const MenuItem = (props) => {
  const { update, shader } = useShaderStore();

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
  const checkMenuItem = formattedLevel.length > 1;
  const selected = props.name === shader.name;

  return (
    <>
      <ListItem onClick={props.onClick} $isMenuItem={formattedLevel.length > 1}>
        <HoverSpan $allowHover={checkMenuItem} $selected={selected}>
          <IndexNumber $isMenuItem={checkMenuItem}>{formattedLevel} </IndexNumber>
          {" " + props.name}
        </HoverSpan>
        {nestedList.length > 0 && <NestedList>{nestedList}</NestedList>}
      </ListItem>
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
  width: 25rem;
  background-color: ${themeColors.darkBlue};
  flex-shrink: 0;
  color: white;
  overflow: scroll;
`;

const NestedList = styled.ul`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;

const IndexNumber = styled.span`
  color: ${themeColors.darkPink};
  font-size: 1rem;
  display: inline-block;
  width: ${(props) => (props.$isMenuItem ? "2rem" : "auto")};
  &:hover {
    color: red;
  }
`;

const ListItem = styled.li`
  cursor: ${(props) => (props.$isMenuItem ? "pointer" : "default")};
  font-weight: 200;
  font-size: 1.2rem;
  padding-left: 0.5rem;
`;

const HoverSpan = styled.span`
  width: 100%;
  display: inline-block;
  padding: 0.25rem 1rem;
  position: relative;
  &::before {
    content: "";
    display: inline-block;
    width: ${(props) => (props.$allowHover ? "0.5rem" : 0)};
    height: 100%;
    position: absolute;
    left: -0.5rem;
    top: 0;
    background-color: ${(props) => (props.$selected ? themeColors.pink : "transparent")};
  }

  &:hover {
    &::before {
      background-color: ${themeColors.pink};
    }

    background-color: ${(props) => (props.$allowHover ? "#c7417b12" : "")};
  }
`;
