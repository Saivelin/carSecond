import { motion } from "framer-motion";
import { useEffect } from "react";

const PagePagination = ({ itemsPerPage, totalItems, paginate, className, currentPage }) => {
    const pageNumbers = [];
    console.log("totalItems: " + totalItems)
    console.log("itemsPerPage: " + itemsPerPage)
    let j = 0
    let addedFirst = false

    const updatePageNumbers = () => {
        for (let i = currentPage - 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            if (i != 0) {
                if (j >= 3) {
                    pageNumbers.push("...");
                    pageNumbers.push(Math.ceil(totalItems / itemsPerPage));
                    break
                }
                else {
                    pageNumbers.push(i);
                    console.log(pageNumbers)
                }
            }
            j++
        }
        if (currentPage > 2) {
            if (addedFirst == false) {
                pageNumbers.unshift("...")
                pageNumbers.unshift(1)
                addedFirst = true
            }
        }
    }

    updatePageNumbers()

    const togglePage = (number) => {
        if (currentPage != number && number != "..." && number > 0 && number <= Math.ceil(totalItems / itemsPerPage)) {
            paginate(number)
        }
    }

    return (
        <motion.div transition={{ duration: .2, type: "tween" }} initial={{ y: 10, scale: 1 }} animate={{ y: 0, scale: 1 }} className={className ? "pagination-container " + className : "pagination-container"}>
            <ul className="pagination">
                {console.log(pageNumbers)}
                <img src="/prevarrow.webp" alt="" onClick={() => { togglePage(currentPage - 1) }} />
                {pageNumbers.map((number, i) => {

                    return (<motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={number}
                        onClick={() => { togglePage(number) }}
                        className={
                            currentPage != number
                                ?
                                number != "..."
                                    ? "page-number"
                                    : ""
                                : "page-number page-number-active"}
                    >
                        {number}
                    </motion.li>)
                })}
                <img src="/nextarrow.webp" alt="" onClick={() => { togglePage(currentPage + 1) }} />
            </ul>
        </motion.div>
    );
};

export default PagePagination;