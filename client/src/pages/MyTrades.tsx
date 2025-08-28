import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  ArrowUpCircle, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle,
  Package,
  Download,
  Copy,
  Eye
} from "lucide-react";
import { Link } from "wouter";

interface Trade {
  id: string;
  title: string;
  description: string;
  game: string;
  offeringItems: string[];
  wantingItems: string[];
  serverLink: string;
  status: string;
  lastBumped: string;
  bumpCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function MyTrades() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("active");

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

  const { data: trades, isLoading: tradesLoading } = useQuery<Trade[]>({
    queryKey: ["/api/trades/my", { status: activeTab !== "all" ? activeTab : undefined }],
    enabled: isAuthenticated,
  });

  const bumpTradeMutation = useMutation({
    mutationFn: async (tradeId: string) => {
      await apiRequest(`/api/trades/${tradeId}/bump`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast({
        title: "Trade Bumped",
        description: "Your trade has been moved to the top of the list.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/trades/my"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to bump trade. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateTradeStatusMutation = useMutation({
    mutationFn: async ({ tradeId, status }: { tradeId: string; status: string }) => {
      await apiRequest(`/api/trades/${tradeId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Trade Updated",
        description: "Trade status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/trades/my"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to update trade. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gaming-bg flex items-center justify-center">
        <div className="gaming-card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading trades...</p>
        </div>
      </div>
    );
  }

  const filteredTrades = trades?.filter(trade => {
    if (activeTab === "all") return true;
    return trade.status === activeTab;
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4 text-primary" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/20 text-primary";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300";
      case "completed":
        return "bg-green-500/20 text-green-300";
      case "cancelled":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const canBump = (lastBumped: string) => {
    const lastBumpTime = new Date(lastBumped);
    const now = new Date();
    const diffHours = (now.getTime() - lastBumpTime.getTime()) / (1000 * 60 * 60);
    return diffHours >= 4; // Can bump every 4 hours
  };

  const exportTrades = () => {
    const csvContent = [
      ["Title", "Game", "Status", "Created", "Bumps", "Offering", "Wanting"].join(","),
      ...filteredTrades.map(trade => [
        `"${trade.title}"`,
        `"${trade.game}"`,
        trade.status,
        new Date(trade.createdAt).toLocaleDateString(),
        trade.bumpCount,
        `"${trade.offeringItems.join("; ")}"`,
        `"${trade.wantingItems.join("; ")}"`
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-trades-${activeTab}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gaming-bg">
      {/* Header */}
      <div className="border-b border-border/20 bg-gaming-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Trades</h1>
              <p className="text-muted-foreground">Manage your active trades and view history</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportTrades}
                className="gaming-button-secondary"
                data-testid="button-export"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link href="/create-trade">
                <Button className="gaming-button-primary" data-testid="button-create-new-trade">
                  <Package className="h-4 w-4 mr-2" />
                  Create Trade
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Card className="gaming-card border-border/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Trade Management</CardTitle>
                <CardDescription>
                  {filteredTrades.length} {activeTab === "all" ? "total" : activeTab} trades
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-gaming-card border border-border/50">
                <TabsTrigger value="active" data-testid="tab-active">
                  Active ({trades?.filter(t => t.status === "active").length || 0})
                </TabsTrigger>
                <TabsTrigger value="pending" data-testid="tab-pending">
                  Pending ({trades?.filter(t => t.status === "pending").length || 0})
                </TabsTrigger>
                <TabsTrigger value="completed" data-testid="tab-completed">
                  Completed ({trades?.filter(t => t.status === "completed").length || 0})
                </TabsTrigger>
                <TabsTrigger value="cancelled" data-testid="tab-cancelled">
                  Cancelled ({trades?.filter(t => t.status === "cancelled").length || 0})
                </TabsTrigger>
                <TabsTrigger value="all" data-testid="tab-all">
                  All ({trades?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {tradesLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-muted rounded border border-border/10"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredTrades.length > 0 ? (
                  <div className="border border-border/20 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gaming-card/30">
                        <TableRow>
                          <TableHead>Trade Details</TableHead>
                          <TableHead>Game</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Bumps</TableHead>
                          <TableHead>Last Activity</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTrades.map((trade) => (
                          <TableRow 
                            key={trade.id} 
                            className="hover:bg-muted/5 transition-colors"
                            data-testid={`trade-row-${trade.id}`}
                          >
                            <TableCell>
                              <div className="space-y-1">
                                <h4 className="font-medium text-foreground">{trade.title}</h4>
                                <div className="text-sm text-muted-foreground">
                                  <div>Offering: {trade.offeringItems.slice(0, 2).join(", ")}
                                    {trade.offeringItems.length > 2 && ` +${trade.offeringItems.length - 2} more`}
                                  </div>
                                  <div>Wanting: {trade.wantingItems.slice(0, 2).join(", ")}
                                    {trade.wantingItems.length > 2 && ` +${trade.wantingItems.length - 2} more`}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{trade.game}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(trade.status)}
                                <Badge className={getStatusColor(trade.status)}>
                                  {trade.status}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{trade.bumpCount}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-muted-foreground">
                                {new Date(trade.lastBumped).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                {trade.status === "active" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={!canBump(trade.lastBumped) || bumpTradeMutation.isPending}
                                    onClick={() => bumpTradeMutation.mutate(trade.id)}
                                    className="gaming-button-secondary"
                                    data-testid={`button-bump-${trade.id}`}
                                  >
                                    <ArrowUpCircle className="h-4 w-4 mr-1" />
                                    {canBump(trade.lastBumped) ? "Bump" : "Cooldown"}
                                  </Button>
                                )}
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      data-testid={`button-actions-${trade.id}`}
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="gaming-card border-border/50">
                                    <DropdownMenuItem data-testid={`action-view-${trade.id}`}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem data-testid={`action-copy-link-${trade.id}`}>
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy Link
                                    </DropdownMenuItem>
                                    {trade.status === "active" && (
                                      <>
                                        <DropdownMenuItem data-testid={`action-edit-${trade.id}`}>
                                          <Edit className="h-4 w-4 mr-2" />
                                          Edit Trade
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          onClick={() => updateTradeStatusMutation.mutate({ tradeId: trade.id, status: "completed" })}
                                          data-testid={`action-complete-${trade.id}`}
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Mark Complete
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          onClick={() => updateTradeStatusMutation.mutate({ tradeId: trade.id, status: "cancelled" })}
                                          className="text-red-400"
                                          data-testid={`action-cancel-${trade.id}`}
                                        >
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Cancel Trade
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No {activeTab === "all" ? "" : activeTab} trades found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {activeTab === "active" 
                        ? "Create your first trade to get started!" 
                        : `You don't have any ${activeTab} trades yet.`}
                    </p>
                    {activeTab === "active" && (
                      <Link href="/create-trade">
                        <Button className="gaming-button-primary" data-testid="button-create-first-trade">
                          Create Your First Trade
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}