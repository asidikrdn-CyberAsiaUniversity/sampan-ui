import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Select from "react-select";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { API } from "../../config/api";

function EditTransaction({ isOpen, setIsOpen, refetchTransaksi, idTrx }) {
  const [form, setForm] = useState({});
  const [customerOption, setCustomerOption] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);

  const {
    data: trx,
    isLoading: trxIsLoading,
    // refetch: refetchTrx,
  } = useQuery(
    [
      "detailTrxCache",
      isOpen,
      idTrx,
      API.defaults.headers.common["Authorization"],
    ],
    async () => {
      try {
        const response = await API.get(`/trash/transactions/${idTrx}`);

        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  useEffect(() => {
    console.log(trx);
    setForm({
      userId: trx?.customer.id,
      trashId: trx?.trash.id,
      qty: trx?.qty,
    });
  }, [trx]);

  // add Transaction to server
  const handleUpdateTransaction = useMutation(async (e) => {
    e.preventDefault();
    try {
      const response = await API.patch(`/trash/transactions/${idTrx}`, {
        userId: form.userId,
        trashId: form.trashId,
        qty: parseInt(form.qty),
      });

      if (response.data.status === 201 || response.data.status === 200) {
        // close modal
        refetchTransaksi();
        handleClose();
        Swal.fire({
          icon: "success",
          text: `Berhasil mengupdate transaksi`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  });

  const handleClose = () => {
    setIsOpen(false);
    setForm({});
  };

  const handleChangeForm = (e) => {
    const regex = /^[\d]+$/;
    if (
      e.target.id === "qty" &&
      e.target.value !== "" &&
      !regex.test(e.target.value)
    ) {
      return Swal.fire({
        icon: "error",
        text: "Jumlah Sampah harus berupa angka !",
      });
    }

    setForm((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  useQuery(
    [
      "kategoriSampahCache",
      isOpen,
      API.defaults.headers.common["Authorization"],
    ],
    async () => {
      try {
        const response = await API.get(`/trash/categories`);

        let opt = [];

        response.data.data.forEach((el) => {
          opt.push({ value: el.id, label: el.category });
        });

        console.log("categoryOpt :", opt);
        setCategoryOption(opt);

        // return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  useQuery(
    ["customerCache", isOpen, API.defaults.headers.common["Authorization"]],
    async () => {
      try {
        const response = await API.get(`/users/customer`);

        let opt = [];

        response.data.data.forEach((el) => {
          opt.push({ value: el.id, label: el.fullname });
        });

        console.log("customerOpt :", opt);
        setCustomerOption(opt);

        // return response.data.data;
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
      {handleUpdateTransaction.isLoading && <BeatLoader color="#36d7b7" />}
      {trxIsLoading && <BeatLoader color="#36d7b7" />}
      <div style={modalStyle}>
        <div style={contentStyle}>
          <button style={closeStyle} onClick={handleClose}>
            X
          </button>
          {/* Form Edit TrashCategory */}
          <div className="box p-3">
            <div className="grid grid-cols-12">
              <div class=" col-span-12 lg:col-span-12 mt-3">
                <h2 className="text-lg font-medium mr-auto">
                  Edit Data Transaksi
                </h2>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="category" class="form-label">
                    Nasabah
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <Select
                    id="userId"
                    value={
                      customerOption.find(
                        (option) => option.value === form.userId
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      setForm((prev) => ({
                        ...prev,
                        userId: selectedOption.value,
                      }))
                    }
                    options={customerOption}
                    isSearchable // Aktifkan fitur pencarian
                    placeholder="Pilih nasabah..." // Placeholder saat input kosong
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="category" class="form-label">
                    Jenis Sampah
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <Select
                    id="trashId"
                    value={
                      categoryOption.find(
                        (option) => option.value === form.trashId
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      setForm((prev) => ({
                        ...prev,
                        trashId: selectedOption.value,
                      }))
                    }
                    options={categoryOption}
                    isSearchable // Aktifkan fitur pencarian
                    placeholder="Pilih kategori..." // Placeholder saat input kosong
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="qty" class="form-label">
                    Jumlah Sampah (kg)
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <input
                    id="qty"
                    type="text"
                    class="form-control"
                    value={form.qty ? form.qty : ""}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-12 d-flex justify-content-center mr-2 mt-2">
                <button
                  onClick={handleUpdateTransaction.mutate}
                  className="btn btn-primary"
                >
                  {" "}
                  <i className="fa fa-save w-4 h-4 mr-2"> </i> Simpan Data
                  Transaksi{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTransaction;
