import React from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';

const CloseIconX = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
      <Path
        fill="#000"
        d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0z"
      />
      <Path
        fill="none"
        stroke="#fff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M25.572 14.429 14.429 25.572M14.429 14.429l11.143 11.143"
      />
    </Svg>
  );
};

export default CloseIconX;
