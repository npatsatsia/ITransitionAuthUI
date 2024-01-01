import API from '../Axios/axios'

const getAllUsers = async () => {
    return await API.get('/users',)
      .then((response) => {
        return response
      })
}

const changeUserStatus = async (userID) => {
  try {
    const response = await API.post('/users', { userID }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

const deleteUser = async (userID) => {
  try {
    const response = await API.delete('/delete', {
      data: { userID },
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

const usersManagementService = {
    getAllUsers,
    changeUserStatus,
    deleteUser

}

export default usersManagementService