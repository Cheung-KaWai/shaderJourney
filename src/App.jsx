import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import styled from "styled-components";

import { Container } from "./components/Container";
import { Menu } from "./components/Menu";
import { Plane } from "./components/Plane";
import { Code } from "./components/Code";
import { themeColors } from "./lib/color";
function App() {
  return (
    <Container>
      <Menu />
      <OuterContainer>
        <CanvasContainer>
          <Canvas>
            <OrthographicCamera position={[0, 0, 1]} left={-0.5} right={0.5} top={0.5} bottom={-0.5} makeDefault manual />
            <Plane />
          </Canvas>
        </CanvasContainer>
      </OuterContainer>
      <Code />
    </Container>
  );
}

export default App;

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5rem;
  background-color: ${themeColors.grayBlue};
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  overflow: hidden;
  border: 3px solid ${themeColors.darkBlue};
`;
