import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import styled from "styled-components";

import { Container } from "./components/Container";
import { Menu } from "./components/Menu";
import { Plane } from "./components/Plane";
import { Code } from "./components/Code";
import { themeColors } from "./lib/color";
import { CodeButtons } from "./components/CodeButtons";
import { Links } from "./components/Links";

function App() {
  return (
    <Container>
      <Menu />
      <OuterContainer>
        <CodeButtons />
        <CanvasContainer>
          <Canvas>
            <OrthographicCamera position={[0, 0, 1]} left={-0.5} right={0.5} top={0.5} bottom={-0.5} makeDefault manual />
            <Plane />
          </Canvas>
          <Code />
        </CanvasContainer>
      </OuterContainer>
      <Links />
    </Container>
  );
}

export default App;

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5rem;
  background-color: ${themeColors.grayBlue};
  position: relative;
  overflow: hidden;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  /* border-radius: 2rem; */
  overflow: hidden;
  border: 1px solid ${themeColors.darkBlue};
`;
