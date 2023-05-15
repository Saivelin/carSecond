import React from 'react';
import Footer from './Footer';
import Header from './Header/Header';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Modal from './Modal';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRecoilState } from "recoil"
import { user } from "../state/atoms"

const Layout = ({ children }) => {
    const [userAuth, setUserAuth] = useRecoilState(user)
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setUserAuth(jwtDecode(localStorage.getItem("token")))
        }
    }, [])

    return (
        <div className='page'>
            <Head>
                <title>Car-tron</title>
                <link rel="icon" type="image/x-icon" href="/logo.ico" />
            </Head>
            <Header />
            <Modal />
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>{children}</motion.div>
            <Footer />
        </div>
    );
};

export default Layout;