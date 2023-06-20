import {generateSecureRandom} from 'react-native-securerandom';

const alphabet =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateRandomString = async length => {
  const randomnessBytes = await generateSecureRandom(length ?? 20);
  let result = '';

  randomnessBytes.forEach(number => {
    result += alphabet[number % alphabet.length];
  });

  return result;
};
