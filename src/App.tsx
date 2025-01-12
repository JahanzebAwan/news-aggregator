import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import NewsFeed from "./components/NewsFeed";
import { PreferencesProvider } from "./contexts/PreferencesContext";

const queryClient = new QueryClient();

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <Header setSearchQuery={setSearchQuery} />
        <NewsFeed searchQuery={searchQuery} />
      </PreferencesProvider>
    </QueryClientProvider>
  );
};

export default App;
