import { useState } from "react";
import { CellAction, CellActions, Input } from "../styles";
import { DaysData } from "./Calendar";
import SEARCH_ICON from "../svg/search";

const CellActionButtons = ({
  handleOpenPopup,
  day,
  searchText,
  handleSearch,
}: {
  handleOpenPopup: Function;
  day: DaysData;
  searchText: string;
  handleSearch: Function;
}) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <CellActions
      onMouseLeave={() => {
        setShowInput(false);
        handleSearch("");
      }}
    >
      {showInput && (
        <Input
          value={searchText}
          onChange={(event) => handleSearch(event.target.value)}
          height="15px"
          width="70px"
          type="text"
          autoFocus
        />
      )}
      <CellAction onClick={() => setShowInput(true)}>
        <SEARCH_ICON />
      </CellAction>
      <CellAction onClick={() => handleOpenPopup(day.date)}>+</CellAction>
    </CellActions>
  );
};
export default CellActionButtons;
