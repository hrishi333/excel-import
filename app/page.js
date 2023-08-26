"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { ExcelRenderer } from "react-excel-renderer";

export default function Home() {
  const [data, setData] = useState();
  const [header, setHeader] = useState();
  const [cols, setCols] = useState();

  const handleImport = () => {
    ExcelRenderer(data, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response.rows);
        setHeader(response.rows[0]);
        setCols(response.rows);
      }
    });
  };

  return (
    <>
      <div className="bg-[rgb(46,42,42)] h-screen text-white">
        <p className="p-2">Import Your Excel file</p>
        <input
          onChange={(e) => {
            setData(e.target.files[0]);
          }}
          accept=".xlsx,.xls"
          className="p-2 m-2 border rounded-md"
          type="file"
        />
        <button
          className="p-2 bg-blue-700 rounded-md ml-1"
          onClick={handleImport}
        >
          submit
        </button>

        <div>
          <table style={{ margin: "10px" }} className="table">
            <thead className="m-4">
              <tr>
                {header &&
                  header.map((value, index) => (
                    <th className="border p-2 bg-green-900 " key={index}>
                      {value}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="m-2">
              {cols &&
                cols.slice(1).map((col, index) => (
                  <tr key={index}>
                    {col.map((row, index) => (
                      <td className="border p-2 bg-gray-900" key={index}>
                        {row}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>


    </>
  );
}
