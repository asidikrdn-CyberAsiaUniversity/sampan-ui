import { useState } from "react";
import { VictoryPie, VictoryTooltip } from "victory";
import { useQuery } from "react-query";
import { API } from "../config/api";
import moment from "moment";
import "moment/locale/id";
import { BeatLoader } from "react-spinners";
moment.locale("id");

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  useQuery(
    ["dashboardSummaryCache", API.defaults.headers.common["Authorization"]],
    async () => {
      try {
        const response = await API.get(`/dashboard`);

        let data = [];

        console.log(response.data.data);

        response.data.data.forEach((el, i) => {
          if (i <= 7) {
            data.push({ label: el.trashCategory, y: el.transactionCount });
          }
        });

        console.log(data);
        setChartData(data);
      } catch (e) {
        console.log(e);
      }
    }
  );

  const {
    data: transaksi,
    isLoading: transaksiIsLoading,
    // refetch: refetchTransaksi,
  } = useQuery(
    ["transaksionDashboardCache", API.defaults.headers.common["Authorization"]],
    async () => {
      try {
        const response = await API.get(`/trash/transactions?page=1&limit=5`);

        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  const yellow200 = "#FFF59D";
  const deepOrange600 = "#F4511E";
  const lime300 = "#DCE775";
  const lightGreen500 = "#8BC34A";
  const teal700 = "#00796B";
  const cyan900 = "#006064";
  const colors = [
    deepOrange600,
    yellow200,
    lime300,
    lightGreen500,
    teal700,
    cyan900,
  ];

  return (
    <>
      <div class="container-fluid p-5 w-100">
        <div className="row p-3">
          <div className="col-5">
            <VictoryPie
              labelComponent={<VictoryTooltip />}
              data={
                chartData?.length < 1 || !chartData
                  ? [{ label: "Belum Ada Transaksi", y: 1 }]
                  : chartData
              }
              colorScale={colors}
              style={{
                data: {
                  stroke: "blueGrey50",
                  strokeWidth: 1,
                },
              }}
            />
          </div>
          <div className="col-7 d-flex align-items-center justify-content-center">
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" align="center" className="text-center">
                      Jenis Sampah
                    </th>
                    <th scope="col" align="center" className="text-center">
                      Total Transaksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chartData?.length < 1 || !chartData ? (
                    <tr>
                      <td colSpan={2}>
                        <h5 className="text-center text-secondary w-100">
                          Belum Ada Transaksi
                        </h5>
                      </td>
                    </tr>
                  ) : (
                    chartData?.map((el) => {
                      return (
                        <tr>
                          <td align="center" className="text-center">
                            {el.label}
                          </td>
                          <td align="center" className="text-center">
                            {el.y}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Transaksi Teratas */}
      <div class="container-fluid px-4">
        <h1 class="mt-4">Transaksi Terbaru</h1>
        {transaksiIsLoading ? (
          <BeatLoader color="#36d7b7" />
        ) : transaksi?.length < 1 || !transaksi ? (
          <h5 className="text-center text-secondary">Belum Ada Transaksi</h5>
        ) : (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Nasabah</th>
                <th scope="col">Jenis Sampah</th>
                <th scope="col">Qty</th>
                <th scope="col">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {transaksi?.map((el, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>
                      {moment(el.transactionTime).format(
                        "dddd, D MMMM YYYY HH:mm"
                      )}
                    </td>
                    <td>{el.customer.fullname}</td>
                    <td>{el.trash.category}</td>
                    <td>{el.qty} kg</td>
                    <td>Rp {el.totalPrice.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Dashboard;
