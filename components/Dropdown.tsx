'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import NavItems from './NavItems';
import { signOut } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';

const Dropdown = ({ name, email }: { name: string; email: string }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className='flex items-center gap-2 cursor-pointer'
          variant={'ghost'}
        >
          <Avatar className='h-8 w-8'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback className='text-sm font-bold bg-blue-primary text-gray-primary'>
              {name}
            </AvatarFallback>
          </Avatar>

          <div className='hidden md:flex'>
            <div className='text-base font-medium text-gray-primary'>
              {name}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div>
            <div className='text-base font-medium'>{name}</div>
            <div className='text-sm font-medium text-gray-primary'>{email}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='md:hidden'>
          <NavItems />
        </div>
        <DropdownMenuItem
          className='text-md focus:bg-transparent cursor-pointer focus:text-blue-primary transition-colors'
          onClick={handleSignOut}
        >
          <LogOut className='hidden md:block' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
