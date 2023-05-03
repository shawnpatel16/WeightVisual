import React, {useState} from 'react'
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";



const ShowPage = () => {
    const [isRegisterModalOpen, setOpenRegister] = useState(false);
    const [isLoginModalOpen, setOpenLogin] = useState(false);

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
    <div className='pl-24'>
      <h1>Show Page</h1>
      <button onClick={openRegisterModal}>Register</button>
      <button onClick={openLoginModal}>Login</button>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
    </div>
  );
}

export default ShowPage