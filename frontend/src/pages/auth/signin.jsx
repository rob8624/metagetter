import { LoginForm } from "../../components/ui/login-form"
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button"

// import authService from "../../services/authServices";





export default function SignIn() {
    return (
        <>
        <div className="col-span-full sm:col-start-3 sm:col-span-8 row-start-1 row-span-full">
            <div className="flex justify-center h-full overflow-auto">
            
                <div className="shadow-2xl relative h-fit">
                    <LoginForm>
                        dasd
                    </LoginForm>
                    <div className="absolute top-0">Close</div>
                </div>
                
            </div>
        </div>
        </>

    );
}