-- Add UPDATE policy for orders to allow users to cancel their own orders
-- Note: Status changes like "preparing", "delivered" should only be done by backend/admin
CREATE POLICY "Users can update their own orders" 
ON public.orders 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add UPDATE policy for order_items (only for items in user's own orders)
CREATE POLICY "Users can update items in their own orders" 
ON public.order_items 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));

-- Add DELETE policy for order_items (only for items in user's own orders)
CREATE POLICY "Users can delete items from their own orders" 
ON public.order_items 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));