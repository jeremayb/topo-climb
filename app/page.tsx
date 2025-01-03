"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState, useTransition } from "react";
import LoginModal from "./components/LoginModal";
import { useDisclosure } from "@nextui-org/modal";
import axios from "axios";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Autocomplete, Button, Link, TextField } from "@mui/material";
import { useCookies } from 'next-client-cookies';
import { Toaster } from "react-hot-toast";
import AccountDrawer from "./components/AccountDrawer";
import useSWR from "swr"
import SpotInfos from "./components/SpotInfos";
import { useRouter } from "next/navigation";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

const fetcher = async (url: any) => {
  const res = await axios.get(url);
  return res.data;
}

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


  const handleSpotClick = (id: any) => {
    router!.push(`/#${id}`);
    setSpotfocus(id);
  };

const [isLogin, setIsLogin] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [spotFocus, setSpotfocus] = useState("");
const cookies = useCookies();
const router = useRouter();

const changeLoginState = async (state: boolean) => {
  setIsLogin(state);
}

useEffect(() => {
  checkIsLogin();
  onLoginModalOpen();
  setIsLoading(false);
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

/*const handleSpotClick = (spotId: String) => {
  const spotIndex = spots.findIndex((spot: any) => spot.id === spotId);
  if (spotIndex !== -1) {
    if (spotRefs.current[spotIndex] !== null) {
      spotRefs.current[spotIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
};*/

const { data: spots, error } = useSWR('/api/spots', fetcher, {
  refreshInterval: 10000
})
if (error) console.log('An error has occured', error.message)
if (!spots) console.log("Loading");

return (
  <div className="flex flex-col h-screen w-screen px-10">
    <Toaster />
    <AccountDrawer
      isOpen={isAccountDrawerOpen}
      onOpenChange={onAccountDrawerOpenChange}
      changeStateIsLogIn={changeLoginState}
      onClose={onAccountDrawerClose} />
    <div style={{ height: '9%' }} className="flex flex-row w-full items-center justify-between">
      <Autocomplete
        disablePortal
        options={[]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search for a climbing spot" />}
      />
      {
        !isLoading ?
          isLogin ?
            <Button className="h-full w-20 bg-slate-100" onClick={onAccountDrawerOpen}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
            </Button>
            : isLoginModalOpen === true ?
              < LoginModal
                changeStateIsLogin={changeLoginState}
                isOpen={isLoginModalOpen}
                onOpenChange={onLoginModalOpenChange}
                onClose={onLoginModalClose} />
              :
              <div className="flex flex-row gap-6 items-center">
                <Link
                  className="flex flex-row h-12 w-24 items-center justify-center bg-white rounded-3xl border-2 border-slate-700"
                  href="/Login"
                  underline="none"
                  color="#94A3B8"
                  fontSize={16}>
                  <p className="text-black">Sign in</p>
                </Link>
                <Link
                  className="flex flex-row h-12 w-24 items-center justify-center bg-slate-700 rounded-3xl border-2 border-slate-700"
                  href="/SignUp"
                  underline="none"
                  color="#94A3B8"
                  fontSize={16}>
                  <p className="text-white">Sign up</p>
                </Link>
              </div>
          :
          <>
          </>
      }
    </div>
    <div style={{ height: '91%', paddingBottom: '2%' }} className="flex flex-row items-center gap-4">
      <Map spots={spots} onSpotClick={handleSpotClick} />
      <div style={{ height: '100%', scrollBehavior: 'smooth' }} className="w-2/3 mb-2 overflow-y-auto">
        {
          spots !== undefined &&
          spots.data.map((spot: any) => {
            return (
              <SpotInfos spotFocused={spotFocus} key={spot._id} spot={spot} />
            )
          })
        }
      </div>
    </div>
  </div>
);
};

export default Home;
