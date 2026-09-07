import { connectHits } from 'react-instantsearch-dom';
import ProductCard from './ProductCard';

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

export default ProductGrid;