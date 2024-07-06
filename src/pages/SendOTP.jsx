import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import auth from "../firebase/firebase.config";
import { useNavigate, useParams } from "react-router-dom";

const SendOTP = () => {
    const navigate = useNavigate()
    const { mobileNumber } = useParams();
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'normal',
                callback: (response) => {
                    onSignup();
                },
                "expired-callback": () => { },
            });
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();


        const formatPh = "+" + ph;
        console.log(formatPh);

        const ForgetPasswordVerifier = window.recaptchaVerifier;
        console.log(ForgetPasswordVerifier);
        signInWithPhoneNumber(auth, formatPh, ForgetPasswordVerifier)
            .then((confirmationResult) => {
                console.log("result", confirmationResult);
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log("Got Error", error);
                setLoading(false);
                toast.error(error.message);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then((res) => {
                console.log(res);
                setUser(res.user);
                toast.success("OTP verified successfully!");
                navigate(`/newPass/${mobileNumber}`)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <section className="bg-gradient-to-b from-[#e0f2fa] to-white text-black flex items-center justify-center h-screen">
            <div>
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>

                <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                    {showOTP ? (
                        <>
                            <div className="bg-gradient-to-b from-[#e0f2fa] to-white text-black w-fit mx-auto p-4 rounded-full">
                                <BsFillShieldLockFill size={30} />
                            </div>
                            <label
                                htmlFor="otp"
                                className="font-bold text-xl text-black text-center"
                            >
                                Enter your OTP
                            </label>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                OTPLength={6}
                                otpType="number"
                                disabled={false}
                                autoFocus
                                className="opt-container "
                            ></OtpInput>
                            <button
                                onClick={onOTPVerify}
                                className="btn btn-info w-full text-lg font-thin text-white  flex gap-1 items-center justify-center py-2.5 rounded"
                            >
                                {loading && (
                                    <CgSpinner size={20} className="mt-1 animate-spin" />
                                )}
                                <span>Verify OTP</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <label
                                htmlFor=""
                                className="font-bold text-xl text-black text-center"
                            >
                                Verify your phone number
                            </label>
                            <PhoneInput country={"bd"} value={ph} onChange={setPh} />
                            <button
                                onClick={onSignup}
                                className=" btn btn-info w-full font-thin text-lg text-white flex gap-1 items-center justify-center py-2.5   rounded"
                            >
                                {loading && (
                                    <CgSpinner size={20} className="mt-1 animate-spin" />
                                )}
                                <span>Send code via SMS</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SendOTP;