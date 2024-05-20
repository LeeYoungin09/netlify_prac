import ListCard from "./ListCard";

const MainList = ({ products }) => {
  return (
    <section className="mainlist">
      <h2>new 상품리스트</h2>
      <a href="/ShopAll">View All</a>
      <ul className="listCon">
        {products.map((product) => {
          //각각 개별적인 list data
          return (
            <li key={product.id}>
              <ListCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default MainList;
