import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { loginUser, registerUser } from "../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await loginUser(values.email, values.password);
      toast.success("Successfully logged in");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setIsLoading(true);
    const email = `${role}@demo.com`;
    const password = "password123";
    const displayName = `${role.charAt(0).toUpperCase() + role.slice(1)} Demo`;

    try {
      // First try to login
      await loginUser(email, password);
      toast.success(`Logged in as ${role}`);
      navigate("/dashboard");
    } catch (error) {
      // If login fails (likely user not found), try registering
      try {
        await registerUser(email, password, displayName, role);
        toast.success(`Demo ${role} account created and logged in`);
        navigate("/dashboard");
      } catch (regError) {
        console.error("Demo registration failed:", regError);
        toast.error("Failed to setup demo account.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none bg-transparent">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription>Enter your email and password to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        {/* Demo Accounts Section */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center mb-4">1-Click Demo Logins</p>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-9 bg-background hover:bg-primary/5 hover:text-primary border-primary/20"
              onClick={() => handleDemoLogin('customer')}
              disabled={isLoading}
            >
              Customer
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-9 bg-background hover:bg-emerald-500/10 hover:text-emerald-600 border-emerald-500/20"
              onClick={() => handleDemoLogin('agent')}
              disabled={isLoading}
            >
              Agent
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-9 bg-background hover:bg-violet-500/10 hover:text-violet-600 border-violet-500/20"
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
            >
              Admin
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-sm text-center px-0">
        <Link to="/forgot-password" className="text-primary hover:underline">
          Forgot your password?
        </Link>
        <div className="text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
