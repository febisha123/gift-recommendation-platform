import { useState } from "react";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
const [occasion, setOccasion] = useState("");
const [relationship, setRelationship] = useState("");
const [ageGroup, setAgeGroup] = useState("");
const [interests, setInterests] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [recommendations, setRecommendations] = useState([]);
const [rating, setRating] = useState("");
const [comment, setComment] = useState("");
const [reviews, setReviews] = useState([]);
const [showAdmin, setShowAdmin] = useState(false);
const [showAddGift, setShowAddGift] = useState(false);
const [giftName, setGiftName] = useState("");
const [giftDescription, setGiftDescription] = useState("");
const [giftOccasion, setGiftOccasion] = useState("");
const [giftRelationship, setGiftRelationship] = useState("");
const [giftAgeGroup, setGiftAgeGroup] = useState("");
const [giftInterests, setGiftInterests] = useState("");
const [giftPrice, setGiftPrice] = useState("");
const [giftImage, setGiftImage] = useState("");
const [showEditGift, setShowEditGift] = useState(false);
const [editGiftId, setEditGiftId] = useState("");
const [favourites, setFavourites] = useState([]);
const [showFavourites, setShowFavourites] = useState(false);
const loadFavourites = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/favourites",
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (response.ok) {
      setFavourites(data);
      setShowRecommendations(false);
      setShowAdmin(false);
      setShowFavourites(true);
    } else {
      alert(data.message);
    }

  } catch (error) {
    alert("Unable to load favourites");
  }
};


const removeFavourite = async (favouriteId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/favourites/${favouriteId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Favourite removed successfully");
      loadFavourites();
    } else {
      alert(data.message || "Failed to remove favourite");
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};


  return (
    <div className="app">

      <nav className="navbar">
        <h2>🎁 Giftify</h2>

        <div className="nav-buttons">
          <button onClick={() => setShowLogin(true)}>
            Login
          </button>

          <button onClick={() => setShowRegister(true)}>
            Register
          </button>
         <button
  onClick={() => {
    setShowRecommendations(false);
    setShowAdmin(true);
        setShowFavourites(false);
  }}
>
  Admin
</button>
<button
  onClick={() => {
    setShowRecommendations(false);
    setShowAdmin(false);
    loadFavourites();
  }}
>
  ❤️ View Favourites
</button>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">

          <h1>Find the Perfect Gift 🎁</h1>

          <p>
            Discover thoughtful gift ideas for your loved ones based on
            occasion, relationship, interests and budget.
          </p>
<button
  className="start-button"
  onClick={() => {
    setShowAdmin(false);
    setShowRecommendations(true);
    setShowFavourites(false);
  }}
>
  Find a Gift
</button>


        </div>
      </main>

{showFavourites && (
  <div className="favourites-section">
    <h2>❤️ My Favourites</h2>

    {favourites.length === 0 ? (
      <p>No favourites added yet.</p>
    ) : (
      favourites.map((favourite) => (
        <div key={favourite._id} className="gift-card">
          <h3>{favourite.giftId.giftName}</h3>
          <p>{favourite.giftId.description}</p>
          <p>🎉 Occasion: {favourite.giftId.occasion}</p>
          <p>💰 Price: ₹{favourite.giftId.price}</p>
          <button onClick={() => removeFavourite(favourite._id)}>
  ❌ Remove from Favourites
</button>
        </div>
      ))
    )}
  </div>
)}
{/* RECOMMENDATION FORM */}

{showRecommendations && (
  <div className="recommendation-section">

    <h2>Find Your Perfect Gift 🎁</h2>

    <select
      value={occasion}
      onChange={(e) => setOccasion(e.target.value)}
    >
      <option value="">Select Occasion</option>
      <option value="Birthday">Birthday</option>
      <option value="Anniversary">Anniversary</option>
      <option value="Wedding">Wedding</option>
      <option value="Christmas">Christmas</option>
    </select>

    <select
      value={relationship}
      onChange={(e) => setRelationship(e.target.value)}
    >
      <option value="">Select Relationship</option>
      <option value="Friend">Friend</option>
      <option value="Parent">Parent</option>
      <option value="Partner">Partner</option>
      <option value="Sibling">Sibling</option>
    </select>

    <select
      value={ageGroup}
      onChange={(e) => setAgeGroup(e.target.value)}
    >
      <option value="">Select Age Group</option>
      <option value="Under 18">Under 18</option>
      <option value="18-25">18-25</option>
      <option value="26-40">26-40</option>
      <option value="41-60">41-60</option>
      <option value="60+">60+</option>
    </select>

    <input
      type="text"
      placeholder="Interests (e.g. Art)"
      value={interests}
      onChange={(e) => setInterests(e.target.value)}
    />

    <input
      type="number"
      placeholder="Maximum Budget"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
    />

    <button
  onClick={async () => {
    try {
      const response = await fetch(
  `http://localhost:5000/api/gifts/recommendations?occasion=${occasion}&relationship=${relationship}&ageGroup=${ageGroup}&interests=${interests}&maxPrice=${maxPrice}`
);
      

      const data = await response.json();

      setRecommendations(data);
      console.log("Recommendations:", data);

    } catch (error) {
      console.log("Unable to get recommendations");
    }
  }}
>
  Get Recommendations
</button>
{recommendations.map((gift) => (
  <div key={gift._id} className="gift-card">
        <button
      onClick={async () => {
        try {
          const token = localStorage.getItem("token");

          const response = await fetch(
            `http://localhost:5000/api/reviews/${gift._id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
          );

          const data = await response.json();

          if (response.ok) {
            setReviews(data);
          } else {
            alert(data.message);
          }

        } catch (error) {
          alert("Unable to get reviews");
        }
      }}
    >
      ⭐ View Reviews
    </button>

    <h3>{gift.giftName}</h3>

    <p>{gift.description}</p>

    <p>🎉 Occasion: {gift.occasion}</p>

    <p>👥 Relationship: {gift.relationship}</p>

    <p>💰 Price: ₹{gift.price}</p>
    <button onClick={() => removeFavourite(favourite._id)}>
  ❌ Remove from Favourites
</button>

    <button
  onClick={async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/favourites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            giftId: gift._id
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Gift added to favourites ❤️");
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Unable to add favourite");
    }
  }}
>
  ❤️ Add to Favourites
</button>
<div className="review-section">
  <h4>⭐ Give a Review</h4>

  <input
  type="number"
  min="1"
  max="5"
  placeholder="Rating (1-5)"
  value={rating}
  onChange={(e) => setRating(e.target.value)}
  />
  <input
  type="text"
  placeholder="Write a review"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
/>

  <button
  onClick={async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            giftId: gift._id,
            rating: Number(rating),
            comment: comment
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Review submitted successfully ⭐");
        setRating("");
        setComment("");
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Unable to submit review");
    }
  }}
>
  Submit Review
</button>
</div>
    {reviews.map((review) => (
      <div key={review._id}>
        <p>⭐ Rating: {review.rating}/5</p>
        <p>💬 {review.comment}</p>
      </div>
    ))}
  </div>
))}


  </div>
)}
{/* ADMIN DASHBOARD */}
{showAdmin && (
  <div className="admin-section">
    <h2>🛠️ Admin Dashboard</h2>

    <p>Welcome to the Giftify Admin Dashboard!</p>

    <button onClick={() => setShowAdmin(false)}>
      Close Admin
    </button>

    <hr />

    <h3>Manage Gifts 🎁</h3>

    <button onClick={() => setShowAddGift(true)}>
  ➕ Add New Gift
</button>
{showAddGift && (
  <div className="add-gift-form">
    <h3>➕ Add New Gift</h3>

    <input
      type="text"
      placeholder="Gift Name"
      value={giftName}
      onChange={(e) => setGiftName(e.target.value)}
    />

    <input
      type="text"
      placeholder="Description"
      value={giftDescription}
      onChange={(e) => setGiftDescription(e.target.value)}
    />

    <input
      type="text"
      placeholder="Occasion"
      value={giftOccasion}
      onChange={(e) => setGiftOccasion(e.target.value)}
    />

    <input
      type="text"
      placeholder="Relationship"
      value={giftRelationship}
      onChange={(e) => setGiftRelationship(e.target.value)}
    />

    <input
      type="text"
      placeholder="Age Group"
      value={giftAgeGroup}
      onChange={(e) => setGiftAgeGroup(e.target.value)}
    />

    <input
      type="text"
      placeholder="Interests (e.g. Art, Music)"
      value={giftInterests}
      onChange={(e) => setGiftInterests(e.target.value)}
    />

    <input
      type="number"
      placeholder="Price"
      value={giftPrice}
      onChange={(e) => setGiftPrice(e.target.value)}
    />

    <input
      type="text"
      placeholder="Image URL"
      value={giftImage}
      onChange={(e) => setGiftImage(e.target.value)}
    />

    <button
  onClick={async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/gifts",
        {
          method: "POST",
          headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
},
          body: JSON.stringify({
            giftName: giftName,
            description: giftDescription,
            occasion: giftOccasion,
            relationship: giftRelationship,
            ageGroup: giftAgeGroup,
            interests: giftInterests.split(",").map(item => item.trim()),
            price: Number(giftPrice),
            image: giftImage
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Gift added successfully 🎁");

        setGiftName("");
        setGiftDescription("");
        setGiftOccasion("");
        setGiftRelationship("");
        setGiftAgeGroup("");
        setGiftInterests("");
        setGiftPrice("");
        setGiftImage("");
        setShowAddGift(false);
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Unable to add gift");
    }
  }}
>
  Add Gift
</button>

    <button onClick={() => setShowAddGift(false)}>
      Cancel
    </button>
  </div>
)}

    <button onClick={() => setShowEditGift(true)}>
  ✏️ Edit Gift
</button>
{showEditGift && (
  <div className="edit-gift-form">
    <h3>✏️ Edit Gift</h3>

    <input
      type="text"
      placeholder="Enter Gift ID"
      value={editGiftId}
      onChange={(e) => setEditGiftId(e.target.value)}
    />

    <p>
      Enter the ID of the gift you want to edit.
    </p>

    <button
  onClick={async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/gifts/${editGiftId}`,
        {
          method: "PUT",
          headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
},
          body: JSON.stringify({
            giftName: "Updated Teddy Bear",
            description: "Updated gift description",
            occasion: "Birthday",
            relationship: "Friend",
            ageGroup: "18-25",
            interests: ["Cute", "Gifts"],
            price: 900,
            image: ""
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Gift updated successfully 🎁");
        setShowEditGift(false);
        setEditGiftId("");
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Unable to update gift");
    }
  }}
>
  Update Gift
</button>

    <button onClick={() => setShowEditGift(false)}>
      Cancel
    </button>
  </div>
)}

    <button
  onClick={async () => {
    const giftId = prompt("Enter the Gift ID you want to delete:");

    if (!giftId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/gifts/${giftId}`,
        {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
}
      );

      const data = await response.json();

      if (response.ok) {
        alert("Gift deleted successfully 🗑️");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Unable to delete gift");
    }
  }}
>
  🗑️ Delete Gift
</button>
  </div>
)}
{/* LOGIN */}

{showLogin && (


        <div className="modal">

          <div className="modal-box">

            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={async () => {
                try {
                  const response = await fetch(
                    "http://localhost:5000/api/auth/login",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        email,
                        password
                      })
                    }
                  );

                  const data = await response.json();

                  if (response.ok) {
                    localStorage.setItem("token", data.token);
                    setMessage("Login successful!");
                  } else {
                    setMessage(data.message);
                  }

                } catch (error) {
                  setMessage("Unable to connect to server");
                }
              }}
            >
              Login
            </button>

            <p>{message}</p>

            <button
              className="close-button"
              onClick={() => setShowLogin(false)}
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* REGISTER */}

      {showRegister && (
        <div className="modal">

          <div className="modal-box">

            <h2>Create Account</h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={async () => {
                try {
                  const response = await fetch(
                    "http://localhost:5000/api/auth/register",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        name,
                        email,
                        password
                      })
                    }
                  );

                  const data = await response.json();

                  if (response.ok) {
                    setMessage("Registration successful!");
                  } else {
                    setMessage(data.message);
                  }

                } catch (error) {
                  setMessage("Unable to connect to server");
                }
              }}
            >
              Register
            </button>

            <p>{message}</p>

            <button
              className="close-button"
              onClick={() => setShowRegister(false)}
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;