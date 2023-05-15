import { apiUrl } from "@/vars";
import { getDealerById } from "@/http/userAPI";

export const getServerSideProps = async (context) => {
    const { id } = context.params
    const response = await getDealerById(id)

    return {
        props: { dialer: response[0] }
    }
}

const dialerIndividualPage = ({ dialer }) => {
    console.log(dialer)
    return (
        <div className='dialerIndividualPage'>
            <p>{dialer.lfp}</p>
        </div>
    );
};

export default dialerIndividualPage;