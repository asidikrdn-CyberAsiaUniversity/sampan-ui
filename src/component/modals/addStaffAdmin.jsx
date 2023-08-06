import React, { useState } from "react";
import { useMutation } from "react-query";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { API } from "../../config/api";

function CreateAdmin({ isOpen, setIsOpen, refetchAdmin }) {
  const [form, setForm] = useState({});

  // add Admin to server
  const handleAddAdmin = useMutation(async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/staff", {
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        address: form.address,
        roleId: 2,
        password: form.password,
      });

      if (response.data.status === 201) {
        // close modal
        refetchAdmin();
        handleClose();
        Swal.fire({
          icon: "success",
          text: `Berhasil menambahkan Staff Admin`,
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
      e.target.id === "phone" &&
      e.target.value !== "" &&
      !regex.test(e.target.value)
    ) {
      return Swal.fire({
        icon: "error",
        text: "No. Hp harus berupa angka !",
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
      {handleAddAdmin.isLoading && <BeatLoader color="#36d7b7" />}
      <div style={modalStyle}>
        <div style={contentStyle}>
          <button style={closeStyle} onClick={handleClose}>
            X
          </button>
          {/* Form Tambah Admin */}

          <div className="box p-3">
            <div className="grid grid-cols-12">
              <div class=" col-span-12 lg:col-span-12 mt-3">
                <h2 className="text-lg font-medium mr-auto">
                  Tambah Data Staff Admin
                </h2>
              </div>
              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="fullname" class="form-label">
                    Nama Lengkap
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    class="form-control"
                    value={form.fullname ? form.fullname : ""}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="email" class="form-label">
                    Email
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    class="form-control"
                    value={form.email ? form.email : ""}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="password" class="form-label">
                    Password
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    class="form-control"
                    value={form.password ? form.password : ""}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="phone" class="form-label">
                    No. HP
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <input
                    id="phone"
                    type="text"
                    class="form-control"
                    value={form.phone ? form.phone : ""}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12 col-lg-4">
                  <label for="address" class="form-label">
                    Alamat
                  </label>
                </div>
                <div className="col-12 col-lg-8">
                  <textarea
                    className="form-control"
                    id="address"
                    value={form.address ? form.address : ""}
                    onChange={handleChangeForm}
                  ></textarea>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-12 d-flex justify-content-center mr-2 mt-2">
                <button
                  onClick={handleAddAdmin.mutate}
                  className="btn btn-primary"
                >
                  {" "}
                  <i className="fa fa-save w-4 h-4 mr-2"> </i> Tambah Staff
                  Admin{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAdmin;
