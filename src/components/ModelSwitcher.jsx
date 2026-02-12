import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModel } from "../features/model/modelSlice";

const ModelSwitcher = () => {
  const dispatch = useDispatch();

  const { models, selectedModel } = useSelector(
    (state) => state.model
  );

  const handleChange = (e) => {
    dispatch(setModel(e.target.value));
  };

  return (
    <select
      value={selectedModel}
      onChange={handleChange}
      style={styles.select}
    >
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.label}
        </option>
      ))}
    </select>
  );
};

export default ModelSwitcher;

/* ===========================
   Styles
=========================== */

const styles = {
  select: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "13px",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
};
