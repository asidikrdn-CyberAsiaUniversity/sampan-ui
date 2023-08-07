const Footer = () => {
  return (
    <footer
      class="py-2 bg-light mt-auto"
      // style={{ marginLeft: "12vw", width: "88vw" }}
    >
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-between small">
          <div class="text-muted">
            Copyright &copy; SAMPAN (Sistem Administrasi Manajemen Pengelolaan
            Bank Sampah) 2023
          </div>
          <div>
            <span href="#">Privacy Policy</span>
            &middot;
            <span href="#">Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
