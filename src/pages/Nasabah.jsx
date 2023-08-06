import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { BeatLoader } from "react-spinners";
import CreateCustomer from "../component/modals/addCustomer";
import DetailUserModal from "../component/modals/detailUser";
import EditUser from "../component/modals/editUser";

const Nasabah = () => {
  const [activePage, setActivePage] = useState(1);
  const [hoveredPage, setHoveredPage] = useState(0);
  const [pages, setPages] = useState([1, 2, 3]);
  const [isCreateCustomerModalOpen, setIsCreateCustomerkModalOpen] =
    useState(false);
  const [isDetailUserModalOpen, setIsDetailUserkModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserkModalOpen] = useState(false);
  const [idUserActive, setIdUserActive] = useState();

  const {
    data: customer,
    isLoading: customerIsLoading,
    refetch: refetchCustomer,
  } = useQuery(
    ["customerCache", activePage, API.defaults.headers.common["Authorization"]],
    async () => {
      try {
        const response = await API.get(
          `/users/customer?page=${activePage}&limit=10`
        );

        let pages = [];
        for (let i = 1; i <= response.data.totalPages; i++) {
          pages.push(i);
        }

        setPages(pages);
        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  return (
    <>
      {customerIsLoading ? (
        <div
          class="container-fluid p-4 d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <BeatLoader color="#36d7b7" />
        </div>
      ) : (
        <div class="container-fluid px-4">
          <h1 class="mt-4">Daftar Nasabah</h1>
          <CreateCustomer
            isOpen={isCreateCustomerModalOpen}
            setIsOpen={setIsCreateCustomerkModalOpen}
            refetchCustomer={refetchCustomer}
          />
          <DetailUserModal
            isOpen={isDetailUserModalOpen}
            setIsOpen={setIsDetailUserkModalOpen}
            idUser={idUserActive}
          />
          <EditUser
            isOpen={isEditUserModalOpen}
            setIsOpen={setIsEditUserkModalOpen}
            refetchUser={refetchCustomer}
            idUser={idUserActive}
          />
          <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
            <button
              onClick={() => {
                setIsCreateCustomerkModalOpen(true);
              }}
              className="btn btn-primary shadow-md mr-2"
            >
              <i className="fa fa-plus w-4 h-4 mr-2"> </i> Tambah Nasabah
            </button>
          </div>
          {customer?.length < 1 || !customer ? (
            <h5 class="mt-4 text-center text-secondary">Belum Ada Nasabah</h5>
          ) : (
            <>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">No. HP</th>
                    <th
                      scope="col"
                      width={"20%"}
                      align="center"
                      className="text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.map((data, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{data.fullname}</td>
                        <td>{data.phone ? data.phone : "-"}</td>
                        <td align="center">
                          <span
                            class="btn btn-app"
                            onClick={() => {
                              setIdUserActive(data.id);
                              setIsDetailUserkModalOpen(true);
                            }}
                          >
                            <i class="fas fa-eye"></i> View
                          </span>
                          <span
                            class="btn btn-app"
                            onClick={() => {
                              setIdUserActive(data.id);
                              setIsEditUserkModalOpen(true);
                            }}
                          >
                            <i class="fas fa-edit"></i> Edit
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <p
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    margin: "0 5px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    color: "#333",
                    textDecoration: "none",
                    cursor: "pointer",
                    backgroundColor:
                      "&laquo" === hoveredPage ? "#F1F5F9" : "white",
                  }}
                  onClick={() => {
                    setActivePage((prev) => {
                      return prev > 1 ? prev - 1 : prev;
                    });
                  }}
                  onMouseOver={() => {
                    setHoveredPage("&laquo");
                  }}
                  onMouseOut={() => {
                    setHoveredPage(0);
                  }}
                >
                  &laquo;
                </p>
                {pages.map((page) => {
                  return (
                    <p
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        margin: "0 5px",
                        border: "1px solid #ccc",
                        borderRadius: "3px",
                        color: "#333",
                        textDecoration: "none",
                        cursor: "pointer",
                        backgroundColor:
                          page === activePage
                            ? "#E2E8F0"
                            : page === hoveredPage
                            ? "#F1F5F9"
                            : "white",
                      }}
                      onClick={() => {
                        setActivePage(page);
                      }}
                      onMouseOver={() => {
                        setHoveredPage(page);
                      }}
                      onMouseOut={() => {
                        setHoveredPage(0);
                      }}
                    >
                      {page}
                    </p>
                  );
                })}
                <p
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    margin: "0 5px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    color: "#333",
                    textDecoration: "none",
                    cursor: "pointer",
                    backgroundColor:
                      "&raquo" === hoveredPage ? "#F1F5F9" : "white",
                  }}
                  onClick={() => {
                    setActivePage((prev) => {
                      return prev < pages.length ? prev + 1 : prev;
                    });
                  }}
                  onMouseOver={() => {
                    setHoveredPage("&raquo");
                  }}
                  onMouseOut={() => {
                    setHoveredPage(0);
                  }}
                >
                  &raquo;
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Nasabah;
