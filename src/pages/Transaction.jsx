import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { BeatLoader } from "react-spinners";
import CreateTransaction from "../component/modals/addTransaction";
import moment from "moment";
import "moment/locale/id";
import DetailTrxModal from "../component/modals/detailTransaction";
import EditTransaction from "../component/modals/editTransaction";
import Swal from "sweetalert2";

moment.locale("id");

const Transaction = () => {
  const [totalData, setTotalData] = useState();
  const [activePage, setActivePage] = useState(1);
  const [hoveredPage, setHoveredPage] = useState(0);
  const [pages, setPages] = useState([1, 2, 3]);
  const [isCreateTransactionModalOpen, setIsCreateTransactionModalOpen] =
    useState(false);
  const [isDetailTrxkModalOpen, setIsDetailTrxkModalOpen] = useState(false);
  const [isEditTrxkModalOpen, setIsEditTrxkModalOpen] = useState(false);
  const [idTrxActive, setIdTrxActive] = useState();
  const [limit] = useState(10);

  const {
    data: transaksi,
    isLoading: transaksiIsLoading,
    refetch: refetchTransaksi,
  } = useQuery(
    [
      "transaksiCache",
      activePage,
      API.defaults.headers.common["Authorization"],
    ],
    async () => {
      try {
        const response = await API.get(
          `/trash/transactions?page=${activePage}&limit=${limit}`
        );

        let pages = [];
        for (let i = 1; i <= response.data.totalPages; i++) {
          pages.push(i);
        }

        setPages(pages);
        setTotalData(response.data.totalData);

        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  const handleDeleteTransaction = useMutation(async (id) => {
    try {
      const response = await API.delete(`/trash/transactions/${id}`);
      if (response.data.status === 200) {
        if (
          pages?.length > 1 &&
          activePage === pages?.length &&
          totalData - (pages?.length - 1) * limit === 1
        ) {
          setActivePage((prev) => {
            return prev - 1;
          });
        }
        refetchTransaksi();
        Swal.fire("Deleted!", "Your transaction has been deleted.", "success");
      }
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <>
      {transaksiIsLoading ? (
        <div
          class="container-fluid p-4 d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <BeatLoader color="#36d7b7" />
        </div>
      ) : (
        <div class="container-fluid px-4">
          <h1 class="mt-4">Daftar Transaksi</h1>
          <CreateTransaction
            isOpen={isCreateTransactionModalOpen}
            setIsOpen={setIsCreateTransactionModalOpen}
            refetchTransaksi={refetchTransaksi}
          />
          <DetailTrxModal
            isOpen={isDetailTrxkModalOpen}
            setIsOpen={setIsDetailTrxkModalOpen}
            idTrx={idTrxActive}
          />
          <EditTransaction
            isOpen={isEditTrxkModalOpen}
            setIsOpen={setIsEditTrxkModalOpen}
            refetchTransaksi={refetchTransaksi}
            idTrx={idTrxActive}
          />
          <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
            <button
              onClick={() => {
                setIsCreateTransactionModalOpen(true);
              }}
              className="btn btn-primary shadow-md mr-2"
            >
              <i className="fa fa-plus w-4 h-4 mr-2"> </i> Tambah Transaksi
            </button>
          </div>
          {transaksi?.length < 1 || !transaksi ? (
            <h5 class="mt-4 text-center text-secondary">Belum Ada Transaksi</h5>
          ) : (
            <>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Nasabah</th>
                    <th scope="col">Jenis Sampah</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Total Harga</th>
                    <th
                      scope="col"
                      width={"15%"}
                      align="center"
                      className="text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transaksi?.map((el, i) => {
                    return (
                      <tr>
                        <th scope="row">
                          {activePage === 1
                            ? i + 1
                            : i + (activePage - 1) * limit + 1}
                        </th>
                        <td>
                          {moment(el.transactionTime).format(
                            "dddd, D MMMM YYYY HH:mm"
                          )}
                        </td>
                        <td>{el.customer.fullname}</td>
                        <td>{el.trash.category}</td>
                        <td>{el.qty} kg</td>
                        <td>Rp {el.totalPrice.toLocaleString()}</td>
                        <td align="center">
                          <span
                            class="btn btn-app"
                            onClick={() => {
                              setIdTrxActive(el.id);
                              setIsDetailTrxkModalOpen(true);
                            }}
                          >
                            <i class="fas fa-eye"></i>
                          </span>
                          <span
                            class="btn btn-app"
                            onClick={() => {
                              setIdTrxActive(el.id);
                              setIsEditTrxkModalOpen(true);
                            }}
                          >
                            <i class="fas fa-edit"></i>
                          </span>
                          <span
                            class="btn btn-app"
                            style={{
                              display:
                                localStorage.getItem("role") != 1 && "none",
                            }}
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleDeleteTransaction.mutate(el.id);
                                }
                              });
                            }}
                          >
                            <i class="fas fa-trash"></i>
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

export default Transaction;
