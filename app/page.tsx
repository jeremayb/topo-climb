"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import { useDisclosure } from "@nextui-org/modal";
import axios from "axios";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Button, Link } from "@mui/material";
import { useCookies } from 'next-client-cookies';
import toast, { Toaster } from "react-hot-toast";
import AccountDrawer from "./components/AccountDrawer";
import Redirect from "@mui/icons-material/Launch";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

const Home = () => {
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onOpenChange: onLoginModalOpenChange,
    onClose: onLoginModalClose
  } = useDisclosure();

  const {
    isOpen: isAccountDrawerOpen,
    onOpen: onAccountDrawerOpen,
    onOpenChange: onAccountDrawerOpenChange,
    onClose: onAccountDrawerClose
  } = useDisclosure();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = useCookies();

  const changeLoginState = async (state: boolean) => {
    setIsLogin(state);
  }

  useEffect(() => {
    checkIsLogin();
    onLoginModalOpen();
  }, []);

  const checkIsLogin = async () => {
    try {
      const token = cookies.get("token");
      console.log("token cookie", token);
      if (token !== undefined && token.toString() !== "") {
        console.log("token exists !")
        setIsLogin(true);
        onLoginModalClose();
      } else {
        setIsLogin(false);
        onLoginModalOpen();
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="flex flex-row px-12">
      <Toaster />
      <AccountDrawer isOpen={isAccountDrawerOpen} onOpenChange={onAccountDrawerOpenChange} changeStateIsLogIn={changeLoginState} onClose={onAccountDrawerClose} />
      {
        isLogin ?
          <div className="flex flex-row absolute right-0 h-14">
            <Button className="h-14 w-14" onClick={onAccountDrawerOpen}>
              <PersonOutlineOutlinedIcon sx={{ height: "20" }} />
            </Button>
          </div>
          : isLoginModalOpen === true ?
            < LoginModal
              changeStateIsLogin={changeLoginState}
              isOpen={isLoginModalOpen}
              onOpenChange={onLoginModalOpenChange}
              onClose={onLoginModalClose} />
            :
            <Link
              className="flex flex-row absolute right-0 h-14 items-center justify-center p-6 z-10"
              href="/Login"
              underline="none"
              color="#94A3B8"
              fontSize={16}>
              <p>Sign in</p>
              <Redirect sx={{ color: '#94A3B8', ml: 0.5, my: 0.5, height: 22 }} />
            </Link>
      }
      <div className="flex flex-col h-screen w-1/4 py-14 justify-center gap-14">
        <p>Types d'escalade</p>
        <p>Niveaux de difficulté</p>
        <p>Niveaux d'équipement</p>
        <p>Ensoleillement</p>
      </div>
      <Map />
    </div>
  );
};

export default Home;
