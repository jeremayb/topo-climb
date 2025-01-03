
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter
} from "@nextui-org/drawer";
import { Button } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface AccountDawerModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    changeStateIsLogIn: (state: boolean) => void;
}

const AccountDrawer: React.FC<AccountDawerModalProps> = ({ isOpen, onOpenChange, changeStateIsLogIn, onClose }) => {

    const logOut = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log(response.data.message);
            changeStateIsLogIn(false);
            onClose();
            toast.success(response.data.message, {
                className: "text-center"
            });
        } catch (error: any) {
            const response = error.response;
            console.log(response)
            toast.error(response.data.message, {
                className: "text-center"
            });
        }
    }

    return (
        <Drawer placement="right" className="h-screen" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
            <Toaster/>
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">Account</DrawerHeader>
                        <DrawerBody>
                            <div>
                            </div>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant="outlined" color="error" onClick={logOut}>Logout</Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    )
}

export default AccountDrawer;