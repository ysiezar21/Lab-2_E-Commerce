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

export default ProductCard;
