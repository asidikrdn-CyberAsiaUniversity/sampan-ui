import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import { API } from "../../config/api";

const DetailTrxModal = ({ isOpen, setIsOpen, idTrx }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const {
    data: trx,
    isLoading: trxIsLoading,
    // refetch: refetchTrx,
  } = useQuery(
    ["detailTrxCache", idTrx, API.defaults.headers.common["Authorization"]],
    async () => {
      try {
        const response = await API.get(`/trash/transactions/${idTrx}`);

        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  // Styling
  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: isOpen ? "block" : "none",
  };
  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
  };
  // const titleStyle = {
  //   fontSize: "2rem",
  //   marginBottom: "20px",
  // };
  const closeStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#666",
    border: "none",
    background: "none",
    cursor: "pointer",
  };

  // console.log("data form", form);
  return (
    <div>
      {trxIsLoading && <BeatLoader color="#36d7b7" />}
      <div style={modalStyle}>
        <div style={contentStyle}>
          <button style={closeStyle} onClick={handleClose}>
            X
          </button>
          <div className="box p-3">
            <div className="grid grid-cols-12">
              <div class=" col-span-12 lg:col-span-12 mt-3">
                <h2 className="text-lg font-medium mr-auto">
                  Detail Transaksi
                </h2>
              </div>

              <div className="row">
                <div className="col-6">
                  <h5 className="mt-3">Jenis Sampah</h5>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <label for="trash-category" class="form-label">
                        Kategori
                      </label>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div>: {trx?.trash?.category}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <label for="trash-price" class="form-label">
                        Harga per Kg
                      </label>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div>: Rp {trx?.trash?.price.toLocaleString()}</div>
                    </div>
                  </div>

                  <h5 className="mt-3">Transaksi</h5>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <label for="qty" class="form-label">
                        Jumlah Sampah
                      </label>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div>: {trx?.qty} kg</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <label for="total" class="form-label">
                        Total Harga
                      </label>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div>: Rp {trx?.totalPrice.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <h5 className="mt-3">Nasabah</h5>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <label for="fullname" class="form-label">
                        Nama Lengkap
                      </label>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div>: {trx?.customer?.fullname}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <label for="email" class="form-label">
                        Email
                      </label>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div>: {trx?.customer?.email}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <label for="phone" class="form-label">
                        No. HP
                      </label>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div>: {trx?.customer?.phone}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <label for="address" class="form-label">
                        Alamat
                      </label>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div>: {trx?.customer?.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-secondary">
                Created By {trx?.createdBy?.fullname}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTrxModal;
