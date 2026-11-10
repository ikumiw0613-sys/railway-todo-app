import { useState, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PencilIcon } from "~/icons/PencilIcon";
import { CheckIcon } from "~/icons/CheckIcon";
import { updateTask } from "~/store/task";
import "./TaskItem.css";
import { Button } from "./Button";

const formatLimit = (limit) => {
  if (!limit) return "";

  return new Date(limit).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
};

const calculateLimit = (limit) => {
  if(!limit) {
    return "";
  }
  const minutesLeft = Math.ceil(
    (new Date(limit).getTime() - Date.now()) / 60000,
  );
  if (minutesLeft <= 0) return "期限切れ";

  const days = Math.floor(minutesLeft / 1440);
  if(days > 0) {
    return `あと${days ? `${days}日` : ""}`;
  }
  const hours = Math.floor((minutesLeft % 1440) / 60);
  const minutes = minutesLeft % 60;

  return `あと${hours ? `${hours}時間` : ""}${minutes ? `${minutes}分` : ""}`;
}

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const today = new Date();
  const formattedToday = today.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .split("/")
    .join("-");
  const { listId } = useParams();
  const { id, title, detail, limit, done } = task;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done]);


  const formattedLimit = useMemo(() => formatLimit(limit), [limit]);

  const LimitDate = useMemo(() => calculateLimit( limit), [limit]);
  console.log(LimitDate);

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <Button
          type="button"
          onClick={handleToggle}
          disabled={isSubmitting}
          className="task__item__mark_button"
        >
          {done ? (
            <div className="task_item__mark____complete" aria-label="Completed">
              <CheckIcon className="task_item__mark____complete_check" />
            </div>
          ) : (
            <div
              className="task_item__mark____incomplete"
              aria-label="Incomplete"
            ></div>
          )}
        </Button>
        <div className="task_item__title" data-done={done}>
          {title}
        </div>

        <div className="task_item_limit">{formattedLimit}</div>

        <div aria-hidden className="task_item__title_spacer"></div>
        <Link
          to={`/lists/${listId}/tasks/${id}`}
          className="task_item__title_action"
        >
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className="task_item__detail">{detail}</div>
      <div className="task_item__limit">
        <> <span className="task_item__limit_date"> {LimitDate}</span></>

      </div>
    </div>
  );
};
