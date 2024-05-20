import { Link, Outlet } from "react-router-dom";

const Company = () => {
  return (
    <section className="mw">
      <h2>Our Shop</h2>
      <div style={{ height: "300px", backgroundColor: "lightcoral" }}>
        1depth관련 이미지
      </div>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem 0",
        }}
      >
        <Link to="/company/ceo">CEO 인사말</Link>
        {/* //company의 메인페이지 */}
        <Link to="/company/organization">조직도</Link>
        <Link to="/company/ci">CI</Link>
      </nav>
      <Outlet />
    </section>
  );
};

export default Company;
