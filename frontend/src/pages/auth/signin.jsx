import { LoginForm } from "../../components/ui/login-form"
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button"

// import authService from "../../services/authServices";





export default function SignIn() {
    return (
        <>
        <div className="grid grid-cols-1 place-items-center gap-5 mt-10">
           
            <div className="shadow-2xl">
                <LoginForm>
                    dasd
                </LoginForm>
            </div>
            <Button>
                <Link to="/" className="">BACK</Link>
            </Button>
        </div>
        </>
    );
}