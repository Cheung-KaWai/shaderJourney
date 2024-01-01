import React, { useEffect, useMemo, useRef } from "react";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useShaderStore } from "../store/Store";
import { Vector2 } from "three";

export const Plane = () => {
  const ref = useRef();
  const { shader } = useShaderStore();
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uResolution: {
        value: new Vector2(size.width, size.height),
      },
      uStep: {
        value: shader.index,
      },
    }),
    []
  );

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime = clock.getElapsedTime();
  });

  // change shader example
  useEffect(() => {
    ref.current.material.uniforms.uStep.value = shader.index;
  }, [shader]);

  // update resolution uniforms
  useEffect(() => {
    uniforms.uResolution.value = new Vector2(size.width, size.height);
  }, [size]);

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
};
