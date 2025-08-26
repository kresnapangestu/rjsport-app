import Table from "@/components/Table";
import { TableBody } from "@/components/TableBody";
import TableCell from "@/components/TableCell";
import TableRow from "@/components/TableRow";
import React, { forwardRef, useContext } from "react";
import { LKPContext } from "@/contexts/LKPContext";

const PDFContent = forwardRef((props, ref) => {
  const { invoiceData } = useContext(LKPContext);
  return (
    <div
      ref={ref}
      className="flex flex-col gap-5 border bg-white rouded h-full text-lg font-semibold"
      style={{
        height: "1500px",
      }}
    >
      <img alt="header invoice" src="/LKPHeader.webp" />
      <div className="px-10 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-[#2AC6EE] font-bold">
              Nama Orderan :
              <span className=" text-black font-semibold ml-2">
                {invoiceData?.orderName}
              </span>
            </span>
          </div>
          <Table
            sx={{ minWidth: 650 }}
            className="mt-6"
            aria-label="simple table"
          >
            <TableBody className="text-lg font-semibold">
              <TableRow
                className={"bg-blue-500 text-white"}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell
                  colSpan={2}
                  className="!text-white flex justify-between"
                >
                  <span> Bahan/Warna : </span>{" "}
                  <span className="!text-white !font-bold">
                    {invoiceData?.material}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow
                className={"bg-[#DBE9F8]"}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell colSpan={2}>Detail :</TableCell>
              </TableRow>
              {invoiceData?.items.map((row, index) => (
                <TableRow
                  key={index}
                  className={index % 2 ? "bg-[#DBE9F8]" : "bg-white"}
                  sx={{
                    "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                  }}
                >
                  <TableCell colSpan={2}>
                    {index + 1}. {row}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                className={"bg-[#008CCC]"}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell
                  colSpan={2}
                  className="!text-white flex justify-between"
                >
                  <span> Jumlah </span>{" "}
                  <span className="!text-white !font-bold">
                    {invoiceData?.amount}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow
                colSpan={2}
                className={"bg-[#FFFFFF]"}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell rowSpan={2} className="flex justify-between">
                  <span> Detail Ukuran </span>{" "}
                  <span className="!font-bold">{invoiceData?.sizeDetails}</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell rowSpan={2} className="flex justify-evenly">
                  {invoiceData?.image.length > 0 &&
                    invoiceData?.image.map((image, index) => (
                      <img
                        src={URL.createObjectURL(image)}
                        key={index}
                        className="h-56 object-cover rounded border mb-2"
                        alt="invoice pictures"
                      />
                    ))}
                </TableCell>
              </TableRow>
              {invoiceData?.sizeChart.length > 0 && (
                <TableRow>
                  <TableCell rowSpan={2} className="place-items-center">
                    <img
                      src={URL.createObjectURL(invoiceData?.sizeChart?.[0])}
                      className="w-56 object-cover rounded border mb-2"
                      alt="invoice pictures"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
});

export default PDFContent;
