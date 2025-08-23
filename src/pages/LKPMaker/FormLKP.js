import Input from "@/components/Input";
import UploadImage from "@/components/UploadImage";
import React, { useContext } from "react";
import moment from "moment";
import { Eye, EyeClosed, Trash } from "lucide-react";
import InputTextArea from "@/components/InputTextArea";
import { LKPContext } from "@/contexts/LKPContext";
export const FormLKP = () => {
  const {
    toggle,
    toggleLKP,
    invoiceData,
    updateLKPField,
    addLKPItem,
    handleImageChange,
    updateLKPItemField,
    deleteLKPItem,
  } = useContext(LKPContext);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <span className="text-xl">
          <b>Form Lembar Kerja Produksi</b>
        </span>
        <span className="cursor-pointer" onClick={toggleLKP}>
          {toggle ? <Eye /> : <EyeClosed />}
        </span>
      </div>
      <Input
        label="Nama Order"
        name="orderName"
        value={invoiceData?.orderName}
        onChange={(e) => updateLKPField("orderName", e.target.value)}
      />
      <Input
        className="w-full"
        label="Bahan/Warna"
        name="material"
        value={invoiceData?.material}
        onChange={(e) => updateLKPField("material", e.target.value)}
      />

      {invoiceData?.items.map((item, index) => (
        <div className="flex gap-4 w-full max-w-screen-md">
          <InputTextArea
            className={`w-full`}
            label="Detail"
            name="detail"
            type="text"
            value={item}
            onChange={(e) => updateLKPItemField(index, e.target.value)}
          />

          {index !== 0 && (
            <div
              className="cursor-pointer content-center px-1 py-3 hover:text-red-800 hover:bg-red-200 active:text-red-900 active:bg-red-300"
              onClick={() => deleteLKPItem(index)}
            >
              <Trash className=" text-red-600 w-6 h-6 " />
            </div>
          )}
        </div>
      ))}
      <div>
        <span
          className="cursor-pointer text-blue-400 hover:text-blue-500 active:text-blue-700"
          onClick={addLKPItem}
        >
          + Tambah kolom
        </span>
      </div>
      <Input
        className="w-full"
        label="Jumlah"
        name="amount"
        value={invoiceData?.amount}
        onChange={(e) => updateLKPField("amount", e.target.value)}
      />
      <InputTextArea
        className={`w-full`}
        label="Detail/Ukuran"
        name="sizeDetails"
        type="text"
        value={invoiceData?.sizeDetails}
        onChange={(e) => updateLKPField("sizeDetails", e.target.value)}
      />
      <UploadImage
        maxImages={3}
        name="fotoProduk"
        label="Foto Produk"
        onChange={(img) => handleImageChange("Foto Produk", img)}
      />
      <UploadImage
        maxImages={1}
        name="labelSize"
        label="Size Chart"
        onChange={(img) => handleImageChange("Size Chart", img)}
      />
    </div>
  );
};
