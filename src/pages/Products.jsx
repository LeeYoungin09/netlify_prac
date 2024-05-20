import style from "../css/Detail.module.css";
import { Tab, Tabs, Modal, Button } from "react-bootstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ListCard from "../components/ListCard";
import { addItem } from "../store/cartStore";
import { useDispatch } from "react-redux";

const Products = () => {
  const { id } = useParams();
  // console.log("상품아이디---", id);
  // const [products, setProducts] = useState([]); //상품정보
  const [products, setProducts] = useState(null); // null -- ? 초기값 대응, []쓰지않도록 주의
  const [similarList, setsimilarList] = useState([]); //관련상품
  const [count, setCount] = useState(1); // 기본값:1

  // 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //장바구니
  let dispatch = useDispatch();
  let navigate = useNavigate(); //변수선언필수!

  // id가 일치하는 하나의 상품
  const getProductList = async () => {
    let url = `https://my-json-server.typicode.com/LeeYoungin09
    /netlify_prac/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);
    // console.log("상품정보---", products);

    let url2 = `https://my-json-server.typicode.com/LeeYoungin09
    /netlify_prac/products/?category=${data.category}`;
    let response2 = await fetch(url2);
    let data2 = await response2.json();
    setsimilarList(data2); //카테고리가 똑같은 상품리스트
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    getProductList();
  }, [id]); //상세페이지 변경

  return (
    <main className="mw">
      <h2>상품상세페이지</h2>
      <section className={style.productCon}>
        <div className={style.imgCon}>
          <img src={`/img/${products?.img}`} alt={products?.title} />
        </div>
        <div className={style.pInfo}>
          <p>상품명 : {products?.title}</p>
          <p>가격 : {Number(products?.price).toLocaleString()}원</p>
          <p>할인률 : {products?.discount}%</p>
          <div className={style.count}>
            <span>수량 : </span>
            {count === 1 ? (
              <button onClick={decrement} disabled>
                -
              </button>
            ) : (
              <button onClick={decrement}>-</button>
            )}
            <span>{count}</span>
            <button onClick={increment}>+</button>
          </div>
          <button
            onClick={() => {
              handleShow();
            }}
          >
            장바구니
          </button>
        </div>
      </section>
      <section className={style.pDesc}>
        <Tabs
          defaultActiveKey="Description"
          id="fill-tab-example"
          className="mb-3"
          //   fill
        >
          <Tab eventKey="Description" title="Description">
            Description 영역
          </Tab>
          <Tab eventKey="Additional" title="Additional information">
            Additional information 영역
          </Tab>
          <Tab eventKey="Reviews" title="Reviews">
            Reviews 영역
          </Tab>
        </Tabs>
      </section>
      <section>
        <Swiper
          slidesPerView={4} //수정
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {similarList.map((p) => (
            <SwiperSlide key={p.id}>
              <ListCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>장바구니에 추가되는 상품 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          추가되는 상품 정보 다시 보여주기
          <p>{products?.title}</p>
          <p>{products?.price}</p>
          <p>{count}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                addItem({
                  id: products.id,
                  title: products.title,
                  img: products.img,
                  price: products.price,
                  category: products.category,
                  discount: products.discount,
                  count: count,
                })
              );
              navigate("/cart");
            }}
          >
            장바구니 추가
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Products;
