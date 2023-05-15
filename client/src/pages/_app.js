import '@/styles/globals.scss'
import Layout from '@/components/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import {
    RecoilRoot,
} from 'recoil';

export default function App({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <ChakraProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </RecoilRoot>
    )
}
