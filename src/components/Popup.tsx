import { MutableRefObject } from "react";
import { Button, CloseButton, ColorPicker, Input, InputsList, PopUp, PopUpContent } from "../styles";
import { DaysData } from "./Calendar";
const { v4: uuidv4 } = require("uuid");

export const Popup = ({
  setControlledInputs,
  controlledInputs,
  controlledColorInputRef,
  setShowPopUp,
  setEditingTask,
  editingTask,
  daysData,
  showPopUp,
  selectedDay,
  setDaysData,
}: {
  setControlledInputs: Function;
  controlledInputs: string[];
  controlledColorInputRef: MutableRefObject<HTMLInputElement>;
  setShowPopUp: Function;
  setEditingTask: Function;
  editingTask: string;
  daysData: DaysData[];
  showPopUp: boolean;
  selectedDay: string;
  setDaysData: Function;
}) => {
  const handleAdd = () => {
    let newData;
    if (!editingTask) {
      newData = daysData.map((obj: DaysData) => {
        if (obj.date === selectedDay) {
          return {
            ...obj,
            data: [
              ...obj.data,
              {
                id: uuidv4(),
                label: controlledInputs,
                color: controlledColorInputRef.current.value,
              },
            ],
          };
        }
        return obj;
      });
    } else {
      newData = daysData.map((obj: DaysData) => {
        if (obj.date === selectedDay) {
          obj.data = obj.data.map((item: any) => {
            if (item.id === editingTask) {
              return {
                id: item.id,
                label: controlledInputs,
                color: controlledColorInputRef.current.value,
              };
            }
            return item;
          });
        }
        return obj;
      });
    }
    setControlledInputs([""]);
    setEditingTask("");
    setDaysData(newData);
    setShowPopUp(false);
  };
  if (!showPopUp) return null;
  return (
    <PopUp>
      <PopUpContent>
        <InputsList>
          {controlledInputs.map((input: string, index: number) => (
            <Input
              height="35px"
              width="400px"
              value={input}
              onChange={(event) =>
                setControlledInputs([
                  ...controlledInputs.slice(0, index),
                  (event.target as HTMLInputElement).value,
                  ...controlledInputs.slice(index + 1),
                ])
              }
              type="text"
              autoFocus
              placeholder="Label.."
            />
          ))}
        </InputsList>
        <Button onClick={() => setControlledInputs([...controlledInputs, ""])}>Add more label</Button>
        <ColorPicker>
          Selected color:
          <Input height="30px" width="100px" ref={controlledColorInputRef} type="color" />
        </ColorPicker>
        <Button $primary onClick={handleAdd}>
          {editingTask ? "Edit" : "Add"}
        </Button>
        <CloseButton
          onClick={() => {
            setShowPopUp(false);
            setEditingTask("");
            setControlledInputs([""]);
          }}
        >
          &#x2715;
        </CloseButton>
      </PopUpContent>
    </PopUp>
  );
};
export default Popup;
