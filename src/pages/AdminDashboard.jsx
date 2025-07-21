import { useEffect, useState } from 'react';
import './adminDashboard.scss';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const USERS_URL = 'https://script.google.com/macros/s/AKfycbzErzXwBEeeeRFNE-sORNMd0H1xPFgGIzfelP8cJ4jn8-mf-xTTNkEufAN9UJmDhCaQvQ/exec';
  const BOOKINGS_URL = 'https://script.google.com/macros/s/AKfycbzHreFHW3Y5iNqPzFdZp0odtYW2f3LcU7Hb0RfAGRo1U8MQqk61ZrCseE98gnFQ4P9FDw/exec';

  const getValue = (obj, keys) => {
    for (let key of keys) {
      if (obj[key]) return obj[key];
    }
    return '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, bookingsRes] = await Promise.all([
          fetch(USERS_URL),
          fetch(BOOKINGS_URL)
        ]);

        const usersData = await usersRes.json();
        const bookingsData = await bookingsRes.json();

        console.log("✅ Users:", usersData);
        console.log("✅ Bookings:", bookingsData);

        setUsers(usersData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* Users Section */}
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
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i}>
                      <td>{getValue(user, ['fullName', 'Full Name'])}</td>
                      <td>{getValue(user, ['username', 'Username'])}</td>
                      <td>{getValue(user, ['email', 'Email'])}</td>
                      <td>{getValue(user, ['role', 'Role']) || 'user'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No user data found.</p>
            )}
          </section>

          {/* Bookings Section */}
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
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i}>
                      <td>{getValue(b, ['name', 'Name'])}</td>
                      <td>{getValue(b, ['trip', 'Trip'])}</td>
                      <td>{getValue(b, ['email', 'Email'])}</td>
                      <td>{getValue(b, ['phone', 'Phone'])}</td>
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
    </div>
  );
}
