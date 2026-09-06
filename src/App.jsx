import React from 'react';
import { 
  InstantSearch, 
  Configure, 
  Stats, 
  connectSearchBox, 
  connectRefinementList, 
  connectRange, 
  connectHits, 
  connectPagination 
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import ReactSlider from 'react-slider';
import './styles.css';

// ============ CONFIGURACIÓN ============
const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

// ============ COMPONENTES UI ============

// 1. BARRA DE BÚSQUEDA
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

// 2. FILTROS LATERALES
const FiltersSidebar = () => (
  <aside className="filters-sidebar">
    <h3> Filtros</h3>

    <div className="filter-group">
      <h4>Marca</h4>
      <CategoryFilter attribute="brand" />
    </div>
    
    <div className="filter-group">
      <h4>Categoría</h4>
      <CategoryFilter attribute="categories" />
    </div>

    <div className="filter-group">
      <h4>Color</h4>
      <CategoryFilter attribute="facets.color" />
    </div>

    <div className="filter-group">
      <h4> Precio</h4>
      <PriceSlider attribute="price" />
    </div>
  </aside>
);

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

// ===== PRICE SLIDER CON DOBLE INTERRUPTOR =====
const PriceSlider = connectRange(({ min, max, currentRefinement, refine }) => {
  const [values, setValues] = React.useState([
    currentRefinement.min ?? min ?? 0,
    currentRefinement.max ?? max ?? 650
  ]);

  React.useEffect(() => {
    setValues([
      currentRefinement.min ?? min ?? 0,
      currentRefinement.max ?? max ?? 650
    ]);
  }, [currentRefinement.min, currentRefinement.max, min, max]);

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  const handleAfterChange = (newValues) => {
    refine({
      min: newValues[0],
      max: newValues[1]
    });
  };

  return (
    <div className="price-slider-container">
      <ReactSlider
        className="price-slider"
        thumbClassName="price-thumb"
        trackClassName="price-track"
        min={min ?? 0}
        max={max ?? 650}
        value={values}
        onChange={handleChange}
        onAfterChange={handleAfterChange}
        pearling
        minDistance={10}
        renderThumb={(props, state) => (
          <div {...props} data-value={`$${state.valueNow}`} />
        )}
      />
      <div className="price-values">
        <span className="price-min">${values[0]}</span>
        <span className="price-max">${values[1]}</span>
      </div>
    </div>
  );
});
// 3. CUADRÍCULA DE PRODUCTOS
const ProductGrid = connectHits(({ hits }) => (
  <div className="product-grid">
    {hits.length === 0 ? (
      <div className="empty-state">
        <p> No se encontraron productos</p>
        <p className="empty-sub">Prueba con otros términos de búsqueda</p>
      </div>
    ) : (
      hits.map(hit => <ProductCard key={hit.objectID} hit={hit} />)
    )}
  </div>
));

const ProductCard = ({ hit }) => (
  <div className="product-card">
    {hit.image_url ? (
      <img src={hit.image_url} alt={hit.title} loading="lazy" />
    ) : (
      <div className="no-image"> No Image </div>
    )}
    <div className="product-info">
      <h3>{hit.title}</h3>
      <p className="category">{hit.categories?.join(', ') || 'Sin categoría'}</p>
      <p className="price">${hit.price?.toFixed(2) || '0.00'}</p>
    </div>
  </div>
);

// 4. PAGINACIÓN
const Pagination = connectPagination(({ currentRefinement, nbPages, refine }) => {
  if (nbPages <= 1) return null;
  
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(0, currentRefinement - Math.floor(maxVisible / 2));
  let end = Math.min(nbPages, start + maxVisible);
  
  if (end - start < maxVisible) {
    start = Math.max(0, end - maxVisible);
  }
  
  for (let i = start; i < end; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => refine(i)}
        className={i === currentRefinement ? 'active' : ''}
      >
        {i + 1}
      </button>
    );
  }
  
  return (
    <div className="pagination">
      <button 
        disabled={currentRefinement === 0} 
        onClick={() => refine(currentRefinement - 1)}
        className="arrow"
      >
        ‹
      </button>
      {pages}
      <button 
        disabled={currentRefinement === nbPages - 1} 
        onClick={() => refine(currentRefinement + 1)}
        className="arrow"
      >
        ›
      </button>
    </div>
  );
});

// ============ APP PRINCIPAL ============
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1> Catalogo de Productos </h1>
        <p className="subtitle">Laboratorio 2</p>
      </header>
      
      <InstantSearch 
        searchClient={searchClient} 
        indexName={process.env.REACT_APP_ALGOLIA_INDEX}
      >
        <Configure hitsPerPage={12} />
        
        <div className="search-section">
          <SearchBar />
          <div className="stats-wrapper">
            <Stats />
          </div>
        </div>
        
        <div className="results-section">
          <FiltersSidebar />
          <div className="products-section">
            <ProductGrid />
            <Pagination />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default App;