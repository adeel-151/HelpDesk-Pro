import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export default App;
