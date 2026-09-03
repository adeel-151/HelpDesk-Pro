import { useState } from "react";
import { User, Headset } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { registerUser } from "../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const registerSchema = z.object({
  role: z.enum(["customer", "agent"]),
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
      role: "customer",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await registerUser(values.email, values.password, values.name, values.role);
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
        <CardTitle className="text-2xl font-black uppercase tracking-[0.2em] text-white">NEW OPERATIVE REGISTRATION</CardTitle>
        <CardDescription className="text-xs uppercase tracking-widest text-white/50">PROVIDE YOUR DETAILS TO INITIALIZE AN ACCOUNT.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Role Selection UI */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3 mb-6">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/70">SELECT OPERATIONAL ROLE</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className={`cursor-pointer rounded-none border p-4 flex flex-col items-center justify-center gap-2 transition-all ${field.value === 'customer' ? 'border-primary bg-primary/20 text-primary shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'border-white/10 bg-black text-white/50 hover:bg-white/5'}`}
                        onClick={() => field.onChange('customer')}
                      >
                        <User className="h-6 w-6" />
                        <span className="font-bold text-[10px] uppercase tracking-widest">CUSTOMER</span>
                      </div>
                      <div 
                        className={`cursor-pointer rounded-none border p-4 flex flex-col items-center justify-center gap-2 transition-all ${field.value === 'agent' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/10 bg-black text-white/50 hover:bg-white/5'}`}
                        onClick={() => field.onChange('agent')}
                      >
                        <Headset className="h-6 w-6" />
                        <span className="font-bold text-[10px] uppercase tracking-widest">SUPPORT AGENT</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/70">FULL DESIGNATION (NAME)</FormLabel>
                  <FormControl>
                    <Input className="bg-black border-white/10 text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/70">COMMS VECTOR (EMAIL)</FormLabel>
                  <FormControl>
                    <Input className="bg-black border-white/10 text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20" placeholder="name@example.com" {...field} />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/70">CONFIRM SECURITY KEY</FormLabel>
                  <FormControl>
                    <Input type="password" className="bg-black border-white/10 text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-[10px] uppercase tracking-widest" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-14 rounded-none text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all" disabled={isLoading}>
              {isLoading ? "INITIALIZING..." : "SUBMIT CREDENTIALS"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-[10px] uppercase tracking-widest text-center px-0 font-bold mt-4">
        <div className="text-white/50">
          ALREADY AUTHORIZED?{" "}
          <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
            ACCESS LOGIN PANEL
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
