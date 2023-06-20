const variantStatus = () => ({
  _light: {
    bg: 'statusBg',
    borderRadius: '7px',
    px: 2,
  },
  _dark: {
    bg: 'statusBg',
    borderRadius: '7px',
    px: 2,
  },
});

const variantStatusLoaded = () => ({
  _light: {
    bg: 'statusLoadedBg',
    borderRadius: '7px',
    px: 2,
  },
  _dark: {
    bg: 'statusLoadedBg',
    borderRadius: '7px',
    px: 2,
  },
});

const variants = {
  status: variantStatus,
  statusLoaded: variantStatusLoaded,
};

export default {
  variants,
};
