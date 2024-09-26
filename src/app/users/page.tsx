import getCurrentUser from '@actions/getCurrentUser';
import getUsers from '@actions/getUsers';
import EmptyState from './components/EmptyState';
import Sidebar from '@components/Sidebar';
import UserList from './components/UserList';

async function Users() {
  const user = await getCurrentUser();
  const users = await getUsers();

  if (!user) return null;

  return (
    <Sidebar user={user}>
      <div className="h-full">
        <UserList items={users} />
        <div className="hidden lg:block lg:pl-80 h-full">
          <EmptyState />
        </div>
      </div>
    </Sidebar>
  );
}

export default Users;