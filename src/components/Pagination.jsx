import PropTypes from 'prop-types'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const lastPage = Math.max(totalPages ?? 1, currentPage)

  if (lastPage <= 1) return null

  return (
    <nav className="pagination-nav" aria-label="Media list pagination">
      <button
        className="pagination-nav__button"
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span className="pagination-nav__status" aria-live="polite">
        Page {currentPage} of {lastPage}
      </span>
      <button
        className="pagination-nav__button"
        type="button"
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination
