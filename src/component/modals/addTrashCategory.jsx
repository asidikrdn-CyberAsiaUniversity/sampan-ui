import React, { useState } from "react";
import { useMutation } from "react-query";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { API } from "../../config/api";

function CreateTrashCategory({ isOpen, setIsOpen, refetchKategoriSampah }) {
  const [form, setForm] = useState({});

  // add TrashCategory to server
  const handleAddTrashCategory = useMutation(async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/trash/categories", {
        category: form.category.toUpperCase(),
        price: parseInt(form.price),
      });

      if (response.data.status === 201) {
        // close modal
        refetchKategoriSampah();
        handleClose();
        Swal.fire({
          icon: "success",
          text: `Berhasil menambahkan kategori sampah`,
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
      e.target.id === "price" &&
      e.target.value !== "" &&
      !regex.test(e.target.value)
    ) {
      return Swal.fire({
        icon: "error",
        text: "Harga harus berupa angka !",
      });
    }

    setForm((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

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
      {handleAddTrashCategory.isLoading && <BeatLoader color="#36d7b7" />}
      <div style={modalStyle}>
        <div style={contentStyle}>
          <button style={closeStyle} onClick={handleClose}>
            X
          </button>
          {/* Form Tambah TrashCategory */}
          <div className="box p-3">
            <div className="grid grid-cols-12">
              <div class=" col-span-12 lg:col-span-12 mt-3">
                <h2 className="text-lg font-medium mr-auto">
                  Tambah Data Kategori Sampah
                </h2>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="category" class="form-label">
                    Kategori
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <input
                    id="category"
                    type="text"
                    name="category"
                    class="form-control"
                    value={form.category ? form.category : ""}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="price" class="form-label">
                    Harga
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <input
                    id="price"
                    type="text"
                    class="form-control"
                    value={form.price ? form.price : ""}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-12 d-flex justify-content-center mr-2 mt-2">
                <button
                  onClick={handleAddTrashCategory.mutate}
                  className="btn btn-primary"
                >
                  {" "}
                  <i className="fa fa-save w-4 h-4 mr-2"> </i> Tambah Data
                  Kategori Sampah{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrashCategory;
