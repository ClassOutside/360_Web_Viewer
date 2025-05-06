import * as THREE from "three";

export const createTransitionMaterial = (disableDepthTest) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      currentTexture: { value: null },
      nextTexture: { value: null },
      progress: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D currentTexture;
      uniform sampler2D nextTexture;
      uniform float progress;
      varying vec2 vUv;
      
      void main() {
        vec4 currentColor = texture2D(currentTexture, vUv);
        vec4 nextColor = texture2D(nextTexture, vUv);
        gl_FragColor = mix(currentColor, nextColor, progress);
      }
    `,
    depthTest: disableDepthTest,
  });
};
