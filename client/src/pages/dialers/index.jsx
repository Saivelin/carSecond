import DIlersMap from '@/components/DIlersMap';
import DilersList from '@/components/DilersList';
import React from 'react';
import { getDealers } from '@/http/userAPI';

export const getServerSideProps = async (context) => {
    const response = await getDealers()

    return {
        props: { dialers: response }
    }
}

const index = (dialers) => {
    return (
        <div className='dilersPage'>
            <DIlersMap />
            <DilersList dialers={dialers} />
        </div>
    );
};

export default index;