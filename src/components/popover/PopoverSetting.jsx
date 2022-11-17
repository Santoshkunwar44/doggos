import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Portal
} from '@chakra-ui/react'
import React, { useContext } from "react";
import "./popoverSetting.css"

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DoggosContext } from '../../context/context';
import AuthenticationModal from '../modal/Authenticate';
import { getLoggedOut } from '../../services/utilityFunctions';


const PopoverSetting = ({ children }) => {
    const { dispatch, userData } = useContext(DoggosContext)

    return (
        <Popover closeOnBlur placement='top' className="popOverBox">
            <PopoverTrigger >
                {children}

            </PopoverTrigger>

            <Portal>
                <PopoverContent background={"#212426"}>
                    <PopoverArrow />
                    <PopoverCloseButton color={"red"} />
                    <PopoverBody color={"#212426"}>

                        {

                            userData ? <div className="registration_box popoverRegistration">

                                <button className="mainBtns" onClick={() => { getLoggedOut(); dispatch({ type: "logout" }) }}>
                                    <LockIcon className="navIcons" style={{ color: "white" }} />  <span>Logout</span>
                                </button>  </div> : <div className="registration_box popoverRegistration">
                                <AuthenticationModal type={"LOgin"}>
                                    <button className="mainBtns">
                                        <LockOpenIcon className="navIcons" />
                                        <span>Login</span>
                                    </button>
                                </AuthenticationModal>
                                <div className="hrLineBox">

                                    <div className="hrLine">

                                    </div>
                                    <span>Or</span>

                                    <div className="hrLine">

                                    </div>
                                </div>
                                <AuthenticationModal type={"SignUP"}>

                                    <button className="mainBtns">
                                        <HowToRegIcon className="navIcons" />
                                        <span>Sign up</span>
                                    </button>
                                </AuthenticationModal>

                            </div>

                        }

                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}

export default PopoverSetting
