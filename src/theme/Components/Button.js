const baseStyle = () => ({
  borderRadius: '100px',
});

const variantSolid = () => ({
  height: '54px',
  _light: {
    bg: 'primary',
    _text: {
      color: 'secondary',
    },
    _icon: {
      color: 'secondary',
    },
    _spinner: {
      color: 'secondary',
    },
    _hover: {
      bg: 'primany',
    },
    _pressed: {
      bg: 'primany',
    },
  },
  _dark: {
    bg: 'secondary',
    _text: {
      color: 'primary',
    },
    _icon: {
      color: 'primary',
    },
    _spinner: {
      color: 'primary',
    },
    _hover: {
      bg: 'secondary',
    },
    _pressed: {
      bg: 'secondary',
    },
  },
});

const variantOutline = () => ({
  borderWidth: '2',
  height: '54px',

  _light: {
    bg: 'secondary',
    borderColor: 'primary',
    _text: {
      color: 'primary',
    },
    _icon: {
      color: 'primary',
    },
    _spinner: {
      color: 'primary',
    },
    _hover: {
      bg: 'primary',
    },
    _pressed: {
      bg: 'secondary',
    },
  },
  _dark: {
    bg: 'primary',
    borderColor: 'secondary',
    _text: {
      color: 'secondary',
    },
    _icon: {
      color: 'primary',
    },
    _spinner: {
      color: 'primary',
    },
    _hover: {
      bg: 'primary',
    },
    _pressed: {
      bg: 'primary',
    },
  },
});

const variantStatus = () => ({
  height: '50px',
  _light: {
    bg: 'text',
    _text: {
      color: 'secondary',
    },
    _icon: {
      color: 'secondary',
    },
    _spinner: {
      color: 'secondary',
    },
    _hover: {
      bg: 'primany',
    },
    _pressed: {
      bg: 'primany',
    },
  },
  _dark: {
    bg: 'text',
    _text: {
      color: 'primary',
    },
    _icon: {
      color: 'primary',
    },
    _spinner: {
      color: 'primary',
    },
    _hover: {
      bg: 'secondary',
    },
    _pressed: {
      bg: 'secondary',
    },
  },
});

const variantLoad = () => ({
  height: '54px',
  _light: {
    bg: 'loadBtnBg',
    _text: {
      color: 'secondary',
    },
    _icon: {
      color: 'secondary',
    },
    _spinner: {
      color: 'secondary',
    },
    _hover: {
      bg: 'primany',
    },
    _pressed: {
      bg: 'primany',
    },
  },
  _dark: {
    bg: 'loadBtnBg',
    _text: {
      color: 'primary',
    },
    _icon: {
      color: 'primary',
    },
    _spinner: {
      color: 'primary',
    },
    _hover: {
      bg: 'secondary',
    },
    _pressed: {
      bg: 'secondary',
    },
  },
});

const variantScanModal = () => ({
  borderRadius: '10px',
  width: 'full',
  _light: {
    bg: 'scanModalBg',
    _text: {
      color: 'bottomSheetText',
      fontSize: '2xl',
      fontWeight: 'bold',
      lineHeight: 'xl',
      letterSpacing: '1px',
    },
    _icon: {
      color: 'secondary',
    },
    _spinner: {
      color: 'secondary',
    },
    _hover: {
      bg: 'primany',
    },
    _pressed: {
      bg: 'primany',
    },
  },
  _dark: {
    bg: 'scanModalBg',
    _text: {
      color: 'bottomSheetText',
      fontSize: '2xl',
      fontWeight: 'bold',
      lineHeight: 'xl',
      letterSpacing: '1px',
    },
    _icon: {
      color: 'secondary',
    },
    _spinner: {
      color: 'secondary',
    },
    _hover: {
      bg: 'primany',
    },
    _pressed: {
      bg: 'primany',
    },
  },
});

const sizes = {
  main: {
    px: 3,
    _text: {
      fontSize: 'xl',
      lineHeight: 'md',
      fontWeight: 'medium',
    },
    _icon: {
      size: 'md',
    },
  },
  status: {
    px: 5,
  },
};

const variants = {
  scanModal: variantScanModal,
  outline: variantOutline,
  solid: variantSolid,
  status: variantStatus,
  load: variantLoad,
};

export default {
  baseStyle,
  variants,
  sizes,
};
