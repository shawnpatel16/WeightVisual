import React, { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { motion } from "framer-motion";

const ShowPage = ({ onUserLogin }) => {
  const [isRegisterModalOpen, setOpenRegister] = useState(false);
  const [isLoginModalOpen, setOpenLogin] = useState(false);
  const useTypewriter = (text = "", speed = 100) => {
    const [output, setOutput] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (index < text.length) {
        const timeoutId = setTimeout(() => {
          setOutput((output) => output + text[index]);
          setIndex((index) => index + 1);
        }, speed);
        return () => clearTimeout(timeoutId);
      }
    }, [index, text, speed]);

    return output;
  };
  const quoteText =
    "Everybody wants to be a bodybuilder, but nobody wants to lift no heavy weights.";
  const typedText = useTypewriter(quoteText, 50);

  const openRegisterModal = () => {
    setOpenRegister(true);
  };

  const closeRegisterModal = () => {
    setOpenRegister(false);
  };

  const openLoginModal = () => {
    setOpenLogin(true);
  };

  const closeLoginModal = () => {
    setOpenLogin(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center w-1/2">
        <h1 className="text-6xl font-sans font-bold text-gray-900 mb-8">
          DYEL Diary
        </h1>
        <div className="quote mb-8 text-center w-full px-8">
          <span id="quote" className="text-gray-600 text-4xl block">
            {typedText}
          </span>
          <span
            id="quote-author"
            className="text-gray-500 text-lg italic block mt-2"
          >
            - Some Bodybuilder Probably
          </span>
        </div>
        <div className="buttons flex justify-center w-full">
          <button
            onClick={openRegisterModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 mr-2"
          >
            Register
          </button>
          <button
            onClick={openLoginModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 ml-2"
          >
            Login
          </button>
        </div>
      </div>
      <motion.img
        src="/IMG_6901.png"
        alt="description"
        className="w-1/2 h-auto"
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        login={onUserLogin}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        login={onUserLogin}
      />
    </div>
  );
};

export default ShowPage;
