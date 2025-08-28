import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  User,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  Crown,
  Globe,
  Eye,
  MessageSquare
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [notificationSettings, setNotificationSettings] = useState({
    tradeOffers: true,
    tradeUpdates: true,
    systemAnnouncements: false,
    marketingEmails: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    tradeHistoryVisible: true,
    onlineStatus: true,
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gaming-bg flex items-center justify-center">
        <div className="gaming-card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-gaming-bg">
      {/* Header */}
      <div className="border-b border-border/20 bg-gaming-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="bg-gaming-card border border-border/50">
              <TabsTrigger value="account" className="data-[state=active]:bg-primary/20" data-testid="tab-account">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-primary/20" data-testid="tab-privacy">
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/20" data-testid="tab-notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-primary/20" data-testid="tab-billing">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account">
              <div className="space-y-6">
                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your basic account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={(user as any)?.email || ""}
                          disabled
                          data-testid="input-email"
                        />
                        <p className="text-xs text-muted-foreground">
                          Email is managed through your Replit account
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={(user as any)?.username || ""}
                          disabled
                          data-testid="input-username"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={(user as any)?.firstName || ""}
                          disabled
                          data-testid="input-first-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={(user as any)?.lastName || ""}
                          disabled
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        To update your account information, please visit your Replit account settings.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>Manage your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="gaming-button-secondary text-red-400 border-red-400 hover:bg-red-400/10"
                      data-testid="button-logout"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <div className="space-y-6">
                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle>Profile Visibility</CardTitle>
                    <CardDescription>Control who can see your profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="profile-visible">Public Profile</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Allow other users to view your profile
                        </p>
                      </div>
                      <Switch
                        id="profile-visible"
                        checked={privacySettings.profileVisible}
                        onCheckedChange={(checked) =>
                          setPrivacySettings(prev => ({ ...prev, profileVisible: checked }))
                        }
                        data-testid="switch-profile-visible"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="trade-history-visible">Trade History</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Show your trading history to other users
                        </p>
                      </div>
                      <Switch
                        id="trade-history-visible"
                        checked={privacySettings.tradeHistoryVisible}
                        onCheckedChange={(checked) =>
                          setPrivacySettings(prev => ({ ...prev, tradeHistoryVisible: checked }))
                        }
                        data-testid="switch-trade-history-visible"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="online-status">Online Status</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Display when you're online to other users
                        </p>
                      </div>
                      <Switch
                        id="online-status"
                        checked={privacySettings.onlineStatus}
                        onCheckedChange={(checked) =>
                          setPrivacySettings(prev => ({ ...prev, onlineStatus: checked }))
                        }
                        data-testid="switch-online-status"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <div className="space-y-6">
                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose what notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="trade-offers">Trade Offers</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when someone makes an offer on your trades
                        </p>
                      </div>
                      <Switch
                        id="trade-offers"
                        checked={notificationSettings.tradeOffers}
                        onCheckedChange={(checked) =>
                          setNotificationSettings(prev => ({ ...prev, tradeOffers: checked }))
                        }
                        data-testid="switch-trade-offers"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="trade-updates">Trade Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about status changes on your trades
                        </p>
                      </div>
                      <Switch
                        id="trade-updates"
                        checked={notificationSettings.tradeUpdates}
                        onCheckedChange={(checked) =>
                          setNotificationSettings(prev => ({ ...prev, tradeUpdates: checked }))
                        }
                        data-testid="switch-trade-updates"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="system-announcements">System Announcements</Label>
                        <p className="text-sm text-muted-foreground">
                          Important updates about the platform
                        </p>
                      </div>
                      <Switch
                        id="system-announcements"
                        checked={notificationSettings.systemAnnouncements}
                        onCheckedChange={(checked) =>
                          setNotificationSettings(prev => ({ ...prev, systemAnnouncements: checked }))
                        }
                        data-testid="switch-system-announcements"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Tips, features, and promotional content
                        </p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) =>
                          setNotificationSettings(prev => ({ ...prev, marketingEmails: checked }))
                        }
                        data-testid="switch-marketing-emails"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Billing Settings */}
            <TabsContent value="billing">
              <div className="space-y-6">
                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle>Premium Subscription</CardTitle>
                    <CardDescription>Manage your premium membership</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(user as any)?.isPremium ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Crown className="h-5 w-5 text-yellow-500" />
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            Premium Active
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You have access to all premium features including priority support, 
                          advanced analytics, and custom themes.
                        </p>
                        <Button variant="outline" className="gaming-button-secondary" data-testid="button-manage-subscription">
                          Manage Subscription
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center py-8">
                          <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                          <h3 className="text-lg font-medium text-foreground mb-2">
                            Upgrade to Premium
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Get priority support, advanced features, and exclusive content
                          </p>
                          <div className="space-y-2 text-sm text-muted-foreground mb-6">
                            <p>✓ Priority customer support</p>
                            <p>✓ Advanced trading analytics</p>
                            <p>✓ Custom profile themes</p>
                            <p>✓ Early access to new features</p>
                          </div>
                          <Button className="gaming-button-primary" data-testid="button-upgrade-premium">
                            <Crown className="h-4 w-4 mr-2" />
                            Upgrade to Premium
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}