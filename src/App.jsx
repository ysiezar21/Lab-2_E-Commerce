import React from 'react';
import { InstantSearch, Configure, Stats } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import SearchBar from './components/SearchBar';
import FiltersSidebar from './components/FiltersSidebar';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import './styles.css';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

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