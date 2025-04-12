import { Input } from "../../components/ui/input"
import { useParams } from "react-router"
import { useState } from "react"

import authService from '../../services/authServices.js'


export default function PasswordReset() {

    const [password, setPassword] = useState('')
    const { uid, token } = useParams()



    function handleSubmit(e) {
        e.preventDefault()
        authService.confirmReset(uid, token, password)
    }

    function handleInput(e) {
        const password = e.target.value
        setPassword(password)
    }


    return (
        <div className="flex flex-col justify-center items-center h-80 ">
            <div className="text-2xl">Please enter your new password</div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <Input onChange={handleInput}/>
            <button type="submit">Submit</button>
        </form>
        </div>
    )
} 