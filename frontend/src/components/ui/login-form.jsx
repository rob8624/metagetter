import { zodResolver } from "@hookform/resolvers/zod"
import { UseLoggedIn } from "../../context/userContext";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"
import ResetPassword from "../custom/resetPassword";
import { Input } from "./input"
import { Label } from "./label"
import authService from "../../services/authServices"




const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});



export function LoginForm({
  className,
  ...props
}) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();  
  const { setLoggedIn } = UseLoggedIn();
 

  
  const onSubmit = async (data) => {
    try {
        const success = await authService.login(data);
        if (success) {
            toast(`All logged in ${data.username}`);
            navigate('/dashboard');
            setLoggedIn(true)
            
          }
    } catch (error) {
        // Set error message to display to user
        console.log('nope');
    }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="username" 
                  {...register("username")}
                  required 
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  {...register("password")}
                  required 
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
          <div className="w-full flex justify-center pt-5">
          <ResetPassword />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
