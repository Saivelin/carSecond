import NewAdSelect from "./UI/NewAdSelect"
import { motion } from "framer-motion";

const DIlersMap = () => {

    const list = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.01,
            },
        },
        hidden: {
            opacity: 0,
            x: -10,
            transition: {
                when: "afterChildren",
            },
        },
    }

    const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: 10 },
    }

    return (
        <div className='dilersMap'>
            <motion.form action="" className="dilersMap__form" initial="hidden" whileInView="visible" variants={list}>
                <motion.div variants={item}>
                    <NewAdSelect placeholder='Класс авто' />
                </motion.div>
                <motion.div variants={item}>
                    <NewAdSelect placeholder='Марка' />
                </motion.div>
                <motion.div variants={item}>
                    <NewAdSelect placeholder='Модель' />
                </motion.div>
                <motion.div variants={item}>
                    <NewAdSelect placeholder='Поколение' />
                </motion.div>
                <motion.div variants={item}>
                    <NewAdSelect placeholder='Год выпуска' />
                </motion.div>
                <motion.div variants={item}>
                    <NewAdSelect placeholder='Двигатель' />
                </motion.div>
                <motion.div className="dilersMap__form-twoInOne" variants={item}>
                    <input type="text" className="dilersMap__input" placeholder="Цена От" />
                    <input type="text" className="dilersMap__input" placeholder="До" />
                </motion.div>
                <motion.div className="dilersMap__form-twoInOne" variants={item}>
                    <input type="text" className="dilersMap__input" placeholder="Мощность От" />
                    <input type="text" className="dilersMap__input" placeholder="До" />
                </motion.div>
            </motion.form>
            <div className="dilersMap__map">map</div>
        </div>
    );
};

export default DIlersMap;