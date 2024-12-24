"use client"
import { Email } from "@mui/icons-material";
import Lock from '@mui/icons-material/Lock';
import Back from '@mui/icons-material/ArrowBack'
import { Box, Button, TextField, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (email.length > 0 && password.length > 0 && first_name.length > 0 && last_name.length > 0) {
            setIsButtonDisabled(false);
        }
        else {
            setIsButtonDisabled(true);
        }
    })

    const signUp = async () => {
        try {
            const response = await axios.post("/api/users/signup", {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            })
            console.log(response.data.message, response.data.data);
            toast.success(`Account created successfuly. An email has been sent to ${email}.
                Verify your email to activate your account.`, {
                className: "text-center",
                duration: 5000
            });

            router.push("/");
        } catch (error: any) {
            const response = error.response;
            console.log(response)
            switch (response.status) {
                case 400:
                    console.log(response.data.message);
                    toast.error(response.data.message);
                    break;
                case 500:
                    console.log(response.data.message);
                    toast.error("Server error :", response.data.message)
                    break;
                default:
                    console.log("Client error :", error.message)
                    toast.error("Unexpected error :", error.message)
                    break;
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            <Link href="/">
                <Back sx={{ position: 'absolute', left: '5%', top: '5%' }} />
            </Link>
            <p>Sign up</p>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    id="first_name"
                    label="First name"
                    variant="standard"
                    className="w-full"
                    value={first_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFirstName(event.target.value)
                    }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    id="last_name"
                    label="Last name"
                    variant="standard"
                    className="w-full"
                    value={last_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setLastName(event.target.value)
                    }} />
            </Box>
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
            <Button variant="outlined" onClick={signUp} disabled={isButtonDisabled}>Sign up</Button>
        </div>
    )
}

export default SignUp;