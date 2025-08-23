import Button from "@/components/Button";
import Table from "@/components/Table";
import { TableBody } from "@/components/TableBody";
import TableCell from "@/components/TableCell";
import TableHeader from "@/components/TableHeader";
import TableRow from "@/components/TableRow";
import { InvoiceContext } from "@/contexts/InvoiceContext";
import moment from "moment";
import React, { forwardRef, useContext } from "react";
import { TableHeaders } from "./constants";
import { formatCurrencies } from "@/services/GeneralHelper";
import { sumPrice, sumQty } from "./menuHooks";

const PDFContent = forwardRef((props, ref) => {
  const { invoiceData } = useContext(InvoiceContext);
  return (
    <div
      ref={ref}
      className="flex flex-col gap-5 border bg-white rouded h-full"
      style={{
        height: "1000px",
      }}
    >
      <img alt="header invoice" src="/header.png" />
      <div className="px-10 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-[#2AC6EE] font-bold">
              Kepada<br></br>
              <span className=" text-black font-semibold">
                {invoiceData?.client}
              </span>
            </span>
            <div className="flex flex-col gap-1">
              <div className="text-right">
                <span className="text-[#2AC6EE] font-bold">
                  No. Invoice&nbsp;
                </span>
                <span className="font-semibold">INV-{invoiceData?.number}</span>
              </div>
              <div className="text-right">
                <span className="text-[#2AC6EE] font-bold">
                  Tanggal Pembuatan&nbsp;
                </span>
                <span className="font-semibold">
                  {invoiceData?.date
                    ? moment(invoiceData.date).format("DD/MM/YYYY")
                    : "-"}
                  {console.log(invoiceData, invoiceData?.date)}
                </span>
              </div>
            </div>
          </div>
          <Table
            sx={{ minWidth: 650 }}
            className="mt-16"
            aria-label="simple table"
          >
            <TableHeader>
              <TableRow>
                {TableHeaders.map((header) => (
                  <TableCell align="center">{header}</TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData?.items.map((row, index) => (
                <TableRow
                  key={index}
                  className={index % 2 ? "bg-[#DBE9F8]" : "bg-white"}
                  sx={{
                    "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                  }}
                >
                  <TableCell align="center">{row?.description}</TableCell>
                  <TableCell align="center">{row?.size}</TableCell>
                  <TableCell align="center">{row?.qty}</TableCell>
                  <TableCell align="center">
                    {formatCurrencies(row?.price)}
                  </TableCell>
                  <TableCell align="center">
                    {formatCurrencies(row?.price * row?.qty)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                className={"bg-[#008CCC]"}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell className="!text-white !font-bold" align="center">
                  Sub Total
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="!text-white !font-bold" align="center">
                  {sumQty(invoiceData?.items)}
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="!text-white !font-bold" align="center">
                  {formatCurrencies(sumPrice(invoiceData?.items))}
                </TableCell>
              </TableRow>
              <TableRow
                className={"bg-[#ffffff]"}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell className=" !font-bold" align="center">
                  DP
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="!font-bold" align="center">
                  {formatCurrencies(invoiceData?.downPayment)}
                </TableCell>
              </TableRow>
              <TableRow
                className={"bg-[#008CCC]"}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell className="!text-white !font-bold" align="center">
                  Sisa
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="!text-white !font-bold" align="center">
                  {formatCurrencies(
                    parseInt(sumPrice(invoiceData?.items)) -
                      parseInt(invoiceData?.downPayment)
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-between gap-10 mt-10">
            <span className="w-[200px] text-sm font-semibold">
              Cara Pembayaran
              <br /> Transfer Bank <br />
              💸 Mandiri : 1300010068289
              <br /> A/N Doni Santosa
            </span>
            <div className="flex justify-between gap-4">
              {invoiceData?.image.length > 0 &&
                invoiceData?.image.map((image, index) => (
                  <img
                    src={URL.createObjectURL(image)}
                    key={index}
                    className="w-56 object-cover rounded border mb-2"
                    alt="invoice pictures"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PDFContent;
