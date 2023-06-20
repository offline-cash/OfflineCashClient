const baseStyle = () => ({
  fontSize: 'md',
});

const heroText = () => ({
  _light: {
    color: 'text',
    fontSize: 'xl',
    fontWeight: '400',
    lineHeight: 'lg',
  },
  _dark: {
    color: 'secondary',
    fontSize: 'xl',
    fontWeight: '400',
    lineHeight: 'lg',
  },
});

const nominalValueText = () => ({
  _light: {
    color: 'text',
    fontSize: '4xl',
    fontWeight: 'normal',
    lineHeight: 'lg',
  },
  _dark: {
    color: 'secondary',
    fontSize: '4xl',
    fontWeight: 'normal',
    lineHeight: 'lg',
  },
});

const convertedValueText = () => ({
  _light: {
    color: 'textDescription',
    fontSize: '13px',
    fontWeight: 'normal',
    lineHeight: 'md',
  },
  _dark: {
    color: 'textDescription',
    fontSize: 'md',
    fontWeight: 'normal',
    lineHeight: 'md',
  },
});

const dataTitleText = () => ({
  _light: {
    color: 'textDescription',
    fontSize: 'xs',
    fontWeight: 'medium',
    lineHeight: 'xs',
    letterSpacing: '2xl',
  },
  _dark: {
    color: 'textDescription',
    fontSize: 'xs',
    fontWeight: 'medium',
    lineHeight: 'xs',
    letterSpacing: '2xl',
  },
});

const dataSubjectText = () => ({
  _light: {
    color: 'text',
    fontSize: '15px',
    fontWeight: 'normal',
    lineHeight: 'sm',
    letterSpacing: '-0.1px',
  },
  _dark: {
    color: 'text',
    fontSize: '15px',
    fontWeight: 'normal',
    lineHeight: 'sm',
    letterSpacing: '-0.1px',
  },
});

const statusText = () => ({
  _light: {
    color: 'statusText',
    fontSize: 'xs',
    fontWeight: 'medium',
    lineHeight: 'xs',
  },
  _dark: {
    color: 'statusText',
    fontSize: 'xs',
    fontWeight: 'medium',
    lineHeight: 'xs',
  },
});

const historyText = () => ({
  _light: {
    color: 'text',
    fontSize: '13px',
    fontWeight: 'normal',
    lineHeight: 'sm',
    letterSpacing: '-0.1px',
  },
  _dark: {
    color: 'text',
    fontSize: '13px',
    fontWeight: 'normal',
    lineHeight: 'sm',
    letterSpacing: '-0.1px',
  },
});

const toastText = () => ({
  _light: {
    color: 'secondary',
    fontSize: 'md',
    fontWeight: 'medium',
    lineHeight: 'md',
  },
  _dark: {
    color: 'secondary',
    fontSize: 'md',
    fontWeight: 'medium',
    lineHeight: 'md',
  },
});

const addressCopyText = () => ({
  _light: {
    color: 'primary',
    fontSize: '13px',
    fontWeight: 'medium',
    lineHeight: 'lg',
    letterSpacing: '1.8px',
  },
  _dark: {
    color: 'primary',
    fontSize: '13px',
    fontWeight: 'medium',
    lineHeight: 'lg',
    letterSpacing: '1.8px',
  },
});

const bottomSheetText = () => ({
  _light: {
    color: 'bottomSheetText',
    fontSize: '17px',
    fontWeight: 'normal',
    lineHeight: 'md',
    letterSpacing: '-0.41px',
  },
  _dark: {
    color: 'bottomSheetText',
    fontSize: '17px',
    fontWeight: 'normal',
    lineHeight: 'md',
    letterSpacing: '-0.41px',
  },
});

const statusBtnText = () => ({
  _light: {
    color: 'secondary',
    fontSize: '17px',
    fontWeight: 'medium',
    lineHeight: 'md',
    letterSpacing: '-0.41px',
  },
  _dark: {
    color: 'secondary',
    fontSize: '17px',
    fontWeight: 'medium',
    lineHeight: 'md',
    letterSpacing: '-0.41px',
  },
});

const loadingText = () => ({
  _light: {
    color: 'primary',
    fontSize: '2xl',
    fontWeight: 'normal',
    lineHeight: 'lg',
    letterSpacing: '-0.7px',
  },
  _dark: {
    color: 'primary',
    fontSize: '2xl',
    fontWeight: 'normal',
    lineHeight: 'lg',
    letterSpacing: '-0.7px',
  },
});

const withdrawConvertedValueText = () => ({
  _light: {
    color: 'bottomSheetTextGrey',
    fontSize: '13px',
    fontWeight: 'medium',
    lineHeight: 'md',
  },
  _dark: {
    color: 'bottomSheetTextGrey',
    fontSize: '13px',
    fontWeight: 'medium',
    lineHeight: 'md',
  },
});

const availableText = () => ({
  _light: {
    color: 'available',
    fontSize: '13px',
    fontWeight: 'normal',
    lineHeight: 'md',
    letterSpacing: '1.8px',
  },
  _dark: {
    color: 'textDescription',
    fontSize: 'md',
    fontWeight: 'normal',
    lineHeight: 'md',
  },
});

const statusLoadedText = () => ({
  _light: {
    color: 'secondary',
    fontSize: 'sm',
    fontWeight: 'medium',
    lineHeight: 'xs',
  },
  _dark: {
    color: 'secondary',
    fontSize: 'xs',
    fontWeight: 'medium',
    lineHeight: 'xs',
  },
});

const scanModalText = () => ({
  _light: {
    color: 'text',
    fontSize: 'lg',
    fontWeight: '400',
    lineHeight: 'lg',
  },
  _dark: {
    color: 'text',
    fontSize: 'lg',
    fontWeight: '400',
    lineHeight: 'lg',
  },
});

const variants = {
  hero: heroText,
  nominal: nominalValueText,
  converted: convertedValueText,
  withdrawConverted: withdrawConvertedValueText,
  dataTitle: dataTitleText,
  dataSubject: dataSubjectText,
  status: statusText,
  history: historyText,
  toast: toastText,
  addressCopy: addressCopyText,
  bottomSheet: bottomSheetText,
  statusBtn: statusBtnText,
  loading: loadingText,
  available: availableText,
  statusLoaded: statusLoadedText,
  scanModal: scanModalText,
};

export default {
  baseStyle,
  variants,
};
