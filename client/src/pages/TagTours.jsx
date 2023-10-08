import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getToursByTag } from "../redux/features/tourSlice";
import { Button, Card, Divider, Typography } from "@mui/material";
import Loader from "../components/Loader";

const TagTours = () => {
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10vh",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
        }}
        variant="h3"
        gutterBottom
      >
        Tours with tag: {tag}
      </Typography>
      <Divider sx={{ width: "40vw" }} />

      {tagTours.map((v, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <img
            src={v?.imageFile}
            alt="Image Description"
            style={{ height: 150, width: 200, cursor: "pointer" }}
          />

          <div
            style={{
              display: "flex",
              paddingLeft: "10px",
              flex: 1.5,
              paddingRight: "10px",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                wordWrap: "break-word",
              }}
            >
              {v?.title}
            </Typography>
            <Typography
              sx={{
                wordWrap: "break-word",
              }}
              variant="body2"
              color="text.secondary"
            >
              {v?.description.slice(0, 50)}
              {v?.description?.length > 50 && "..."} &nbsp;
            </Typography>
            <Button
              onClick={() => navigate(`/tour/${v._id}`)}
              variant="contained"
              sx={{ margin: 1, width: "20vw" }}
            >
              Read More
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TagTours;
