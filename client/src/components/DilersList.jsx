import { useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/vars";

const DilersList = ({ dialers }) => {
    console.log(dialers)
    const [dilers, setDilers] = useState([
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test2.png", type: "double" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test2.png", type: "double" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
        { img: "test.png", type: "single" },
    ])

    return (
        <div className='dilersList'>
            {dialers.dialers.dialers.map((el) => {
                console.log(`${apiUrl}/${el.headerImageForDealer}`)
                return (
                    // <p>{el.lfp}</p>
                    // <img src={`${apiUrl}/${el.headerImageForDealer}`} alt="" />
                    <Link href={`/dilers/${el.id}`} className={
                        el?.type === 'single' ? "dilersList-item dilersList-item-single" : el.type === 'double' ? "dilersList-item dilersList-item-double" : "dilersList-item"
                    }>
                        <img src={`${apiUrl}/${el.headerImageForDealer}`} alt="" />
                    </Link>
                )
            })}
        </div>
    );
};

export default DilersList;