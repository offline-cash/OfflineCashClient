import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {Box} from 'native-base';

const LoadingIcon = () => (
  <Box>
    <Svg width={64} height={16} fill="none">
      <Circle cx={4} cy={8} r={4} fill="#3150F5" />
      <Circle cx={20} cy={8} r={4} fill="#3150F5" />
      <Circle cx={40} cy={8} r={8} fill="#3150F5" />
      <Circle cx={60} cy={8} r={4} fill="#3150F5" />
    </Svg>
  </Box>
);

export default LoadingIcon;
