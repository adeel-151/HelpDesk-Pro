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
        <CardTitle className="text-2xl font-black uppercase tracking-[0.2em] text-white">SYSTEM LOGIN</CardTitle>
        <CardDescription className="text-xs uppercase tracking-widest text-white/50">ENTER YOUR CREDENTIALS TO ACCESS THE WORKSPACE.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/70">IDENTIFIER (EMAIL)</FormLabel>
                  <FormControl>
                    <Input className="bg-black border-white/10 text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20" placeholder="operative@system.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/70">SECURITY KEY (PASSWORD)</FormLabel>
                  <FormControl>
                    <Input type="password" className="bg-black border-white/10 text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-14 rounded-none text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all" disabled={isLoading}>
              {isLoading ? "AUTHENTICATING..." : "AUTHORIZE"}
            </Button>
          </form>
        </Form>

        {/* Demo Accounts Section */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] text-center mb-4">BYPASS AUTH (DEMO)</p>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-[10px] font-bold uppercase tracking-widest h-10 rounded-none bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/50 transition-all"
              onClick={() => handleDemoLogin('customer')}
              disabled={isLoading}
            >
              CUSTOMER
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-[10px] font-bold uppercase tracking-widest h-10 rounded-none bg-transparent text-white/70 border-white/20 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"
              onClick={() => handleDemoLogin('agent')}
              disabled={isLoading}
            >
              AGENT
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-[10px] font-bold uppercase tracking-widest h-10 rounded-none bg-transparent text-white/70 border-white/20 hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-all"
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
            >
              ADMIN
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-[10px] uppercase tracking-widest text-center px-0 font-bold mt-4">
        <Link to="/forgot-password" className="text-white/50 hover:text-primary transition-colors">
          REQUEST KEY RESET?
        </Link>
        <div className="text-white/50">
          UNREGISTERED OPERATIVE?{" "}
          <Link to="/register" className="text-primary hover:text-primary/80 transition-colors">
            INITIALIZE REGISTRATION
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
