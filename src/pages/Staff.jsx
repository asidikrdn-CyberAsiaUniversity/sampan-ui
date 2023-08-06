import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { BeatLoader } from "react-spinners";
import CreateAdmin from "../component/modals/addStaffAdmin";
import DetailUserModal from "../component/modals/detailUser";

const Staff = () => {
  const [activePage, setActivePage] = useState(1);
  const [hoveredPage, setHoveredPage] = useState(0);
  const [pages, setPages] = useState([1, 2, 3]);
  const [isCreateAdminModalOpen, setIsCreateCustomerkModalOpen] =
    useState(false);
  const [isDetailUserModalOpen, setIsDetailUserkModalOpen] = useState(false);
  const [idUserActive, setIdUserActive] = useState();

  const {
    data: staff,
    isLoading: staffIsLoading,
    refetch: refetchStaff,
  } = useQuery(
    ["staffCache", activePage, API.defaults.headers.common["Authorization"]],
    async () => {
      try {
        const response = await API.get(
          `/users/staff?page=${activePage}&limit=10`
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
      {staffIsLoading ? (
        <div
          class="container-fluid p-4 d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <BeatLoader color="#36d7b7" />
        </div>
      ) : (
        <div class="container-fluid px-4">
          <h1 class="mt-4">Daftar Staff</h1>
          <CreateAdmin
            isOpen={isCreateAdminModalOpen}
            setIsOpen={setIsCreateCustomerkModalOpen}
            refetchAdmin={refetchStaff}
          />
          <DetailUserModal
            isOpen={isDetailUserModalOpen}
            setIsOpen={setIsDetailUserkModalOpen}
            idUser={idUserActive}
          />
          <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
            <button
              onClick={() => {
                setIsCreateCustomerkModalOpen(true);
              }}
              className="btn btn-primary shadow-md mr-2"
            >
              <i className="fa fa-plus w-4 h-4 mr-2"> </i> Tambah Staff
            </button>
          </div>
          {staff?.length < 1 || !staff ? (
            <h5 class="mt-4 text-center text-secondary">Belum Ada Staff</h5>
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
                  {staff?.map((data, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{data.fullname}</td>
                        <td>{data.phone ? data.phone : "-"}</td>
                        <td align="center">
                          {data.role.id === 1 ? (
                            "-"
                          ) : (
                            <>
                              <span
                                class="btn btn-app"
                                onClick={() => {
                                  setIdUserActive(data.id);
                                  setIsDetailUserkModalOpen(true);
                                }}
                              >
                                <i class="fas fa-eye"></i> View
                              </span>
                              <span class="btn btn-app">
                                <i class="fas fa-edit"></i> Edit
                              </span>
                            </>
                          )}
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

export default Staff;
