import { LoginForm } from "../components/ui/login-form"
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button"




export default function SignIn() {
    return (
        <>
        <div className="grid grid-cols-1 place-items-center gap-5">
            <Button>
                <Link to="/" className="">BACK</Link>
            </Button>
            <div className="shadow-2xl">
                <LoginForm>
                    dasd
                </LoginForm>
            </div>
        </div>
        </>
    );
}