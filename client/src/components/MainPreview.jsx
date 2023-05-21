import Link from "next/link";
import { motion } from "framer-motion";

const MainPreview = () => {
    return (
        <motion.div className='mainPreview' transition={{ ease: "easeInOut", duration: .2 }} initial={{ opacity: .8, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mainPreview__content">
                <h1>CarTron - более 3000 продаж в неделю</h1>
                <Link href={"/registration"} className="button-secondary">Зарегистрироваться</Link>
            </div>
        </motion.div>
    );
};

export default MainPreview;