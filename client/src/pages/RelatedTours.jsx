import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const RelatedTours = ({ relatedTours }) => {
  const navigate = useNavigate();

  const onClick = (_id) => navigate(`/tour/${_id}`);
  return (
    <div style={{ padding: 50, paddingTop: 0 }}>
      <div className="row-center-flex">
        <div className="line-break" />
        <h2 style={{ margin: 20 }}>Related Tours</h2>
        <div className="line-break" />
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {relatedTours.length > 0 &&
          relatedTours.map((v, i) => (
            <Card
              onClick={() => onClick(v?._id)}
              sx={{ maxWidth: 300, margin: "10px" }}
            >
              <CardMedia sx={{ height: 200 }} image={v?.imageFile} />
              <div className="row-flex-wrap">
                {v?.tags.length > 0 &&
                  v.tags.map((v, index) => (
                    <Typography
                      key={index}
                      style={{ marginLeft: 10 }}
                      variant="h6"
                    >
                      #{v}
                    </Typography>
                  ))}
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {v?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {v?.description.slice(0, 100)}...
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default RelatedTours;
