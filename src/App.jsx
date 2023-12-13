import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import styled from "styled-components";

import { Container } from "./components/Container";
import { Menu } from "./components/Menu";
import { Plane } from "./components/Plane";
function App() {
  return (
    <Container>
      <Menu />
      <CanvasContainer>
        <Canvas>
          <OrthographicCamera
            position={[0, 0, 1]}
            left={-0.5}
            right={0.5}
            top={0.5}
            bottom={-0.5}
            makeDefault
            manual
          />
          <Plane />
        </Canvas>
      </CanvasContainer>
    </Container>
  );
}

export default App;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;
