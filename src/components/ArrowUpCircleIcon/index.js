import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

const ArrowUpCircleIcon = () => {
  return (
    <Svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7 7H15M15 7V15M15 7L7 15"
        stroke="#1C1A1D"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Rect x="0.5" y="0.5" width="21" height="21" rx="10.5" stroke="#1C1A1D" />
    </Svg>
  );
};

export default ArrowUpCircleIcon;
