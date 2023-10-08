import TourModal from "../models/tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;
  /*
  `req.body`:
   - Explanation: `req.body` is used to access the data sent in the body of an HTTP request, typically in POST, PUT, or PATCH requests.
   - Example:
     ```javascript
     // POST request body: { "username": "johndoe", "email": "john@example.com" }
     const username = req.body.username; // "johndoe"
     const email = req.body.email;       // "john@example.com"
     ```
   - Usage: Commonly used when creating or updating resources on the server, where data is sent in the request body in JSON or other formats.
  */

  //create tour obj. by instantiating object from modal
  const newTour = new TourModal({
    ...tour,
    creator: req?.userId, //coming from auth middleware
    createdAt: new Date().toISOString(),
  });
  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!!!" });
    console.log("ERROR_MESSAGE1", error?.message);
  }
};

export const getTours = async (req, res) => {
  const { page, pageSize } = req.query; // Get the 'page' and 'pageSize' query parameters from the request

  try {
    const limit = pageSize ? parseInt(pageSize) : 6; // Define the number of items per page, use provided pageSize or default to 6
    const startIndex = (Number(page) - 1) * limit; // Calculate the starting index for pagination

    // Use Promise.all to fetch total count and paginated data in parallel
    const [total, tours] = await Promise.all([
      TourModal.countDocuments({}), // Fetch the total count of tours in the database
      TourModal.find().limit(limit).skip(startIndex), // Fetch paginated data
    ]);

    // Handle cases where 'page' is not provided or is invalid
    if (!page || isNaN(page) || page <= 0) {
      return res.status(400).json({ message: "Invalid page number" }); // Return a 400 Bad Request response
    }

    // Respond with paginated data, current page number, total tour count, and number of pages
    res.json({
      data: tours,
      currentPage: Number(page), // Convert 'page' to a number for consistency
      totalTours: total, // Total count of tours
      numberOfPages: Math.ceil(total / limit), // Calculate the number of pages
    });
  } catch (error) {
    console.error(error); // Log any server-side errors
    res.status(500).json({ message: "Server error" }); // Return a 500 Internal Server Error response
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;

  console.log("firgetTourgetTourst", req.params);
  /*
  `req.params`:
   - Explanation: `req.params` is used to access route parameters, which are part of the route path and are defined dynamically.
   - Example:
     ```javascript
     // Route: app.get('/api/users/:userId', ...)
     const userId = req.params.userId; // "123"
     ```
   - Usage: Useful when you have dynamic values in your routes, such as retrieving a specific resource by its ID.
  */
  try {
    const tour = await TourModal.findById(id); //get all tours list
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!!!" });
    console.log("ERROR_MESSAGE3", error?.message);
  }
};

export const getToursByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userTours = await TourModal.find({ creator: id });
    res.status(200).json(userTours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log("ERROR_MESSAGE4", error?.message);
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    await TourModal.findByIdAndRemove(id);
    res.json({ message: "Tour deleted successfully..." });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log("ERROR_MESSAGE5", error?.message);
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    const updatedTour = {
      title,
      description,
      creator,
      imageFile,
      tags,
      _id: id,
    };
    await TourModal.findByIdAndUpdate(id, updatedTour, { new: true });
    res.json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log("ERROR_MESSAGE6", error?.message);
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  /*
  `req.query`:
   - Explanation: `req.query` is used to access query parameters or data sent as part of the URL query string in a GET request.
   - Example:
     ```javascript
     // URL: http://example.com/api/users?name=John&age=30
     const name = req.query.name; // "John"
     const age = req.query.age;   // "30"
     ```
   - Usage: Typically used for filtering or sorting data when making GET requests by including parameters in the URL.
  */

  try {
    const title = new RegExp(searchQuery, "i");
    const tours = await TourModal.find({ title });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log("ERROR_MESSAGE", error?.message);
  }
};

export const getToursByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const tours = await TourModal.find({ tags: { $in: tag } }); //This code uses Mongoose to find documents in the "TourModal" collection where the "tags" field contains any of the values in the "tag" array.
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log("ERROR_MESSAGE", error?.message);
  }
};

export const getRelatedTours = async (req, res) => {
  const { tags, tourId } = req.body;

  console.log("getRelatedTours", req.body);
  try {
    const tours = await TourModal.find({
      _id: { $ne: tourId }, // Exclude the tour with the specified tourId
      tags: { $in: tags }, //get all tours that matches tags
    });

    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log("ERROR_MESSAGE", error?.message);
  }
};

export const likeDislikeTour = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    const tour = await TourModal.findById(id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Check if the user has already liked the tour
    const hasLiked = tour.likes.includes(userId);

    if (hasLiked) {
      // If the user has liked the tour, remove the like
      tour.likes = tour.likes.filter((likeUserId) => likeUserId !== userId);
    } else {
      // If the user hasn't liked the tour, add the like
      tour.likes.push(userId);
    }

    const updatedTour = await tour.save(); // Save the updated tour

    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
