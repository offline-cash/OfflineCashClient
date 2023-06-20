import React from 'react';
import Svg, {G, Path, ClipPath, Defs, Rect} from 'react-native-svg';

const SerialNrIcon = () => (
  <Svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_1525_5576)">
      <Path
        d="M7 3V6.5M5 3V6.5M9 3V9M3 3V9M5 9V8.5M7 9V8.5M11.5 9.5V2.5C11.5 1.39543 10.6046 0.5 9.5 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V9.5C0.5 10.6046 1.39543 11.5 2.5 11.5H9.5C10.6046 11.5 11.5 10.6046 11.5 9.5Z"
        stroke="#AAA4AD"
        stroke-linecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1525_5576">
        <Rect width="12" height="12" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SerialNrIcon;
