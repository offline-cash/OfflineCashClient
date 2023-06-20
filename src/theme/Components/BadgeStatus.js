import React from 'react';
import {Badge, HStack, Text} from 'native-base';
import Icon from '../../components/Icon';

export const BadgeStatus = ({
  text,
  iconName,
  badgeVariant,
  textVariant,
  iconColor,
  space,
}) => {
  return (
    <Badge variant={badgeVariant} py={1}>
      <HStack space={space ? space : '5px'} alignItems="center">
        <Icon name={iconName} color={iconColor} />
        <Text variant={textVariant}>{text}</Text>
      </HStack>
    </Badge>
  );
};
