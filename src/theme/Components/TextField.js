const primaryTextField = () => ({
  borderWidth: 0,
  borderRadius: '10px',
  py: '12px',
  px: '20px',
  mb: '-15px',
  _light: {
    color: 'bottomSheetText',
    fontSize: '17px',
    fontWeight: 'normal',
    lineHeight: 'sm',
    letterSpacing: '-0.5px',
    bg: 'inputBg',
    placeholderTextColor: 'placeholderText',
  },
  _dark: {
    color: 'bottomSheetText',
    fontSize: '17px',
    fontWeight: 'normal',
    lineHeight: 'sm',
    letterSpacing: '-0.5px',
    bg: 'inputBg',
    placeholderTextColor: 'placeholderText',
  },
});

const variants = {
  primary: primaryTextField,
};

export default {
  variants,
};
