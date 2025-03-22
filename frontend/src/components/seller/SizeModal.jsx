import React, { useContext, useRef, useState } from "react";
import MultiSelectBox from "./MultiSelectBox";
import { toast } from "react-toastify";
import { Axios_Node } from "../../Axios";
import { AuthContext } from "../../../authContext/auth";
const SizeModal = ({ id, size, onClose }) => {
  const { user, cartSize, setCartSize } = useContext(AuthContext);
  const modelRef = useRef();
  const closeModal = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };
  const sizeOptions = size.map((item) => ({
    value: item.size,
    label: item.size,
  }));
  const [sizeSelected, setSizeSelected] = useState("");
  const requestData = async () => {
    try {
      if (sizeSelected === "") {
        toast.error("Please select a valid size");
        return;
      }
      const token = localStorage.getItem("token");
      const response = await Axios_Node.post(
        "/cart/add",
        {
          productId: id,
          quantity: 1,
          size: Number(sizeSelected.value),
        },
        {
          params: {
            email: JSON.parse(localStorage.getItem("user")).email,
          },
        }
      );
      toast.success(response?.data?.message);
      setCartSize(cartSize + 1);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      ref={modelRef}
      onClick={closeModal}
      style={{
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(1.5px)",
        boxShadow: "20px 20px 30px rgba(0, 0, 0, 0.06)",
      }}
      className="modal"
    >
      <div className="modal-container">
        <div className="modal-div">
          <h4>Choose Your Perfect Fit Size:</h4>
        </div>
        <div className="modal-div">
          <div className="select-main-box">
            <MultiSelectBox
              multiple={false}
              options={sizeOptions}
              value={sizeSelected}
              onChange={(e) => setSizeSelected(e)}
            />
          </div>
        </div>
        <div className="modal-div">
          <div className="filter-modal-btn">
            <button
              className="btn-filter "
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              className="btn-filter"
              onClick={() => {
                requestData();
                onClose();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeModal;
