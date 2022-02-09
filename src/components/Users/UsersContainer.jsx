import { connect } from "react-redux";
import {
  followSuccess,
  setUsers,
  unfollowSuccess,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  getUsersThunkCreator,
  follow,
  unfollow,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { uesersAPI } from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.currentPage,
      this.props.pageSize
    );
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);

    uesersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
    });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
          onPageChanged={this.onPageChanged}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

// let AuthRedirectComponent = withAuthRedirect(UsersContainer);
// export default connect(mapStateToProps, {
//   followSuccess,
//   unfollowSuccess,
//   setUsers,
//   setCurrentPage,
//   setTotalUsersCount,
//   toggleIsFetching,
//   getUsersThunkCreator,
//   follow,
//   unfollow,
// })(AuthRedirectComponent);

export default compose(
  connect(mapStateToProps, {
    followSuccess,
    unfollowSuccess,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    getUsersThunkCreator,
    follow,
    unfollow,
  }),
  withAuthRedirect
)(UsersContainer);
