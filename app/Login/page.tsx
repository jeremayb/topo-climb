"use client"
import { Email } from "@mui/icons-material";
import Lock from '@mui/icons-material/Lock';
import { Box, Button, TextField, Checkbox, FormControlLabel, Link } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (email.length > 0 && password.length > 0) {
            setIsButtonDisabled(false);
        }
        else {
            setIsButtonDisabled(true);
        }
    })

    const logIn = async () => {
        try {
            const response = await axios.post("/api/users/login", {
                email: email,
                password: password,
            })
            console.log(response.data.message, response.data.data);
            router.push("/");
            toast.success(`Welcome back ${response.data.data} !`, {
                duration: 2000
            });
        } catch (error: any) {
            const response = error.response;
            console.log(response)
            switch (response.status) {
                case 400:
                    console.log(response.data.message);
                    toast.error(response.data.message, {
                        className:"text-center"
                    });
                    break;
                case 500:
                    console.log(response.data.message);
                    toast.error(`Server error : ${response.data.message}`,{
                        className: "text-center",
                    })
                    break;
                default:
                    console.log(`Client error : ${error.message}`)
                    toast.error(`Unexpected error : ${error.message}`)
                    break;
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Toaster/>
            <p>Sign in</p>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Email sx={{ color: '#1976d2', mr: 1, my: 0.5 }} />
                <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    className="w-full"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value)
                    }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Lock sx={{ color: '#1976d2', mr: 1, my: 0.5 }} />
                <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    className="w-full"
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                    }} />
            </Box>
            <Button variant="outlined" onClick={logIn} disabled={isButtonDisabled}>Sign in</Button>
        </div>
    )
}

export default Login;