import "./home.css";
import { toast } from "react-toastify";
import blackCircle from "../assets/blackCircle.png";
import Union from "../assets/Union.png";
import down from "../assets/down.png";
import Modal from "../components/Modal";
import { useState } from "react";
import { useEffect } from "react";

// Home component
const Home = () => {
  // State variables
  const [open, setOpen] = useState(false);
  const [openCurr, setOpenCurr] = useState(false);
  const [amount, setAmount] = useState("");
  const [coinInfo, setCoinInfo] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [currencySelected, setCurrencySelected] = useState();
  const [coinSelected, setCoinSelected] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://currency-convertor-backend.vercel.app/crypto`
        );
        const { topCryptos, supportedCurrencies } = await res.json();

        setCoinInfo(topCryptos);
        setCoinSelected(topCryptos[0]);
        setCurrencyList(supportedCurrencies);
        setCurrencySelected(supportedCurrencies.find((curr) => curr === "usd"));
      } catch (error) {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
      }
    };
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  // Handle result calculation
  const handleResult = async () => {
    // Validation checks
    if (amount === "") {
      toast.error("Enter Any Amount.... ", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
      return;
    }
    if (isNaN(amount)) {
      toast.error("Amount has to be a Number ", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
      return;
    }

    // Fetch conversion result
    try {
      const res = await fetch(
        `https://currency-convertor-backend.vercel.app/convert?sourceCrypto=${coinSelected.name}&amount=${amount}&targetCurrency=${currencySelected}`
      );
      const data = await res.json();
      setConvertedAmount(data.convertedAmount.toLocaleString());
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
    }
  };

  // JSX rendering
  return (
    <div className="Container">
      {/* Card component */}
      <div className="card">
        <div className="head">
          <img src={blackCircle} alt="head" className="blackCircle" />
          <img
            src={coinSelected?.image}
            alt="Bitcoin"
            className="bitcoinIcon"
          />
        </div>
        <div className="body">
          <img src={Union} alt="body" className="curve" />
          <div className="details">
            {/* Display conversion result */}
            {convertedAmount && (
              <span className="result">
                <b>{convertedAmount}</b> {currencySelected.toUpperCase()}
              </span>
            )}
            {convertedAmount === undefined && (
              <span className="result">
                <b>DZap</b> Currency Converter
              </span>
            )}

            {/* Coin selection */}
            <p>Coin </p>
            <div className="modal-input" onClick={() => setOpen(true)}>
              <div className="modal-info">
                <img src={coinSelected?.image} alt="smaller-icon" />
                <span>{coinSelected?.name}</span>
              </div>
              <img src={down} alt="down" />
            </div>

            {/* Amount input */}
            <p>Amount </p>
            <div className="amount-input">
              <input
                type="text"
                placeholder="0.00"
                onChange={handleChange}
                value={amount}
              />
              <span>{currencySelected?.toUpperCase()}</span>
            </div>

            {/* Currency selection */}
            <p>Currency </p>
            <div className="modal-input" onClick={() => setOpenCurr(true)}>
              <div className="modal-info">
                <span>{currencySelected?.toUpperCase()}</span>
              </div>
              <img src={down} alt="down" />
            </div>

            {/* Button to calculate result */}
            <button className="convert" onClick={handleResult}>
              Convert
            </button>
          </div>
        </div>
      </div>

      {/* Coin modal */}
      {open && (
        <Modal
          type={"coin"}
          setOpen={setOpen}
          coinInfo={coinInfo}
          coinSelected={coinSelected}
          setCoinSelected={setCoinSelected}
        />
      )}

      {/* Currency modal */}
      {openCurr && (
        <Modal
          type={"curr"}
          setOpen={setOpenCurr}
          coinInfo={currencyList}
          coinSelected={currencySelected}
          setCoinSelected={setCurrencySelected}
        />
      )}
    </div>
  );
};

export default Home;
