import { connectRefinementList } from 'react-instantsearch-dom';

const CategoryFilter = connectRefinementList(({ items, refine }) => (
  <ul className="category-list">
    {items.map(item => (
      <li key={item.label}>
        <label>
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
          />
          {item.label} <span className="count">({item.count})</span>
        </label>
      </li>
    ))}
  </ul>
));

export default CategoryFilter;