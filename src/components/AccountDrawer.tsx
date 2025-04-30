
import React from 'react';
import { X, User, CreditCard, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountDrawer: React.FC<AccountDrawerProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-sm ml-auto h-full rounded-l-lg">
        <DrawerHeader className="border-b border-gray-800 flex justify-between items-center">
          <DrawerTitle className="text-xl font-semibold">Account</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="p-4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="profile" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                <span>Subscription</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  {user?.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="User avatar" 
                      className="h-16 w-16 rounded-full"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xl font-medium">
                        {(user?.user_metadata?.name || 'User').charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {user?.user_metadata?.name || 'User'}
                    </h3>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID</span>
                    <span className="text-sm font-mono">{user?.id.substring(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Joined</span>
                    <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="subscription" className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Current Plan</h3>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded">FREE</span>
                      <h4 className="text-lg font-bold mt-2">Basic Plan</h4>
                      <p className="text-sm opacity-80">Limited features</p>
                    </div>
                    <p className="text-2xl font-bold">$0</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Available Upgrades</h4>
                  <div className="border border-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Pro Plan</h5>
                      <span className="text-sm font-semibold">$9.99/mo</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Full access to all features and models</p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      Upgrade to Pro
                    </Button>
                  </div>
                  <div className="border border-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Business Plan</h5>
                      <span className="text-sm font-semibold">$39.99/mo</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Enterprise features and dedicated support</p>
                    <Button className="w-full">Upgrade to Business</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">General Settings</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-400">Toggle dark mode on/off</p>
                    </div>
                    <div className="flex h-6 w-11 items-center rounded-full bg-blue-600 p-1 shadow-sm">
                      <div className="h-4 w-4 transform rounded-full bg-white transition"></div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive updates and news</p>
                    </div>
                    <div className="flex h-6 w-11 items-center rounded-full bg-gray-600 p-1 shadow-sm">
                      <div className="h-4 w-4 transform translate-x-5 rounded-full bg-white transition"></div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Button variant="outline" className="w-full">
                      Reset Preferences
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Danger Zone</h3>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AccountDrawer;
