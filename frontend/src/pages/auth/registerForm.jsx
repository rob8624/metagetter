import { useContext } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link } from 'react-router-dom';

import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"

import  { ThemeContext }  from '../../context/darkModeContext'



// 1. Updated Zod schema for email and password confirmation
const formSchema = z.object({

  username: z.string().min(2, ({
    message: "username"
  })),

  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function SignupForm() {
  const { darkMode } = useContext(ThemeContext)

  // 2. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // 3. Define the submit handler
  const onSubmit = (data) => {
    console.log(data) // Do something with the form values
  }

  return (
    <>
    <div className="flex flex-col items-center">
            <Button className="w-20">
                <Link to="/" className="">BACK</Link>
            </Button>
        <div className={`flex flex-col gap-10 mt-10 sm:mb-16 p-6 rounded-lg shadow-lg
          ${darkMode ? 'border border-gray-700 bg-black text-white' : 'border border-gray-200 bg-white text-black'}`}>
          <div>
            <h1 className="text-2xl font-bold">Please use the below form to register</h1>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Username Field - Grid Item 1 */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={darkMode ? 'text-white' : 'text-black'}>Username</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="Username" 
                            className={darkMode ? 'bg-gray-700 border-gray-600' : ''}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className={darkMode ? 'text-gray-300' : 'text-gray-500'}>
                          Choose a unique username
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Email Field - Grid Item 2 */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={darkMode ? 'text-white' : 'text-black'}>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            className={darkMode ? 'bg-gray-700 border-gray-600' : ''}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className={darkMode ? 'text-gray-300' : 'text-gray-500'}>
                          We'll never share your email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Password Field - Grid Item 3 */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={darkMode ? 'text-white' : 'text-black'}>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter your password" 
                            className={darkMode ? 'bg-gray-700 border-gray-600' : ''}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className={darkMode ? 'text-gray-300' : 'text-gray-500'}>
                          Min 8 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Confirm Password Field - Grid Item 4 */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={darkMode ? 'text-white' : 'text-black'}>Confirm Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Confirm your password" 
                            className={darkMode ? 'bg-gray-700 border-gray-600' : ''}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className={darkMode ? 'text-gray-300' : 'text-gray-500'}>
                          Re-enter your password
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Button outside the grid, full width */}
              <div className="mt-8">
                <Button type="submit" className={`w-full ${darkMode ? 'bg-black hover:bg-blue-700 text-white' : ''}`}>
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}