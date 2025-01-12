import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import NewsFeed from "./components/NewsFeed";

const queryClient = new QueryClient();

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NewsFeed searchQuery={searchQuery} />
    </QueryClientProvider>
  );
};

export default App;
