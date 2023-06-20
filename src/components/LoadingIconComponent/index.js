import React from 'react';
import Lottie from 'lottie-react-native';

export default function LoadingIconComponent({style}) {
  return (
    <Lottie
      source={require('./loadAnimation.json')}
      autoPlay
      loop
      style={style}
    />
  );
}
