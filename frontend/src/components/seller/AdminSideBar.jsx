import React from "react";
import logo from "../../images/logo-icon.png";
import SideItems from "./SideItems";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaClipboardList } from "react-icons/fa";
import {
  MdWindow,
  MdOutlineLogout,
  MdMenuOpen,
  MdCategory,
} from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

const AdminSideBar = ({ toggleOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="sideBarLogoMain">
        <div className="sideBarLogo">
          <img src={logo} alt="logo" />
          <div>
            <div className="sideBrandName">GREEN FARM LINE</div>
            <Link
              to="/"
              className="sideBrandLink text-sm underline text-[#ccc] hover:text-white"
            >
              Visit store
            </Link>
          </div>
        </div>
        <div onClick={() => toggleOpen()} className="sidebarCloseBtn">
          <MdMenuOpen size={28} />
        </div>
      </div>
      <ul className="sideItemList p-2 list-none flex-1">
        <SideItems iconName={<FaHome size={20} />} text="Home" to="/seller" />
        <SideItems
          iconName={<FaUser size={17} />}
          text="Customers"
          to="/seller/customers"
        />
        <SideItems
          iconName={<MdWindow size={20} />}
          text="Products"
          to="/seller/products"
        />
        <SideItems
          iconName={<FaClipboardList size={18} />}
          text="Orders"
          to="/seller/orders"
        />
        <SideItems
          iconName={<BiSolidDiscount size={20} />}
          text="Coupons"
          to="/seller/coupons"
        />
        <SideItems
          iconName={<TbBrandBooking size={22} />}
          text="Brands"
          to="/seller/brands"
        />
        <SideItems
          iconName={<MdCategory size={20} />}
          text="Category"
          to="/seller/category"
        />
        <li
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="sideItemLink hover:cursor-pointer hover:bg-[#ffffff0d] flex items-center gap-3 px-4 py-2 rounded-md mb-1 text-[14px]"
        >
          <div className="sideItemIcon">
            <MdOutlineLogout size={20} />
          </div>
          <div className="sideItemName">Logout</div>
        </li>
      </ul>
    </>
  );
};

export default AdminSideBar;
