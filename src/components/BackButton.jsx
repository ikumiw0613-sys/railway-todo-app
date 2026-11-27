import { ChevronIcon } from "~/icons/ChevronIcon";
import "./BackButton.css";
import { Button } from "./Button";


export const BackButton = ({onClick}) => {

  const handleClick = onClick ?? (() => window.history.back())
  return (
    <Button type="button" onClick={handleClick} className="back_button">
      <ChevronIcon className="back_button__icon" />
      Back
    </Button>
  );
};
