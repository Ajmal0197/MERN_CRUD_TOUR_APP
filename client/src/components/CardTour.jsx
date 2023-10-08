import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { likeDislikeTour } from "../redux/features/tourSlice";

export default function CardTour({ tourItem }) {
  const { _id, title, description, name, imageFile, tags, likes } = tourItem;
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const userId = user?.result?._id;

  const onPressLikeDislike = () => {
    dispatch(likeDislikeTour({ _id }));
  };

  return (
    <Card sx={{ width: 340, marginRight: 5, marginTop: 5 }}>
      <Typography
        sx={{ position: "absolute", margin: 1 }}
        color={"yellow"}
        variant="h5"
      >
        {name}
      </Typography>
      <CardMedia sx={{ height: 150 }} image={imageFile} />
      <CardContent>
        {tags && tags.length > 0 && (
          <Stack
            sx={{
              backgroundColor: "lightpink",
              display: "flex",
              flexWrap: "wrap",
            }}
            direction="row"
            spacing={2}
          >
            {tags &&
              tags.map((v, index) => (
                <Link key={index} to={`/tours/tag/${v}`}>
                  <Typography key={index} variant="h6">{`#${v}`}</Typography>
                </Link>
              ))}
          </Stack>
        )}

        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                wordWrap: "break-word",
                textAlign: "start",
              }}
            >
              {title}
            </Typography>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              {likes.includes(userId) ? (
                <Favorite color="error" onClick={onPressLikeDislike} />
              ) : (
                <FavoriteBorder color="error" onClick={onPressLikeDislike} />
              )}
              <h3>&nbsp; {likes.length}</h3>
            </div>
          </div>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description.slice(0, 50)}
              {description.length > 50 && "..."} &nbsp;
              <Link to={`/tour/${_id}`}>{"Read More"}</Link>
            </Typography>
          )}
        </CardContent>
      </CardContent>
    </Card>
  );
}
