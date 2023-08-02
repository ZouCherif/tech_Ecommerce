1. User Authentication and Authorization:
   User registration and login
   User roles (customer, admin) with different access permissions
   User profile with account settings and order history

2. Product Management:
   Create, update, and delete clothing products (admin)
   Product categories and subcategories
   Product attributes (size, color, material, etc.)

3. Product Browsing and Searching:
   Display products with images, names, and prices
   Filtering by category, size, color, etc.
   Search functionality to find specific products
4. Product Detail Page:
   Detailed product information (description, specifications)
   Product reviews and ratings 5. Shopping Cart and Checkout:

5. Add products to the cart
   Modify cart items (quantity, remove items)
   Apply coupon codes and discounts (if applicable)
   Checkout process with shipping and billing details

6. Order Management:
   Order confirmation and email notifications
   Order history and status tracking for users
   Order management and fulfillment (admin)

7. User Reviews and Ratings:
   Allow users to leave reviews and rate products
   Display average product ratings and reviews on product pages

8. User Wishlist:
   Allow users to add products to their wishlist for future reference

9. Social Sharing and Interaction:
   Social media sharing buttons for products
   Social login options (e.g., Google, Facebook)

10. Search Engine Optimization (SEO):
    SEO-friendly URLs and meta tags
    Sitemap submission to search engines

11. Mobile Responsiveness:
    Ensure the website is fully responsive and optimized for mobile devices

12. Security and Privacy:

Secure password hashing
HTTPS implementation for secure data transmission
Protecting sensitive user information

13. Payment Integration:

Integration with secure payment gateways (e.g., Stripe, PayPal)

14. Analytics and Reporting:

Integration with analytics tools for monitoring website traffic and user behavior

15. Admin Panel:

Admin dashboard for managing products, orders, and users

16. Error Handling and Validation:

Proper error handling and validation for user inputs

17. Customer Support:

Provide contact information and customer support channels

18. Terms of Service and Privacy Policy:

Display clear terms of service and privacy policy for users to review

////////////////////////////////

1. User Authentication and Authorization:

POST /api/users/register: Register a new user.
POST /api/users/login: User login to obtain a JWT token.
GET /api/users/me: Get the current user's profile (protected route with JWT authentication).
PUT /api/users/me: Update the current user's profile (protected route with JWT authentication).

2. Product Management:

GET /api/products: Get all clothing products.
GET /api/products/:productId: Get details of a specific product.
POST /api/products: Create a new clothing product (admin only, protected route).
PUT /api/products/:productId: Update an existing product (admin only, protected route).
DELETE /api/products/:productId: Delete a product (admin only, protected route).

3. Shopping Cart and Checkout:

GET /api/cart: Get the current user's shopping cart (protected route with JWT authentication).
POST /api/cart: Add a product to the shopping cart (protected route with JWT authentication).
PUT /api/cart/:cartItemId: Update the quantity of a cart item (protected route with JWT authentication).
DELETE /api/cart/:cartItemId: Remove a cart item (protected route with JWT authentication).
POST /api/checkout: Process the checkout and place an order (protected route with JWT authentication).

4. Order Management:

GET /api/orders: Get all orders for the current user (protected route with JWT authentication).
GET /api/orders/:orderId: Get details of a specific order (protected route with JWT authentication).
GET /api/admin/orders: Get all orders (admin only, protected route).
PUT /api/admin/orders/:orderId: Update the status of an order (admin only, protected route).

5. User Reviews and Ratings:

POST /api/products/:productId/reviews: Add a review and rating for a product (protected route with JWT authentication).

obligatory funtionalities:
Cart
orders
wishlist
images upload
password reset, email verification, and handling user account deletion.
sending email confirmation when order is placed

additional functionalities:
pegination
sorting products
Reviews and Ratings

tasks:
dont forget to return delay of acces token to 15min
delete profile apis or not?
