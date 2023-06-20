const bottomSheetHeading = () => ({
  _light: {
    color: 'bottomSheetText',
    fontSize: '4xl',
    fontWeight: 'normal',
    lineHeight: '3xl',
    letterSpacing: '-1.8px',
  },
  _dark: {
    color: 'bottomSheetText',
    fontSize: '4xl',
    fontWeight: 'normal',
    lineHeight: '3xl',
    letterSpacing: '-1.8px',
  },
});

const cardHeading = () => ({
  _light: {
    color: 'bottomSheetText',
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: 'xl',
    letterSpacing: '-0.41px',
  },
  _dark: {
    color: 'bottomSheetText',
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: 'xl',
    letterSpacing: '-0.41px',
  },
});

const statusHeading = () => ({
  _light: {
    color: 'status',
    fontSize: '22px',
    fontWeight: 'medium',
    lineHeight: 'lg',
    letterSpacing: '-0.8px',
  },
  _dark: {
    color: 'bottomSheetText',
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: 'xl',
    letterSpacing: '-0.41px',
  },
});

const scanHeading = () => ({
  _light: {
    color: 'textDescription',
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: 'xl',
    letterSpacing: '1px',
  },
  _light: {
    color: 'textDescription',
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: 'xl',
    letterSpacing: '1px',
  },
});

const variants = {
  card: cardHeading,
  bottomSheet: bottomSheetHeading,
  status: statusHeading,
  scan: scanHeading,
};

export default {
  variants,
};
