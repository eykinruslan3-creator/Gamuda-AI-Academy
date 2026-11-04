function ProductCard({ name, price, image, isOnSale }) {
    return (
        <article className="product-card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>${price.toFixed(2)}</p>
            {isOnSale && <span>On sale</span>}
        </article>
    );
}

export { ProductCard };

function ProductList() {
    const products = [
        { id: 1, name: "Wireless Headphones", price: 99.99, image: "/headphones.jpg", isOnSale: true },
        { id: 2, name: "Smartwatch", price: 149.99, image: "/smartwatch.jpg", isOnSale: false },
        { id: 3, name: "Running Shoes", price: 79.99, image: "/shoes.jpg", isOnSale: true }
    ];

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    isOnSale={product.isOnSale}
                />
            ))}
        </div>
    );
}

export default ProductList;