import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Package, 
  Gamepad2, 
  Link as LinkIcon,
  Eye,
  Save,
  Send
} from "lucide-react";
import { Link, useLocation } from "wouter";

const createTradeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  game: z.string().min(1, "Please select a game"),
  offeringItems: z.array(z.string()).min(1, "Please add at least one item you're offering"),
  wantingItems: z.array(z.string()).min(1, "Please add at least one item you're wanting"),
  serverLink: z.string().url("Please enter a valid server link").optional().or(z.literal("")),
});

type CreateTradeForm = z.infer<typeof createTradeSchema>;

const GAMES = [
  "Grow a Garden",
  "Steal a Brainrot",
  "Dragon's Quest",
  "Mystic Realms",
  "Space Traders"
];

const POPULAR_ITEMS = {
  "Grow a Garden": [
    "Rare Seeds", "Golden Watering Can", "Enchanted Soil", "Rainbow Flowers", "Ancient Tree"
  ],
  "Steal a Brainrot": [
    "Diamond Sword", "Legendary Armor", "Magic Potion", "Rare Gems", "Epic Mount"
  ],
  "Dragon's Quest": [
    "Dragon Egg", "Mystic Staff", "Ancient Scroll", "Crystal Armor", "Phoenix Feather"
  ]
};

export default function CreateTrade() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [offeringInput, setOfferingInput] = useState("");
  const [wantingInput, setWantingInput] = useState("");

  const form = useForm<CreateTradeForm>({
    resolver: zodResolver(createTradeSchema),
    defaultValues: {
      title: "",
      description: "",
      game: "",
      offeringItems: [],
      wantingItems: [],
      serverLink: "",
    },
  });

  const selectedGame = form.watch("game");
  const offeringItems = form.watch("offeringItems");
  const wantingItems = form.watch("wantingItems");

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

  const createTradeMutation = useMutation({
    mutationFn: async (data: CreateTradeForm) => {
      await apiRequest("/api/trades", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Trade Created!",
        description: "Your trade has been posted to the marketplace.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/trades"] });
      queryClient.invalidateQueries({ queryKey: ["/api/trades/my"] });
      setLocation("/my-trades");
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
        description: "Failed to create trade. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gaming-bg flex items-center justify-center">
        <div className="gaming-card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const onSubmit = (data: CreateTradeForm) => {
    createTradeMutation.mutate(data);
  };

  const addItem = (type: "offering" | "wanting", item: string) => {
    if (!item.trim()) return;
    
    const currentItems = form.getValues(type === "offering" ? "offeringItems" : "wantingItems");
    if (!currentItems.includes(item.trim())) {
      form.setValue(
        type === "offering" ? "offeringItems" : "wantingItems",
        [...currentItems, item.trim()]
      );
    }
    
    if (type === "offering") {
      setOfferingInput("");
    } else {
      setWantingInput("");
    }
  };

  const removeItem = (type: "offering" | "wanting", index: number) => {
    const currentItems = form.getValues(type === "offering" ? "offeringItems" : "wantingItems");
    form.setValue(
      type === "offering" ? "offeringItems" : "wantingItems",
      currentItems.filter((_, i) => i !== index)
    );
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gaming-bg">
      {/* Header */}
      <div className="border-b border-border/20 bg-gaming-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create Trade</h1>
              <p className="text-muted-foreground">Step {currentStep} of 4 - Set up your trade listing</p>
            </div>
            <Link href="/my-trades">
              <Button variant="outline" className="gaming-button-secondary" data-testid="button-back-to-trades">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Trades
              </Button>
            </Link>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Select Game */}
              {currentStep === 1 && (
                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gamepad2 className="h-5 w-5 mr-2 text-primary" />
                      Step 1: Select Game
                    </CardTitle>
                    <CardDescription>Choose which game this trade is for</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="game"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Game</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-game">
                                <SelectValue placeholder="Select a game" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="gaming-card border-border/50">
                              {GAMES.map((game) => (
                                <SelectItem key={game} value={game} data-testid={`game-option-${game}`}>
                                  {game}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!selectedGame}
                        className="gaming-button-primary"
                        data-testid="button-next-step-1"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Choose Items */}
              {currentStep === 2 && (
                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-primary" />
                      Step 2: Choose Items
                    </CardTitle>
                    <CardDescription>Add items you're offering and items you want</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Offering Items */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Items You're Offering</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={offeringInput}
                          onChange={(e) => setOfferingInput(e.target.value)}
                          placeholder="Add an item..."
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addItem("offering", offeringInput);
                            }
                          }}
                          data-testid="input-offering-item"
                        />
                        <Button
                          type="button"
                          onClick={() => addItem("offering", offeringInput)}
                          size="sm"
                          data-testid="button-add-offering"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {selectedGame && POPULAR_ITEMS[selectedGame as keyof typeof POPULAR_ITEMS] && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Popular items for {selectedGame}:</p>
                          <div className="flex flex-wrap gap-2">
                            {POPULAR_ITEMS[selectedGame as keyof typeof POPULAR_ITEMS].map((item) => (
                              <Button
                                key={item}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItem("offering", item)}
                                className="text-xs"
                                data-testid={`popular-offering-${item}`}
                              >
                                {item}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {offeringItems.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {offeringItems.map((item, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1"
                              data-testid={`offering-item-${index}`}
                            >
                              {item}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem("offering", index)}
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                data-testid={`remove-offering-${index}`}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Wanting Items */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Items You Want</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={wantingInput}
                          onChange={(e) => setWantingInput(e.target.value)}
                          placeholder="Add an item..."
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addItem("wanting", wantingInput);
                            }
                          }}
                          data-testid="input-wanting-item"
                        />
                        <Button
                          type="button"
                          onClick={() => addItem("wanting", wantingInput)}
                          size="sm"
                          data-testid="button-add-wanting"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {selectedGame && POPULAR_ITEMS[selectedGame as keyof typeof POPULAR_ITEMS] && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Popular items for {selectedGame}:</p>
                          <div className="flex flex-wrap gap-2">
                            {POPULAR_ITEMS[selectedGame as keyof typeof POPULAR_ITEMS].map((item) => (
                              <Button
                                key={item}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItem("wanting", item)}
                                className="text-xs"
                                data-testid={`popular-wanting-${item}`}
                              >
                                {item}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {wantingItems.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {wantingItems.map((item, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1"
                              data-testid={`wanting-item-${index}`}
                            >
                              {item}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem("wanting", index)}
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                data-testid={`remove-wanting-${index}`}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="gaming-button-secondary"
                        data-testid="button-prev-step-2"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={offeringItems.length === 0 || wantingItems.length === 0}
                        className="gaming-button-primary"
                        data-testid="button-next-step-2"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Add Details */}
              {currentStep === 3 && (
                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LinkIcon className="h-5 w-5 mr-2 text-primary" />
                      Step 3: Add Details
                    </CardTitle>
                    <CardDescription>Provide title, description, and server link</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trade Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Trading rare seeds for golden tools"
                              {...field}
                              data-testid="input-title"
                            />
                          </FormControl>
                          <FormDescription>
                            Make it clear what you're offering and what you want
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide more details about your trade, any special requirements, etc."
                              className="min-h-[120px]"
                              {...field}
                              data-testid="input-description"
                            />
                          </FormControl>
                          <FormDescription>
                            Add any additional information that might be helpful for potential traders
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serverLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Private Server Link (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://..."
                              {...field}
                              data-testid="input-server-link"
                            />
                          </FormControl>
                          <FormDescription>
                            If you have a private server where the trade should happen
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="gaming-button-secondary"
                        data-testid="button-prev-step-3"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="gaming-button-primary"
                        data-testid="button-next-step-3"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Review and Publish */}
              {currentStep === 4 && (
                <Card className="gaming-card border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-primary" />
                      Step 4: Review and Publish
                    </CardTitle>
                    <CardDescription>Review your trade before publishing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground">Game</h4>
                        <Badge variant="secondary">{selectedGame}</Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground">Title</h4>
                        <p className="text-muted-foreground">{form.watch("title") || "No title provided"}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground">Description</h4>
                        <p className="text-muted-foreground">{form.watch("description") || "No description provided"}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground">Items Offering</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {offeringItems.map((item, index) => (
                            <Badge key={index} variant="default">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground">Items Wanting</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {wantingItems.map((item, index) => (
                            <Badge key={index} variant="outline">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      {form.watch("serverLink") && (
                        <div>
                          <h4 className="font-semibold text-foreground">Server Link</h4>
                          <p className="text-muted-foreground break-all">{form.watch("serverLink")}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="gaming-button-secondary"
                        data-testid="button-prev-step-4"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                      </Button>
                      <div className="space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="gaming-button-secondary"
                          data-testid="button-save-draft"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Draft
                        </Button>
                        <Button
                          type="submit"
                          disabled={createTradeMutation.isPending}
                          className="gaming-button-primary"
                          data-testid="button-publish-trade"
                        >
                          {createTradeMutation.isPending ? (
                            <>
                              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                              Publishing...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Publish Trade
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}