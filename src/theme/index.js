import {extendTheme} from 'native-base';
import base from './base';
import components from './Components';

export default extendTheme({
  ...base,
  components,
});
