"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";
import { Box, Button, TextField, Checkbox, FormControlLabel, Link } from "@mui/material";
import Lock from '@mui/icons-material/Lock';
import Email from "@mui/icons-material/Email";
import Redirect from "@mui/icons-material/Launch";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface LoginModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    changeStateIsLogin: (state: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange, onClose, changeStateIsLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
            onClose();
            toast.success(`Welcome back ${response.data.data} !`);
            changeStateIsLogin(true);
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} backdrop="transparent" className="absolute top-0 left-0">
            <Toaster />
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col">
                            Do you have an account ?
                            <div className="flex flex-row">
                                <Link href="/SignUp" underline="none" color="#94A3B8" fontSize={16}>
                                    Create one
                                    <Redirect sx={{ color: '#94A3B8', ml: 0.5, my: 0.5, height: 22 }} />
                                </Link>
                            </div>
                        </ModalHeader>
                        <ModalBody className="flex flex-col justify-between">
                            <div className="flex flex-col pb-4">
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
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me ?" />
                                <Link underline="none" href="#">Forget password ?</Link>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="outlined" color="error" onClick={onClose}>
                                Continue as guest
                            </Button>
                            <Button variant="outlined" onClick={logIn} disabled={isButtonDisabled}>Sign in</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
