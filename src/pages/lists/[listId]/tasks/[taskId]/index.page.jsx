import { useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BackButton } from "~/components/BackButton";
import "./index.css";
import { setCurrentList } from "~/store/list";
import { fetchTasks, updateTask, deleteTask } from "~/store/task";
import { useId } from "~/hooks/useId";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";

const EditTask = () => {
  const id = useId();

  const { listId, taskId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [done, setDone] = useState(false);
  const [limit, setLimit] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector((state) =>
    state.task.tasks?.find((task) => task.id === taskId),
  );

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDetail(task.detail);
      setDone(task.done);
      if (task.limit) {

        const date = new Date(task.limit);
        const pad = (value) => String(value).padStart(2, "0")

        setLimit(
          `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
          `T${pad(date.getHours())}:${pad(date.getMinutes())}`,
        );
      } else {
        setLimit("");
      }
    }
  }, [task]);

  useEffect(() => {
    void dispatch(setCurrentList(listId));
    void dispatch(fetchTasks());
  }, [listId]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      const formattedLimit = limit
        ? new Date(limit).toISOString().replace(".000Z", "Z")
        : null;

      void dispatch(updateTask({ id: taskId, title, detail, done, limit: formattedLimit }))
        .unwrap()
        .then(() => {
          history.push(`/lists/${listId}`);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, taskId, listId, detail, done, limit],
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()
      .then(() => {
        history.push(`/`);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [taskId]);

  return (
    <main className="edit_list">
      <BackButton />
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Title
          </label>
          <Input
            id={`${id}-title`}
            placeholder="Buy some milk"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-detail`} className="edit_list__form_label">
            Description
          </label>
          <textarea
            id={`${id}-detail`}
            className="app_input"
            placeholder="Blah blah blah"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-done`} className="edit_list__form_label">
            Is Done
          </label>
          <div>
            <Input
              id={`${id}-done`}
              type="checkbox"
              checked={done}
              onChange={(event) => setDone(event.target.checked)}
            />
          </div>
        </fieldset>

        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-limit`} className="edit_list__form_label">
            Date
          </label>

          <div>
            <Input
              type="datetime-local"
              id={`${id}-limit`}
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
            />
          </div>
        </fieldset>
        <div className="edit_list__form_actions">
          <Link to="/" data-variant="secondary" className="app_button">
            Cancel
          </Link>
          <div className="edit_list__form_actions_spacer"></div>
          <Button
            type="button"
            label="Delete"
            className="app_button edit_list__form_actions_delete"
            disabled={isSubmitting}
            onClick={handleDelete}
          />
          <Button
            type="submit"
            label="Update"
            className="app_button"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </main>
  );
};

export default EditTask;
