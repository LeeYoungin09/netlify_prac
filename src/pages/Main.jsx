import { useEffect } from "react";
import Banner from "../components/Banner.jsx";
import MainList from "../components/MainList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../store/ProductStore.js";

const Main = () => {
  // let products = useSelector()
  // products: [],
  // status: "idle",
  // error: null,
  // 객체정보가 다 들어감 -> 수정필요
  let productsState = useSelector((state) => state.products);
  let products = productsState.products;
  // console.log(productsState);
  // console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList("new"));
  }, [dispatch]);

  if (productsState.status !== "succeeded") {
    return <div>로딩중...</div>;
  }

  return (
    <main className="mw">
      <Banner />
      <MainList products={products} />
    </main>
  );
};

export default Main;
