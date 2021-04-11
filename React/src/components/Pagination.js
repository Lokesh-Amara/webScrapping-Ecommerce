import React from "react"

const Pagination =({displaysPerPage, totalPosts, paginate}) => {
    const PageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / displaysPerPage); i++) {
        PageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {PageNumbers.map( numb => (
                    <li key={numb} className="page-item">
                        <a onClick={ () => paginate(numb)} href='!#' className="page-link">
                            {numb}
                        </a>
                    </li>
                ))}
            </ul>

        </nav>
    )
}

export default Pagination;