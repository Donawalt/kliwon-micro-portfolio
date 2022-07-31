import "./styles.scss";
import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Flex, Box } from "@react-three/flex";
import {
  TextureLoader,
  LinearFilter,
  ClampToEdgeWrapping,
  RepeatWrapping
} from "three";

const state = {
  images: [
    "/kliwon/kliwon_1.jpg",
    "/kliwon/kliwon_2.jpg",
    "/kliwon/kliwon_3.jpg",
    "/kliwon/kliwon_4.jpg",
    "/kliwon/kliwon_5.jpg"
  ]
};

const Slide = (props) => {
  const { margin, children } = props;

  return <Box margin={margin ? margin : 0.12}>{children}</Box>;
};

const Plane = (props) => {
  const { map, scale } = props;
  console.log(scale);
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[4, 3]} />
      <meshBasicMaterial attach="material" map={map} />
    </mesh>
  );
};
export default function App() {
  const [scroll, setScroll] = React.useState(0);
  const textures = useLoader(TextureLoader, state.images);
  const itemWidth = 0.24 + 4;
  const flexSizes = state.images.length * itemWidth;
  const scrollLength = window.innerHeight * state.images.length;
  const itemScroll = (scrollLength * itemWidth) / flexSizes;

  const currentScroll = () => {
    let value = (scroll * flexSizes) / scrollLength;

    return value;
  };
  const imgs = textures.map((texture) => {
    texture.minFilter = LinearFilter;
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = RepeatWrapping;
    let w = (texture.source.data.height * 4) / 3;
    let w1 = texture.source.data.height / w;
    texture.repeat.set(1, w1);
    texture.offset.set(0, 0);

    return texture;
  });

  React.useEffect(() => {
    window.onscroll = (e) => {
      setScroll(window.scrollY);
    };
  }, []);

  React.useEffect(() => {
    console.log(scroll, currentScroll(), itemScroll);
  }, [scroll]);
  return (
    <div className="App">
      <Canvas className="do-canvas">
        <ambientLight />
        <Flex flexDirection="row" position={[-currentScroll(), 0, 0]}>
          {imgs.map((x, i) => {
            return (
              <Slide key={i}>
                <Plane map={x} />
              </Slide>
            );
          })}
        </Flex>
      </Canvas>
      <div className="scroll-zone"></div>
    </div>
  );
}
