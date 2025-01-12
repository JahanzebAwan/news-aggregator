import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define types for the context values
interface PreferencesContextType {
  preferredAuthor: string;
  setPreferredAuthor: (author: string) => void;
  preferredSource: string;
  setPreferredSource: (source: string) => void;
}

// Create the context with a default value
const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

// Create a provider to wrap the app
interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider: React.FC<PreferencesProviderProps> = ({
  children,
}) => {
  // Initialize state with values from localStorage or default values
  const [preferredAuthor, setPreferredAuthor] = useState<string>(
    localStorage.getItem("preferredAuthor") || ""
  );
  const [preferredSource, setPreferredSource] = useState<string>(
    localStorage.getItem("preferredSource") || ""
  );

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("preferredAuthor", preferredAuthor);
  }, [preferredAuthor]);

  useEffect(() => {
    localStorage.setItem("preferredSource", preferredSource);
  }, [preferredSource]);

  return (
    <PreferencesContext.Provider
      value={{
        preferredAuthor,
        setPreferredAuthor,
        preferredSource,
        setPreferredSource,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesContext;
