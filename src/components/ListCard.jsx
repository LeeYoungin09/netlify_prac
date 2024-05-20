import style from "../css/ListCard.module.css";
import { useNavigate } from "react-router-dom";

const ListCard = ({ product }) => {
  console.log(product);
  const navigate = useNavigate();
  const setDetail = () => {
    navigate(`/products/${product.id}`);
  };
  return (
    <div className={style.listCard} onClick={setDetail}>
      <div className={style.pImg}>
        <img src={`/img/${product.img}`} alt={product.title} />
      </div>
      <div className={style.pInfo}>
        <p>{product.title}</p>
        <p>{Number(product.price).toLocaleString()}원</p>
      </div>
      {product.discount === "0" ? null : (
        <span className={style.discount}>{product.discount}%</span>
      )}
    </div>
  );
};

export default ListCard;
