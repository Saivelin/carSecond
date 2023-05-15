import Catalog from '@/components/Catalog'
import MainPreview from '@/components/MainPreview'
import styles from '@/styles/Home.module.scss'
import { motion } from "framer-motion";

export default function Home() {
    return (
        <main className={styles.main}>
            <MainPreview />
            <Catalog />
        </main >
    )
}
