import React, { useState } from 'react';

function ProductFilter({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  // Tapisan produk berdasarkan carian dan kategori
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pengendalian kekunci (Keyboard events) untuk input carian
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchTerm(''); // Kosongkan carian apabila tekan Escape
    } else if (e.key === 'Enter' && filteredProducts.length > 0) {
      // Pilih hasil pertama apabila tekan Enter (contoh: tambah ke favorites)
      const firstProduct = filteredProducts[0];
      if (!favorites.includes(firstProduct.id)) {
        setFavorites([...favorites, firstProduct.id]);
      }
    }
  };

  // Fungsi untuk tambah/buang dari kegemaran
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h3>Exercise 2: Real-time Search Filter</h3>

      {/* Kotak Carian dan Dropdown Kategori */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          type="text"
          placeholder="Cari produk... (Tekan Esc untuk padam, Enter untuk pilih)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '8px' }}
        />

        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="All">Semua Kategori</option>
          <option value="Fruit">Buah-buahan</option>
          <option value="Vegetable">Sayuran</option>
        </select>
      </div>

      {/* Senarai Produk */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <li 
                key={product.id}
                onClick={() => toggleFavorite(product.id)}
                style={{
                  padding: '10px',
                  margin: '5px 0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: isFav ? '#e6f4ea' : '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{product.name} ({product.category})</span>
                <span style={{ fontSize: '12px', color: isFav ? 'green' : '#777' }}>
                  {isFav ? '❤️ Kegemaran' : '🤍 Klik untuk Fav'}
                </span>
              </li>
            );
          })
        ) : (
          <p style={{ color: '#777' }}>Tiada produk dijumpai.</p>
        )}
      </ul>
    </div>
  );
}

export default ProductFilter;