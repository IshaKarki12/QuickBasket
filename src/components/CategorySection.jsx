import './CategorySection.css';

const categories = [
  { name: "Fruits", image: "https://i.pinimg.com/736x/6f/f9/09/6ff9096ba8908942cb9c780fc40607ce.jpg" },
  { name: "Vegetables", image: "https://i.pinimg.com/736x/b3/37/2d/b3372d4bd8515bfeb7cfe8fc203fed74.jpg" },
  { name: "Snacks", image: "https://i.pinimg.com/736x/4f/43/e4/4f43e403eaed6df4af46665a1e1877ff.jpg" },
  { name: "Dairy", image: "https://i.pinimg.com/736x/bb/f6/ce/bbf6ceb2f6b7a9113402094652b665e7.jpg" },
];

function CategorySection() {
  return (
    <section className="category-section">
      <h2>Shop by Category</h2>
      <div className="category-cards">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
