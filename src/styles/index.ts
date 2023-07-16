import styled from "styled-components";

export const Input = styled.input<{ type: string }>`
  background-image: ${(props) =>
    props.type === "text" ? "linear-gradient(#20aee3, #20aee3), linear-gradient(#bfbfbf, #bfbfbf);" : "0"};
  border: 0 none;
  border-radius: 0;
  box-shadow: none;
  float: none;
  background-color: transparent;
  background-position: center bottom, center calc(100% - 1px);
  background-repeat: no-repeat;
  background-size: 0 2px, 100% 1px;
  padding: 0;
  transition: background 0s ease-out 0s;
  color: #bfbfbf;
  min-height: 35px;
  display: initial;
  width: ${(props) => (props.type === "text" ? "100%" : "30%")};
  outline: none;
  font-size: 15px;
  &:focus {
    background-size: 100% 2px, 100% 1px;
    outline: 0 none;
    transition-duration: 0.3s;
    color: #525252;
  }
`;

export const CalendarContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0 auto;
  width: 100%;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  background: ${(props) => (props.$primary ? "#BF4F74" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#BF4F74")};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  cursor: pointer;
`;

export const CloseButton = styled.button<{ $primary?: boolean }>`
  background: white;
  font-size: 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  min-width: 400px;
  gap: 30px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
`;

export const CalendarDate = styled.div`
  display: flex;
  gap: 5px;
`;

export const TaskColor = styled.div<{ color: string }>`
  width: 30%;
  height: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

export const CalendarDataCount = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #fff;
`;

export const AddLabel = styled.div`
  opacity: 0;
  background-color: #222;
  color: white;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #ffa500;
    color: #222;
  }
`;

export const Task = styled.div<{ $disabled?: boolean }>`
  background-color: #fff;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  cursor: ${(props) => (props.$disabled ? "default" : "grab")};

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const CalendarDateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
`;

export const CalendarDay = styled.div<{ isCurrentMonth: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 160px;
  padding: 0 5px 5px;
  background-color: ${({ isCurrentMonth }) => (isCurrentMonth ? "#EFEFFF" : "#ccc")};
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? "#000" : "#777")};
  &:hover ${AddLabel} {
    opacity: 1;
  }
  & .droppable {
    background-color: #d6d6ff;
  }
`;

export const PopUp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;
  border-radius: 5px;
`;

export const PopUpContent = styled.div`
  background-color: #fff;
  padding: 30px 20px 20px;
  border-radius: 5px;
  position: relative;
`;
