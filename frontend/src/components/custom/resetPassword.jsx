import ReCAPTCHA from "react-google-recaptcha";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"
  
  import { Input } from "../../components/ui/input"

  export default function ResetPassword() {

    function onChange(value) {
        console.log("Captcha value:", value);
      }

    const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY
     
  
  return (
  
        <Dialog>
        <DialogTrigger className="text-xs">Reset Password?</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Password reset</DialogTitle>
            <DialogDescription>
                <div className="flex flex-col gap-2">
                    <span>Enter your registered email below to get reset.</span>
                    <Input />
                </div>
                <ReCAPTCHA className="pt-10 z-50"
                        sitekey={`${recaptchaKey}`}
                        onChange={onChange}
                    />,
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
  }