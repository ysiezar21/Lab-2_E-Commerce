import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBar = connectSearchBox(({ currentRefinement, refine }) => (
  <div className="search-wrapper">
    <input
      type="text"
      value={currentRefinement}
      onChange={e => refine(e.target.value)}
      placeholder=" Buscar productos..."
      className="search-input"
    />
  </div>
));

export default SearchBar;