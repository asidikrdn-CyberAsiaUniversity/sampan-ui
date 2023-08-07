import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          class="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
          style={{
            width: "12vw",
            height: "95vh",
            position: "sticky",
            top: "5vh",
          }}
          // style={{ , width: 250 }}
        >
          <div class="sb-sidenav-menu">
            <div class="nav">
              <div class="sb-sidenav-menu-heading">Menu</div>
              <div
                class="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </div>
              <div
                class="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/trx")}
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-exchange"></i>
                </div>
                Transaksi
              </div>
              <div class="sb-sidenav-menu-heading">Master Data</div>
              <div
                class="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/kat")}
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-list"></i>
                </div>
                Kategori Sampah
              </div>
              <div
                class="nav-link collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#user"
                aria-expanded="false"
                aria-controls="collapsePages"
                style={{ cursor: "pointer" }}
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-user"></i>
                </div>
                User
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                class="collapse"
                id="user"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <div
                    class="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/nas")}
                  >
                    Nasabah
                  </div>
                  <div
                    class="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/stf")}
                  >
                    Staff Admin
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div class="sb-sidenav-footer py-3"></div>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
