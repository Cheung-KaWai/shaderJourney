import React, { useEffect, useMemo, useRef } from "react";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useShaderStore } from "../store/Store";

export const Plane = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;
  const ref = useRef();
  const { shader } = useShaderStore();

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uResolution: {
        value: aspect,
      },
      uStep: {
        value: shader,
      },
    }),
    []
  );

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime = clock.getElapsedTime();
  });

  useEffect(() => {
    ref.current.material.uniforms.uStep.value = shader;
    console.log(shader);
  }, [shader]);

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
};
