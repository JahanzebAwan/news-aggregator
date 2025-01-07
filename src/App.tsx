import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import FilterBar, { Filters } from "./components/FilterBar";
import NewsFeed from "./components/NewsFeed";

const queryClient = new QueryClient();

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    source: "all",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <NewsFeed searchQuery={searchQuery} filters={filters} />
    </QueryClientProvider>
  );
};

export default App;
