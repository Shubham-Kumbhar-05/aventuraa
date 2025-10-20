import { useEffect, useState } from "react";
import "./adminDashboard.scss";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingItem, setEditingItem] = useState(null); // item being edited
  const [editType, setEditType] = useState(null); // "user" or "booking"
  const [formData, setFormData] = useState({}); // form input state

  const USERS_URL =
    "https://script.google.com/macros/s/AKfycbzErzXwBEeeeRFNE-sORNMd0H1xPFgGIzfelP8cJ4jn8-mf-xTTNkEufAN9UJmDhCaQvQ/exec";
  const BOOKINGS_URL =
    "https://script.google.com/macros/s/AKfycbzHreFHW3Y5iNqPzFdZp0odtYW2f3LcU7Hb0RfAGRo1U8MQqk61ZrCseE98gnFQ4P9FDw/exec";

  const getValue = (obj, keys) => {
    for (let key of keys) {
      if (obj[key]) return obj[key];
    }
    return "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, bookingsRes] = await Promise.all([
          fetch(USERS_URL),
          fetch(BOOKINGS_URL),
        ]);

        const usersData = await usersRes.json();
        const bookingsData = await bookingsRes.json();

        setUsers(usersData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Sign out logic
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // 🔹 Delete handlers
  const handleDeleteUser = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  const handleDeleteBooking = (index) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((_, i) => i !== index));
    }
  };

  // 🔹 Open edit modal
  const handleEdit = (item, type) => {
    setEditingItem(item);
    setEditType(type);
    setFormData({ ...item });
  };

  // 🔹 Save edits
  const handleSave = () => {
    if (editType === "user") {
      setUsers((prev) =>
        prev.map((u) => (u === editingItem ? formData : u))
      );
    } else if (editType === "booking") {
      setBookings((prev) =>
        prev.map((b) => (b === editingItem ? formData : b))
      );
    }
    setEditingItem(null);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      {loading ? (
        <p className="loading-text">Loading data...</p>
      ) : (
        <>
          {/* USERS SECTION */}
          <section>
            <h2>Registered Users</h2>
            {users.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i}>
                      <td>{getValue(user, ["fullName", "Full Name"])}</td>
                      <td>{getValue(user, ["username", "Username"])}</td>
                      <td>{getValue(user, ["email", "Email"])}</td>
                      <td>{getValue(user, ["role", "Role"]) || "user"}</td>
                      <td className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(user, "user")}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteUser(i)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No user data found.</p>
            )}
          </section>

          {/* BOOKINGS SECTION */}
          <section>
            <h2>Bookings</h2>
            {bookings.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Trip</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i}>
                      <td>{getValue(b, ["name", "Name"])}</td>
                      <td>{getValue(b, ["trip", "Trip"])}</td>
                      <td>{getValue(b, ["email", "Email"])}</td>
                      <td>{getValue(b, ["phone", "Phone"])}</td>
                      <td className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(b, "booking")}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteBooking(i)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No bookings found.</p>
            )}
          </section>
        </>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="edit-modal">
          <div className="edit-form">
            <h3>Edit {editType === "user" ? "User" : "Booking"}</h3>

            {Object.keys(formData).map(
              (key) =>
                key !== "id" && (
                  <div key={key}>
                    <label>{key}</label>
                    <input
                      type="text"
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                    />
                  </div>
                )
            )}

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
