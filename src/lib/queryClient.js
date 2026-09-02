import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh for this long
      gcTime: 1000 * 60 * 30, // 30 minutes - unused data stays in cache
      refetchOnWindowFocus: false, // Don't refetch when user switches tabs
      retry: 1, // Retry failed requests once
    },
  },
});
