import { useState } from "react";
import { User, Headset } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { registerUser, loginWithGoogle } from "../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await registerUser(values.email, values.password, values.name, "customer");
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none bg-transparent">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-black uppercase tracking-[0.2em] text-black dark:text-white">NEW OPERATIVE REGISTRATION</CardTitle>
        <CardDescription className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50">PROVIDE YOUR DETAILS TO INITIALIZE AN ACCOUNT.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">FULL DESIGNATION (NAME)</FormLabel>
                  <FormControl>
                    <Input className="bg-white dark:bg-black border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-black/20 dark:placeholder:text-white/20" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">COMMS VECTOR (EMAIL)</FormLabel>
                  <FormControl>
                    <Input className="bg-white dark:bg-black border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-black/20 dark:placeholder:text-white/20" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">SECURITY KEY (PASSWORD)</FormLabel>
                  <FormControl>
                    <Input type="password" className="bg-white dark:bg-black border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-black/20 dark:placeholder:text-white/20" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">CONFIRM SECURITY KEY</FormLabel>
                  <FormControl>
                    <Input type="password" className="bg-white dark:bg-black border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-black/20 dark:placeholder:text-white/20" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-14 rounded-none text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all" disabled={isLoading}>
              {isLoading ? "INITIALIZING..." : "SUBMIT CREDENTIALS"}
            </Button>
          </form>
        </Form>

        {/* Google OAuth Section */}
        <div className="mt-6">
          <Button 
            variant="outline"
            type="button"
            className="w-full h-14 rounded-none text-xs font-bold uppercase tracking-widest bg-transparent text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            onClick={async () => {
              setIsLoading(true);
              try {
                await loginWithGoogle();
                toast.success("Successfully logged in with Google");
                navigate("/dashboard");
              } catch (error) {
                console.error(error);
                toast.error("Failed to login with Google.");
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden="true">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path>
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path>
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path>
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path>
            </svg>
            AUTHORIZE VIA GOOGLE
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-[10px] uppercase tracking-widest text-center px-0 font-bold mt-4">
        <div className="text-black/50 dark:text-white/50">
          ALREADY AUTHORIZED?{" "}
          <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
            ACCESS LOGIN PANEL
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
