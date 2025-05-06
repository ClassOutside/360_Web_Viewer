import { Root, Container, Text } from "@react-three/uikit";
import { X } from "@react-three/uikit-lucide";
import { useRef } from "react";
import useAlwaysFaceCamera from "../Hooks/useAlwaysFaceCamera";
import { resetHotspotVisibility } from "../Utils/infoHotspotUtils";
import { useDispatch, useSelector } from "react-redux";

const DetailCard = ({
  position,
  camera,
  content,
  title,
  loadedDestination,
}) => {
  const cardRef = useRef();
  const dispatch = useDispatch();
  const config = useSelector((state) => state.configuration.configuration);
  const {
    detailCardMinHeight,
    detailCardMinWidth,
    detailCardTextMaxWidth,
    detailCardTextMaxHeight,
    detailCardFontSize,
  } = config;

  useAlwaysFaceCamera(cardRef, camera);

  return (
    <group position={position} ref={cardRef}>
      <Root
        depthTest={false}
        depthWrite={false}
        backgroundColor="white"
        borderRadius={16}
      >
        <Container
          flexDirection="column"
          justifyContent="flex-start"
          minHeight={detailCardMinHeight}
          minWidth={detailCardMinWidth}
          borderRadius={16}
        >
          <Container paddingLeft={16} paddingTop={4}>
            <Container
              flexGrow={9}
              justifyContent="flex-start"
              borderTopLeftRadius={16}
            >
              <Text fontSize={detailCardFontSize}>{title || "Untitled"}</Text>{" "}
              {/* Title replaced with prop */}
            </Container>
            <Container
              flexGrow={1}
              justifyContent="center"
              alignItems="center"
              onClick={() =>
                resetHotspotVisibility(dispatch, loadedDestination)
              } // Handle close button click
            >
              <X size={16} color="black" />
            </Container>
          </Container>

          <Container
            height={2}
            backgroundColor="black"
            marginTop={8}
            marginBottom={8}
          />

          <Container flexGrow={9} borderBottomRadius={16}>
            <Text
              maxWidth={detailCardTextMaxWidth}
              maxHeight={detailCardTextMaxHeight}
              paddingLeft={32}
              paddingRight={32}
              paddingBottom={16}
              whiteSpace="normal"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {content || "No content available."}{" "}
              {/* Content replaced with prop */}
            </Text>
          </Container>
        </Container>
      </Root>
    </group>
  );
};

export default DetailCard;
