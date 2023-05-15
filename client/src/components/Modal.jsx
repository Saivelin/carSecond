import { motion } from "framer-motion";
import { useRecoilState } from "recoil"
import { modalState } from "../state/atoms.js"
import { useState } from "react";

const Modal = () => {
    const [comp, setComp] = useRecoilState(modalState)

    return (
        <motion.div
            className={comp === null ? "modalWrapper modalWrapper-closed" : "modalWrapper"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            onClick={e => setComp(null)}
        >
            <div className="modal" onClick={e => e.stopPropagation()}>
                {comp}
            </div>
        </motion.div>
    );
};

export default Modal;