import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../redux/features/tourSlice";
import { Pagination, Typography } from "@mui/material";
import CardTour from "../components/CardTour";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, tours, currentPage, numberOfPages } = useSelector(
    (state) => state.tour
  );

  useEffect(() => {
    dispatch(getTours({ page: currentPage }));
  }, [currentPage]);

  const handlePageChange = (page) => {
    console.log("handlePageChange", page);
    dispatch(setCurrentPage(page));
  };

  if (loading) {
    return <Loader />;
  }

  return tours.length === 0 ? (
    <Typography
      sx={{
        marginTop: 12,
        textAlign: "center",
      }}
      variant="h2"
      gutterBottom
    >
      No data available...
    </Typography>
  ) : (
    <div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        {tours.map((value, index) => (
          <CardTour key={index} tourItem={value} />
        ))}
      </div>
      <Pagination
        sx={{
          position: "absolute",
          bottom: "30px",
          left: "50%", // Move to the horizontal center
          transform: "translateX(-50%)", // Center horizontally
        }}
        count={numberOfPages}
        color="primary"
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)} // Use your own page change handler function
      />
    </div>
  );
};

export default Home;
