import { useContext } from 'react';
import GeneralContext from '../context/generalContext';

function useGeneralContext() {
  return useContext(GeneralContext);
}
export default useGeneralContext;
