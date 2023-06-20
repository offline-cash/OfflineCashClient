import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {Box} from 'native-base';

const LoadIcon = ({isArrowDown}) => (
  <Box>
    <Svg width={96} height={96} fill="none">
      <Circle
        cx={48}
        cy={48}
        r={47}
        stroke="#3150F5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23 32.71v-1a1 1 0 0 0-1 1h1Zm48 0h1a1 1 0 0 0-1-1v1Zm0 32v1a1 1 0 0 0 1-1h-1Zm-48 0h-1a1 1 0 0 0 1 1v-1Zm0-31h48v-2H23v2Zm47-1v32h2v-32h-2Zm1 31H23v2h48v-2Zm-47 1v-32h-2v32h2Z"
        fill="#3150F5"
      />
      <Circle cx={32} cy={42} r={3} fill="#3150F5" />
      <Path fill="#3150F5" d="M29 50h12v10H29zM60 39h4v4h-4z" />

      {isArrowDown ? (
        <Circle cx={46.5} cy={22.5} fill="#fff" r={20.5} />
      ) : (
        <Circle
          cx={63}
          cy={63}
          transform="rotate(-90 63 63)"
          fill="#fff"
          r={12}
        />
      )}

      {isArrowDown ? (
        <Path
          d="m42 33.5 4 4.5m0 0 4-4.5M46 38V26"
          stroke="#3150F5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <Path
          d="m64.5 68 4.5-4m0 0-4.5-4m4.5 4H57"
          stroke="#3150F5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  </Box>
);

export default LoadIcon;
