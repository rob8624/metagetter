import ReCAPTCHA from "react-google-recaptcha";
import authService from "../../services/authServices";
import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    
  } from "../../components/ui/dialog"
  
  import { Button } from "../ui/button";
  import { Input } from "../../components/ui/input"

  export default function ResetPassword() {
    
    const [email, setEmail] = useState('')
    const [reset, setReset] = useState(false)
    const [complete, setComplete] = useState(false)

    

    function handleOutsideClick(event) {
      event.preventDefault()
    }

    const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY

    async function handleReset(e) {
      e.stopPropagation();
        e.preventDefault()
        
       try {
        await authService.reset(email)
        setReset(false)
        setComplete(true)
      }
       catch (error) {
        console.error('reset failed', error)
       }
      }

    function handleChange() {
      setReset(true)
    }

    function handleClose() {
      setComplete(false)
      setReset(false)
    }

    

    
     return (
      
        <Dialog modal={false} onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleClose(); 
          }
        }}>
          
        <DialogTrigger className="text-xs">Password Reset</DialogTrigger>
       
        <DialogContent onInteractOutside={handleOutsideClick}>
        
            <DialogHeader>
            <DialogTitle>Password reset</DialogTitle>
            <DialogDescription>
                <div className="flex flex-col gap-2">
                  <form onSubmit={handleReset} >
                    <span>Enter your registered email below reset password.</span>
                    <Input type="email" name="email"
                      placeholder="Enter your email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value) }
                      required />
                      {reset && <Button type="submit" className="mt-2">Reset</Button>}
                      {complete && <div>Password link has now been sent check inbox</div>}
                    </form>
                </div>
                <ReCAPTCHA className="pt-10"
                        sitekey={`${recaptchaKey}`}
                        onChange={handleChange}/>,
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
       
        
    )
  }