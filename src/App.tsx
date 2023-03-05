import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import FinancialApi from "./api/financial-api";
// import Notification from "./Notification";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [state, setState] = useState<any>({ ignore: true, title: "asasa" });
  const [total, setTotal] = useState(0);
  const [array, setArray] = useState<any[]>([]);
  const [arrayNotify, setArrayNotify] = useState<any[]>([]);
  const [data, setData] = useState<any>();

  const getData = () => {
    FinancialApi.getPlan().then((response) => {
      console.log(response.data.financeiro);
      setArray(response.data.financeiro);
    });
    FinancialApi.notify().then((response) => {
      setArrayNotify(response.data.notify);
      if (response.data.notify.length > 0) {
        console.log(response.data.notify);
        arrayNotify.map((item) => notifyMe(item.notify));
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTotal(
      array.reduce((total, num) => {
        return (
          total +
          num["04/23"] +
          num["05/23"] +
          num["06/23"] +
          num["07/23"] +
          num["08/23"] +
          num["09/23"] +
          num["10/23"] +
          num["11/23"] +
          num["12/23"]
        );
      }, 0)
    );

    const labels = [
      "March",
      "April",
      "May",
      "June",
      "July",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    setData({
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: [
            array.reduce((total, num) => {
              return total + num["03/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["04/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["05/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["06/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["07/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["08/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["09/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["10/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["11/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["12/23"];
            }, 0),
          ],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: [
            0,
            array.reduce((total, num) => {
              return total + num["04/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["04/23"] + num["05/23"];
            }, 0),
            array.reduce((total, num) => {
              return total + num["04/23"] + num["05/23"] + num["06/23"];
            }, 0),
            array.reduce((total, num) => {
              return (
                total +
                num["04/23"] +
                num["05/23"] +
                num["06/23"] +
                num["07/23"]
              );
            }, 0),
            array.reduce((total, num) => {
              return (
                total +
                num["04/23"] +
                num["05/23"] +
                num["06/23"] +
                num["07/23"] +
                num["08/23"]
              );
            }, 0),
            array.reduce((total, num) => {
              return (
                total +
                num["04/23"] +
                num["05/23"] +
                num["06/23"] +
                num["07/23"] +
                num["08/23"] +
                num["09/23"]
              );
            }, 0),
            array.reduce((total, num) => {
              return (
                total +
                num["04/23"] +
                num["05/23"] +
                num["06/23"] +
                num["07/23"] +
                num["08/23"] +
                num["09/23"] +
                num["10/23"]
              );
            }, 0),
            array.reduce((total, num) => {
              return (
                total +
                num["04/23"] +
                num["05/23"] +
                num["06/23"] +
                num["07/23"] +
                num["08/23"] +
                num["09/23"] +
                num["10/23"] +
                num["11/23"]
              );
            }, 0),
            array.reduce((total, num) => {
              return (
                total +
                num["04/23"] +
                num["05/23"] +
                num["06/23"] +
                num["07/23"] +
                num["08/23"] +
                num["09/23"] +
                num["10/23"] +
                num["11/23"] +
                num["12/23"]
              );
            }, 0),
          ],
          backgroundColor: "rgb(53, 162, 235)",
        },
      ],
    });
  }, [array, arrayNotify]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  function notifyMe(item: string) {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (window.Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification(item);
      // …
    } else if (window.Notification.permission !== "denied") {
      // We need to ask the user for permission
      window.Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification(item);
          // …
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        No final do ano voce terá:
        <h1>{total}</h1>
        <div style={{ minHeight: "600px", minWidth: "600px" }}>
          {data && <Bar options={options} data={data} />}
        </div>
      </header>
    </div>
  );
}

export default App;
