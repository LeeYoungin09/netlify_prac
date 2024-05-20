import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeAge, changeName } from "../store/userStore";
import { addCount, minusCount, delItem } from "../store/cartStore";

const Cart = () => {
  let user = useSelector((state) => state.user);
  // console.log(user);
  // console.log(user.username);
  // let stock = useSelector((state) => state.stock);
  // console.log(stock.pdstock[0]);
  let cart = useSelector((state) => state.cart);
  // console.log(cart);

  // onClick-라우터용, 변수 선언필요
  let navigate = useNavigate();

  // 이름정보 업데이트
  // changeName("김수미");
  let dispatch = useDispatch();

  return (
    <main className="mw">
      <h2>{user.username}님 장바구니</h2>
      <button
        onClick={() => {
          dispatch(changeName("김수민"));
        }}
      >
        이름 변경
      </button>
      <br />
      <p>재고리스트 : 3개의 아이템</p>
      {user.age}
      <button
        onClick={() => {
          dispatch(changeAge(1));
        }}
      >
        변경
      </button>

      <Table striped bordered hover className="cart">
        <colgroup>
          <col width={"50px"} />
          <col width={"*"} />
          <col width={"150px"} />
          <col width={"100px"} />
          <col width={"100px"} />
          <col width={"100px"} />
          <col width={"80px"} />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>상품명/이미지/옵션</th>
            <th>상품가격</th>
            <th>할인률</th>
            <th>상품수량</th>
            <th>금액</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.id}>
                <td className="center">{item.id}</td>
                <td
                  onClick={() => {
                    navigate(`/products/${item.id}`);
                  }}
                >
                  <div className="img">
                    {/* 2줄처럼 보이는것을 처리하기 위해 div로 한번 더 감싸줌 */}
                    <div>
                      <img src={`/img/${item.img}`} alt={item.title} />
                    </div>
                    <p>{item.title}</p>
                  </div>
                </td>
                <td className="right">
                  {Number(item.price).toLocaleString()}원
                </td>
                <td className="center">{item.discount}%</td>
                <td className="center">
                  {item.count === 1 ? (
                    // <button onClick={decrement} disabled>
                    <button disabled>-</button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(minusCount(item.id));
                      }}
                    >
                      -
                    </button>
                  )}
                  <span>{item.count}</span>
                  <button
                    onClick={() => {
                      dispatch(addCount(item.id));
                    }}
                  >
                    +
                  </button>
                  개
                </td>
                <td className="right">
                  {Number(
                    item.price * (1 - item.discount / 100) * item.count
                  ).toLocaleString()}
                  원
                </td>
                <td
                  className="center"
                  onClick={() => {
                    dispatch(delItem(item.id));
                  }}
                >
                  <i className="fa-solid fa-delete-left"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className="right">
              {cart
                .reduce((a, b) => {
                  return a + b.price * (1 - b.discount / 100) * b.count;
                }, 0)
                .toLocaleString()}
              원
            </td>
          </tr>
        </tfoot>
      </Table>
    </main>
  );
};

export default Cart;
