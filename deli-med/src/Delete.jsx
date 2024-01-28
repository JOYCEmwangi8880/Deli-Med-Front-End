import { useNavigate } from 'react-router-dom';

function Delete() {
  const deleteUser = async () => {
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();

    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Profile Deleted Successfully');
        navigate('/signup');
      } else {
        console.error('Failed to delete user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <>
      <button onClick={deleteUser} className="edit-profile-btn">
        Delete profile
      </button>
    </>
  );
}

export default Delete;