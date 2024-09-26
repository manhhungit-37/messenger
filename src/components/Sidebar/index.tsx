import { ReactNode } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './components/MobileFooter';
import { User } from '@prisma/client';

interface Props {
  children: ReactNode;
  user: User;
}

function Sidebar({
  children,
  user,
}: Props) {
  return (
    <div className="h-full">
      <DesktopSidebar user={user} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;