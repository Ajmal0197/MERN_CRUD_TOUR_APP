import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import { toast } from "react-toastify";
import { Card, Divider, Typography } from "@mui/material";
import { DeleteForever, EditNote } from "@mui/icons-material";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { userTours, loading } = useSelector((state) => state.tour);
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this tour?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        margin: 100,
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">Dashboard: {user?.result?.name}</Typography>
      <Divider sx={{ margin: "15px" }} />

      {userTours.map((v, index) => (
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
          </div>
          <div
            style={{
              display: "flex",
              flex: 0.5,
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <DeleteForever
              onClick={() => handleDelete(v?._id)}
              sx={{
                color: "red",
                height: 55,
                width: 55,
                cursor: "pointer",
              }}
            />
            {/* on press edit naigate to edit tour of particular post */}
            <Link to={`/editTour/${v?._id}`}>
              <EditNote
                sx={{
                  color: "blue",
                  height: 55,
                  width: 55,
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
