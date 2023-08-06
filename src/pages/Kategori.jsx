import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { BeatLoader } from "react-spinners";
import CreateTrashCategory from "../component/modals/addTrashCategory";
import EditTrashCategory from "../component/modals/editTrashCategory";

const Kategori = () => {
  const [activePage, setActivePage] = useState(1);
  const [hoveredPage, setHoveredPage] = useState(0);
  const [pages, setPages] = useState([1, 2, 3]);
  const [isCreateTrashCategoryModalOpen, setIsCreateTrashCategorykModalOpen] =
    useState(false);
  const [isEditTrashCategoryModalOpen, setIsEditTrashCategorykModalOpen] =
    useState(false);
  const [idTrashActive, setIdTrashActive] = useState();

  const {
    data: kategoriSampah,
    isLoading: kategoriSampahIsLoading,
    refetch: refetchKategoriSampah,
  } = useQuery(
    [
      "kategoriSampahCache",
      activePage,
      API.defaults.headers.common["Authorization"],
    ],
    async () => {
      try {
        const response = await API.get(
          `/trash/categories?page=${activePage}&limit=5`
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
      {kategoriSampahIsLoading ? (
        <div
          class="container-fluid p-4 d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <BeatLoader color="#36d7b7" />
        </div>
      ) : (
        <div class="container-fluid px-4">
          <h1 class="mt-4">Daftar Harga Sampah</h1>
          <CreateTrashCategory
            isOpen={isCreateTrashCategoryModalOpen}
            setIsOpen={setIsCreateTrashCategorykModalOpen}
            refetchKategoriSampah={refetchKategoriSampah}
          />
          <EditTrashCategory
            isOpen={isEditTrashCategoryModalOpen}
            setIsOpen={setIsEditTrashCategorykModalOpen}
            refetchKategoriSampah={refetchKategoriSampah}
            idTrash={idTrashActive}
          />
          <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
            <button
              onClick={() => {
                setIsCreateTrashCategorykModalOpen(true);
              }}
              className="btn btn-primary shadow-md mr-2"
            >
              <i className="fa fa-plus w-4 h-4 mr-2"> </i> Tambah Kategori
              Sampah
            </button>
          </div>
          {kategoriSampah?.length < 1 || !kategoriSampah ? (
            <h5 class="mt-4 text-center text-secondary">
              Belum Ada Kategori Sampah
            </h5>
          ) : (
            <>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Jenis Sampah</th>
                    <th scope="col">Harga Sampah/KG</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {kategoriSampah?.map((data, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{data.category}</td>
                        <td>{data.price}/KG</td>
                        <td>
                          <span
                            class="btn btn-app"
                            onClick={() => {
                              setIdTrashActive(data.id);
                              setIsEditTrashCategorykModalOpen(true);
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

export default Kategori;
