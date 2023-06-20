import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

const AndroidScanIcon = () => (
  <Svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <G clip-path="url(#clip0_1458_5463)">
      <Path
        d="M60 6H12C8.7 6 6 8.7 6 12V60C6 63.3 8.7 66 12 66H60C63.3 66 66 63.3 66 60V12C66 8.7 63.3 6 60 6ZM60 60H12V12H60V60ZM54 18H39C35.7 18 33 20.7 33 24V30.84C31.2 31.89 30 33.78 30 36C30 39.3 32.7 42 36 42C39.3 42 42 39.3 42 36C42 33.78 40.8 31.86 39 30.84V24H48V48H24V24H30V18H18V54H54V18Z"
        fill="#0085FF"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1458_5463">
        <Rect width="72" height="72" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default AndroidScanIcon;
