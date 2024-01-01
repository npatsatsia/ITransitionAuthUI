import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLockOpen, FaTrash  } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, changeUserStatus, deleteUser } from '../../slices/usersManagement'
import { logout } from "../../slices/auth";
import 'bootstrap/dist/css/bootstrap.min.css';

// status change davakvirdebt tu vikenebt rameshi
const UserManagement = () => {
  const [statusChange, setStatusChange] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [allCheckedAreBlocked, setAllCheckedAreBlocked] = useState(false)
  const [allCheckedAreActive, setAllCheckedAreActive] = useState(false)
  const [statusChangeDisabled, setStatusChangeDisabled] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { usersArr, changed, removed } = useSelector((state) => state.users);
  console.log(removed)

  useEffect(() => {
    if(removed === 'Deleted Myself' || changed === 'Blocked Myself'){
      dispatch(logout())
    }
  },[dispatch, removed, changed])
  
  useEffect(() => {
    if(!localStorage.getItem("jwt")){
      navigate('/signin')
    }
  }, [])

  
  const handleHeaderCheckboxChange = () => {
    const userIDsArray = usersArr.map((user) => user.userID);
    setSelectAll(!selectAll);
    setCheckedUsers(selectAll ? [] : userIDsArray);
  };

  const handleCheckboxChange = (userID) => {
    setCheckedUsers((prevUsers) => {
      if (prevUsers.includes(userID)) {
        return prevUsers.filter((user) => user !== userID);
      } else {
        return [...prevUsers, userID];
      }
    });
    setSelectAll(false);
  };
  
  useEffect(() => {
    if (checkedUsers.length === usersArr.length) {
      return setSelectAll(true);
    }else return setSelectAll(false)
  }, [selectAll, checkedUsers, usersArr])

  useEffect(() => {
    if(localStorage.getItem("jwt")){
      dispatch(getAllUsers());
    }
  }, [dispatch, removed, changed]);

  const handleChangeUserStatus = (userID) => {
    dispatch(changeUserStatus(userID));
    setStatusChange((prev) => !prev);
  };
  const handleCheckedStatusChange = (userIDsList) => {
    dispatch(changeUserStatus(userIDsList))
    setStatusChange((prev) => !prev);
  }

  const handleDelete = (userID) => {
    dispatch(deleteUser(userID));
    setStatusChange((prev) => !prev);
  };

  const handleCheckedDelete = (userIDsList) => {
    dispatch(deleteUser(userIDsList));
    setStatusChange((prev) => !prev);
  }

  useEffect(() => {
    let statuses = []
    for(let i = 0; i < checkedUsers.length; i++){
      const user = usersArr.find((user) => {return user.userID === checkedUsers[i]})
      statuses.push(user.active)
    }
    let hasTrueStatus = statuses.includes(true)
    let hasFalseStatus = statuses.includes(false)
    if(hasTrueStatus && hasFalseStatus){
      setAllCheckedAreBlocked(false)
      setAllCheckedAreActive(false)
      setStatusChangeDisabled(true)
    }else if (hasTrueStatus && !hasFalseStatus){
      setAllCheckedAreActive(true)
      setAllCheckedAreBlocked(false)
      setStatusChangeDisabled(false)
    }else if(!hasTrueStatus && hasFalseStatus){
      setAllCheckedAreActive(false )
      setAllCheckedAreBlocked(true)
      setStatusChangeDisabled(false)
    }
  }, [selectAll, checkedUsers, usersArr])

  
  return (
    usersArr? 
    <div className='container'>
      <table className='table'>
        <thead style={{backgroundColor: '#f8f9fa', padding: '10px'}}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
            <th></th>
            <th>
              <input
              onChange={handleHeaderCheckboxChange}
              checked={selectAll}
              type="checkbox" />
            </th>
          </tr>
        </thead>
        <tbody>
          {usersArr.map(user => (
            <tr key={user.userID}>
              <td>{user.userID}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.last_login_time}</td>
              <td>{user.registration_time}</td>
              <td className={`custom-font-weight ${user.active ? "text-success" : "text-danger"}`}>
                {user.active ? "ACTIVE" : "BLOCKED"}
              </td>
              <td>
                <div className='d-flex justify-content-between'>
                  <button className='btn btn-danger' disabled={!user.active} onClick={() => handleChangeUserStatus(user.userID)}>Block</button>
                  <button className='btn btn-success d-flex justify-content-between' disabled={user.active} onClick={() => handleChangeUserStatus(user.userID)}><FaLockOpen /></button>
                  <button className='btn btn-light d-flex justify-content-between' onClick={() => handleDelete(user.userID)}><FaTrash /></button>
                </div>
              </td>
              <td>
                <input
                checked={checkedUsers.includes(user.userID)}
                onChange={() => handleCheckboxChange(user.userID)}
                type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            <div className="d-flex justify-content-end">
              <button className='btn btn-danger' onClick={() => {handleCheckedStatusChange(checkedUsers)}} disabled={checkedUsers.length < 1 || allCheckedAreBlocked || statusChangeDisabled}>Block Checked</button>
              <button className='btn btn-success d-flex justify-content-between' onClick={() => {handleCheckedStatusChange(checkedUsers)}} disabled={checkedUsers.length < 1 || allCheckedAreActive || statusChangeDisabled}>Unblock Checked</button>
              <button className='btn btn-dark d-flex justify-content-between' onClick={() => {handleCheckedDelete(checkedUsers)}} disabled={checkedUsers.length < 1}>Delete Checked</button>
            </div>
    </div> : 
    navigate('/signin')
  );
};

export default UserManagement;
