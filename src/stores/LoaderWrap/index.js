import React, {createContext, useContext, useState} from 'react';

const LoaderWrapContext = createContext();

export const useLoaderWrapContext = () => useContext(LoaderWrapContext);

export const LoaderWrapProvider = ({children}) => {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <LoaderWrapContext.Provider value={{showLoading, setShowLoading}}>
      {children}
    </LoaderWrapContext.Provider>
  );
};

export default LoaderWrapProvider;
