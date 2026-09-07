import { connectPagination } from 'react-instantsearch-dom';

const Pagination = connectPagination(({ currentRefinement, nbPages, refine }) => {
  if (nbPages <= 1) return null;
  
  const pages = [];
  const maxVisible = 5;
  
  let start = Math.max(1, currentRefinement - Math.floor(maxVisible / 2));
  let end = Math.min(nbPages, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => refine(i)}
        className={i === currentRefinement ? 'active' : ''}
      >
        {i}
      </button>
    );
  }
  
  return (
    <div className="pagination">
      <button 
        disabled={currentRefinement === 1} 
        onClick={() => refine(currentRefinement - 1)}
        className="arrow"
      >
        ‹
      </button>
      {pages}
      <button 
        disabled={currentRefinement === nbPages} 
        onClick={() => refine(currentRefinement + 1)}
        className="arrow"
      >
        ›
      </button>
    </div>
  );
});

export default Pagination;