import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import { API } from "../../config/api";

const DetailUserModal = ({ isOpen, setIsOpen, idUser }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const {
    data: user,
    isLoading: userIsLoading,
    // refetch: refetchUser,
  } = useQuery(
    ["detailUserCache", idUser, API.defaults.headers.common["Authorization"]],
    async () => {
      try {
        const response = await API.get(`/users/${idUser}`);

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
      {userIsLoading && <BeatLoader color="#36d7b7" />}
      <div style={modalStyle}>
        <div style={contentStyle}>
          <button style={closeStyle} onClick={handleClose}>
            X
          </button>
          {/* Form Tambah Customer */}
          <div className="box p-3">
            <div className="grid grid-cols-12">
              <div class=" col-span-12 lg:col-span-12 mt-3">
                <h2 className="text-lg font-medium mr-auto">Detail User</h2>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="fullname" class="form-label">
                    Nama Lengkap
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <p>: {user?.fullname}</p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="email" class="form-label">
                    Email
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <p>: {user?.email}</p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="phone" class="form-label">
                    No. HP
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <p>: {user?.phone}</p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="address" class="form-label">
                    Alamat
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <p>: {user?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUserModal;
