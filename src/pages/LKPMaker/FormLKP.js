import DatePickerInput from "@/components/DatePickerInput";
import Input from "@/components/Input";
import UploadImage from "@/components/UploadImage";
import React, { useContext } from "react";
import { InvoiceContext } from "@/contexts/InvoiceContext";
import moment from "moment";
import { Eye, EyeClosed, Trash } from "lucide-react";
import InputTextArea from "@/components/InputTextArea";
export const FormLKP = () => {
  const {
    toggle,
    toggleInvoice,
    invoiceData,
    updateInvoiceField,
    addInvoiceItem,
    handleImageChange,
    updateInvoiceItemField,
    deleteInvoiceItem,
  } = useContext(InvoiceContext);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <span className="text-xl">
          <b>Form Invoice</b>
        </span>
        <span className="cursor-pointer" onClick={toggleInvoice}>
          {toggle ? <Eye /> : <EyeClosed />}
        </span>
      </div>
      <Input
        label="Kepada"
        name="kepada"
        value={invoiceData?.client}
        onChange={(e) => updateInvoiceField("client", e.target.value)}
      />
      <div className="flex gap-4 w-full">
        <Input
          className="w-full"
          label="No. Invoice"
          type="number"
          name="noInvoice"
          prefix="INV - "
          value={invoiceData?.number}
          onChange={(e) => updateInvoiceField("number", e.target.value)}
        />
        <DatePickerInput
          label="Tanggal"
          selected={invoiceData?.date}
          onChange={(date) => updateInvoiceField("date", date)}
          maxDate={moment()}
        />
      </div>
      <Input
        label="DP"
        name="downPayment"
        type="number"
        value={invoiceData?.downPayment}
        onChange={(e) => updateInvoiceField("downPayment", e.target.value)}
      />
      {invoiceData?.items.map((item, index) => (
        <div className="flex gap-4 w-full max-w-screen-md">
          <InputTextArea
            className={`w-full ${toggle ? "max-w-[190px]" : "max-w-[900px]"}`}
            label="Deskripsi"
            name="description"
            type="text"
            value={item?.description}
            onChange={(e) =>
              updateInvoiceItemField(index, "description", e.target.value)
            }
          />
          <Input
            className={`w-full ${toggle ? "max-w-[90px]" : "max-w-[900px]"}`}
            label="Size"
            name="size"
            type="text"
            value={item?.size}
            onChange={(e) =>
              updateInvoiceItemField(index, "size", e.target.value)
            }
          />
          <Input
            className={`w-full ${toggle ? "max-w-[90px]" : "max-w-[900px]"}`}
            label="QTY"
            name="qty"
            type="number"
            value={item?.qty}
            onChange={(e) =>
              updateInvoiceItemField(index, "qty", e.target.value)
            }
          />
          <Input
            className={`w-full ${toggle ? "max-w-[130px]" : "max-w-[900px]"}`}
            label="Harga"
            name="price"
            type="number"
            value={item?.price}
            onChange={(e) =>
              updateInvoiceItemField(index, "price", e.target.value)
            }
          />
          {index !== 0 && (
            <div
              className="cursor-pointer content-center px-1 py-3 hover:text-red-800 hover:bg-red-200 active:text-red-900 active:bg-red-300"
              onClick={() => deleteInvoiceItem(index)}
            >
              <Trash className=" text-red-600 w-6 h-6 " />
            </div>
          )}
        </div>
      ))}
      <div>
        <span
          className="cursor-pointer text-blue-400 hover:text-blue-500 active:text-blue-700"
          onClick={addInvoiceItem}
        >
          + Tambah kolom
        </span>
      </div>
      <UploadImage
        name="fotoProduk"
        label="Foto Produk"
        onChange={handleImageChange}
      />
    </div>
  );
};
