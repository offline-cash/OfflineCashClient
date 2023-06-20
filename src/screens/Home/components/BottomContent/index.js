import React from 'react';
import OfflineLogo from '../../../../components/OfflineLogo';
import {Text, VStack} from 'native-base';
import ButtonGroup from '../ButtonGroup';
import {useLoaderWrapContext} from '../../../../stores/LoaderWrap';

const BottomContent = (...props) => {
  const {showLoading} = useLoaderWrapContext();

  const versionText = (
    <Text
      style={{
        color: props[0].appOutdated ? 'red' : 'gray',
        fontSize: 12,
        textAlign: 'center',
      }}>
      App version: {props[0].appVersion}
      {props[0].appUpdateText ? ' | ' + props[0].appUpdateText : ''}
    </Text>
  );

  return (
    <VStack
      {...props[0]}
      px={4}
      pt={'42px'}
      space={'xl'}
      justifyContent="flex-end">
      <VStack>
        <OfflineLogo pb="20px" />
        <Text variant="hero" textAllign={'center'} px={'6px'}>
          {"Bitcoin that's easy to save\nand hold in a self-sovereign way."}
        </Text>
      </VStack>
      {!showLoading ? (
        <ButtonGroup />
      ) : (
        <Text px={'6px'} fontSize={'3xl'}>
          Loading...
        </Text>
      )}
      {versionText}
    </VStack>
  );
};

export default BottomContent;
