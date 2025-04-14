import { Input } from "../../components/ui/input"
import { useParams } from "react-router"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import authService from '../../services/authServices.js'
import { Button } from "../../components/ui/button"


export default function PasswordReset() {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { uid, token } = useParams()
    const [formState, setFormState] = useState(
        {
            inputEmpty: true,
            loading: false,
            passwordsMatch: null,
            success: null,
            error: null,
            empty: null,
            match: null
        }
    )
    
    const defaultFormState = {

        inputEmpty: true,
        loading: false,
        passwordsMatch: null,
        success: null,
        error: null,
        empty: null,
        match: null
     
    }

    const errorStatus = {
        400: "Bad Request – Please check your input.",
        401: "Unauthorized – You may need to log in again.",
        403: "Forbidden – You don't have permission to do this.",
        404: "Not Found – The resource you're looking for doesn't exist.",
        408: "Request Timeout – Please try again.",
        422: "Unprocessable Entity – Invalid data submitted.",
        429: "Too Many Requests – Slow down a bit!",
        500: "Internal Server Error – Something went wrong on our end.",
        502: "Bad Gateway – Server is not responding properly.",
        503: "Service Unavailable – Server might be down. Try again later.",
      };

    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault()
       ;

        if (password.length === 0) {
            setFormState((prev) => ({...prev, empty: "Fields are empty"}));
            setTimeout(() => {
                setFormState((prev) => ({...prev, empty: null}))
            }, 2000);
            return
        };
        
        setFormState((prev) => ({...prev, loading: true}));

        setFormState((prev) => ({
            ...prev, loading: "requesting reset"
        }));
        
          
        try { 
            const response = await authService.confirmReset(uid, token, password);
            if (response.status === 204) 
                {setFormState((prev) => ({
                ...prev, success: "Successfully changed, redirecting",
                }));
                setTimeout(() => {
                  navigate("/")  
                }, 2000)}
           }

        catch(error) {
                setFormState((prev) => ({...prev, error: `Error resetting password ${errorStatus[error.response.status]}`}))
             }
                
        finally {setTimeout(
                () => {setFormState(defaultFormState)}, 
                2000)
                    };
                }
        
    function checkPasswordsMatch(pass, confirm) {
        if (!confirm) {
            setFormState((prev) => ({ ...prev, match: null }));
            return;
        }
        
        if (pass === confirm) {
            setFormState((prev) => ({ ...prev, match: true }));
        } else {
            setFormState((prev) => ({ ...prev, match: false }));
        }
        }   

 
    

    function handleInput(e) {
        const pass = e.target.value;
        setPassword(pass);
        checkPasswordsMatch(pass, confirmPassword);
        }
        
        function handleConfirm(e) {
        const confirm = e.target.value;
        setConfirmPassword(confirm);
        checkPasswordsMatch(password, confirm);
        }
    

    return (
        <div className="flex flex-col justify-center items-center h-80 gap-5 pt-10 ">
            <div className="text-1xl">Reset your password using the form below</div>
            
            <div className="h-10 w-70">{
                formState.error ? <div className="text-red-500">{ formState.error }</div>:
                formState.success ? <div>{ formState.success }</div> :
                formState.loading ? <div>{ formState.loading }</div> :
                formState.empty ? <div>{ formState.empty }</div>: null} 
               {formState.match === true && (
                <div className="text-green-600">Passwords match ✅</div>
                )}
                {formState.match === false && (
                <div className="text-red-500">Passwords do not match ❌</div>
                )}
            </div>

        <form className="flex flex-col gap-2"onSubmit={(e) => handleSubmit(e)}>
        <Button type="submit" className="mx-auto" disabled={formState.loading || !formState.match ? true : false}>
                { formState.loading ? 'Resetting' : 'Reset'}
            </Button>
            <label>
                New Password
                <Input type="password" name="password" onChange={handleInput}/>
            </label>
            <label>
                Confirm new password
            <Input type="password" name="confirmPassword" onChange={handleConfirm}/>
            </label>
            
           
        </form>
           
        </div>
    )
    }