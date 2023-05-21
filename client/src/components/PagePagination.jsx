
const PagePagination = ({ itemsPerPage, totalItems, paginate, className }) => {
    const pageNumbers = [];
    console.log("totalItems: " + totalItems)
    console.log("itemsPerPage: " + itemsPerPage)
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
        console.log(pageNumbers)
    }

    return (
        <div className={className ? "pagination-container " + className : "pagination-container"}>
            <ul className="pagination">
                {console.log(pageNumbers)}
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => paginate(number)}
                        className="page-number"
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PagePagination;