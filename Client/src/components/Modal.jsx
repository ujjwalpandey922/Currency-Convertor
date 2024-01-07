/* eslint-disable react/prop-types */
import "./modal.css";
import searchIcon from "../assets/search.png";
import selectedIcon from "../assets/Selected.png";
import { useRef, useState } from "react";

// Model component
const Model = ({ type, setOpen, coinInfo, coinSelected, setCoinSelected }) => {
  // State for search input
  const [searchInfo, setSearchInfo] = useState("");

  // Refs for modal elements
  const outer = useRef(null);
  const inner = useRef(null);

  // Handle click on a coin or currency item
  const handleClick = (e) => {
    setCoinSelected(e);
    setOpen(false);
  };

  // Filter coin or currency items based on search input
  const filteredItems = coinInfo.filter((singleCoin) => {
    if (type === "coin") {
      return singleCoin?.name?.toLowerCase().includes(searchInfo.toLowerCase());
    } else {
      return singleCoin?.toLowerCase().includes(searchInfo.toLowerCase());
    }
  });

  // Close modal if clicked outside the inner modal content
  const handleCloseModal = (e) => {
    if (e.target === outer.current) {
      setOpen(false);
    }
  };

  return (
    <div className="container" ref={outer} onClick={(e) => handleCloseModal(e)}>
      <div className="wrapper" ref={inner}>
        <div className="close" onClick={() => setOpen(false)}>
          X
        </div>
        <div className="model-content">
          {/* Search input */}
          <div className="search">
            <img src={searchIcon} alt="search" />
            <input
              type="text"
              placeholder="Search chains"
              onChange={(e) => setSearchInfo(e.target.value)}
              value={searchInfo}
            />
          </div>
          {/* List of coins or currencies */}
          <div className="coins-list">
            {type === "coin" &&
              filteredItems?.map((singleCoin) => (
                <div
                  className="modal-info modal-info-extra selected-coin"
                  key={singleCoin.id}
                  onClick={() => handleClick(singleCoin)}
                >
                  <img src={singleCoin.image} alt="smaller-icon" />
                  <span>{singleCoin.name}</span>
                  {singleCoin.id === coinSelected.id && (
                    <img
                      src={selectedIcon}
                      alt="selected"
                      className="selected-mark"
                    />
                  )}
                </div>
              ))}
            {type === "curr" &&
              filteredItems?.map((singleCoin) => (
                <div
                  className="modal-info modal-info-extra selected-coin"
                  key={singleCoin}
                  onClick={() => handleClick(singleCoin)}
                >
                  <span>{singleCoin.toUpperCase()}</span>
                  {singleCoin === coinSelected && (
                    <img
                      src={selectedIcon}
                      alt="selected"
                      className="selected-mark"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Model component as the default export
export default Model;
