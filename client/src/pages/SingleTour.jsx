import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import Typography from "@mui/material/Typography";
import { CalendarMonth } from "@mui/icons-material";
import moment from "moment";
import RelatedTours from "./RelatedTours";
import Loader from "../components/Loader";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours, loading } = useSelector((state) => state.tour);
  const { id } = useParams();

  const tags = tour?.tags;
  console.log("CardTourCardTour", tags);

  useEffect(() => {
    tags && dispatch(getRelatedTours({ tags, tourId: id }));
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="container-tour-detail">
        <img
          src={tour?.imageFile}
          alt="Image Description"
          style={{ height: 300 }}
        />
        <Typography style={{ textAlign: "center", margin: 10 }} variant="h4">
          {tour?.title}
        </Typography>
        <Typography style={{ margin: 10 }} variant="h5">
          Created By: {tour?.name}
        </Typography>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          {tour?.tags &&
            tour.tags.map((v, index) => (
              <Typography key={index} style={{ marginLeft: 10 }} variant="h6">
                #{v}
              </Typography>
            ))}
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CalendarMonth
            sx={{
              height: 30,
              width: 30,
              marginLeft: 1,
            }}
          />
          <Typography style={{ margin: 10 }} variant="h6">
            {moment(tour?.createdAt).fromNow()}
          </Typography>
        </div>
        <Typography style={{ margin: 10 }} variant="body1">
          {tour?.description}
        </Typography>
      </div>
      {loading ? <Loader /> : <RelatedTours relatedTours={relatedTours} />}
    </>
  );
};

export default SingleTour;
