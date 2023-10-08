import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Chip, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import { createTour, updatedTour } from "../redux/features/tourSlice";

const initialState = { title: "", description: "", tags: [] };

const AddEditTour = () => {
  const { error, loading, userTours } = useSelector((state) => state.tour);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tagErrMsg, setTagErrMsg] = useState(null);

  const [tourData, setTourData] = useState(initialState);
  const [inputValueTags, setInputValueTags] = useState("");
  const { title, description, tags } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const handleKeyDownTags = (e) => {
    if (e.key === "Enter") {
      handleAddTag(inputValueTags);
    }
  };
  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
    setInputValueTags("");
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags && !tags?.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updatedTour({ id, updatedTourData, toast, navigate }));
      }
      handleClear();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">{id ? "Update Tour" : "Add Tour"}</Typography>
      <Card
        sx={{
          maxWidth: "50vw",
          minWidth: "50vw",
          padding: 2,
          flexDirection: "column",
          display: "flex",
        }}
      >
        <TextField
          id="outlined-textarea"
          label={title ? null : "Title"}
          multiline
          name="title"
          value={title || ""}
          onChange={onInputChange}
        />
        <div style={{ height: 30 }} />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          label={description ? null : "Description"}
          multiline
          value={description}
          name="description"
          rows={4}
          onChange={onInputChange}
        />
        <div style={{ height: 30 }} />
        <TextField
          id="outlined-textarea"
          label="Enter Tags"
          value={inputValueTags}
          onKeyDown={handleKeyDownTags}
          onChange={(e) => setInputValueTags(e.target.value)}
        />
        {tourData?.tags && tourData.tags.length > 0 && (
          <div
            style={{
              marginTop: 1,
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              maxWidth: 500,
            }}
            spacing={1}
          >
            {tourData.tags?.map((item, index) => (
              <Chip
                label={item}
                sx={{ margin: 1 }}
                key={index}
                onDelete={() => handleDeleteTag(item)}
              />
            ))}
          </div>
        )}
        {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
        <div style={{ height: 30 }} />

        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setTourData({ ...tourData, imageFile: base64 })
          }
        />
        <div style={{ height: 15 }} />
        <Button onClick={handleSubmit} variant="contained">
          {id ? "Submit" : "Add"}
        </Button>
        <div style={{ height: 15 }} />
        <Button onClick={handleClear} color="error" variant="contained">
          Clear
        </Button>
      </Card>
    </div>
  );
};

export default AddEditTour;
