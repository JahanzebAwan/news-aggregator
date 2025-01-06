import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NewsFeed from "./components/NewsFeed";

const queryClient = new QueryClient();

const App = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState({ category: "", source: "" });

  return (
    <QueryClientProvider client={queryClient}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <NewsFeed searchQuery={searchQuery} filters={filters} />
    </QueryClientProvider>
  );
};

export default App;
