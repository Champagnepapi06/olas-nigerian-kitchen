import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center animate-fade-in">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Add some delicious dishes to get started!
            </p>
            <Link to="/menu">
              <Button size="lg">Browse Menu</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 animate-fade-in">Shopping Cart</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="animate-slide-up hover-lift">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          ₦{item.price.toLocaleString()} each
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Price and Remove */}
                      <div className="text-right space-y-4">
                        <p className="font-bold text-lg">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 animate-scale-in">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₦{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>₦500</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-primary">
                          ₦{(getTotalPrice() + 500).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Link to="/menu">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
