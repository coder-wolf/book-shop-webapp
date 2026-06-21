
---

# Product Requirement Document (PRD): Online Book Shop

## 1. Overview

A lean, high-performance web application that allows users to browse books, manage a shopping cart, save favorites, and place orders. The focus is on a seamless user experience paired with a highly relational, reliable data architecture.

---

## 2. User Personas

* **Customer:** Browses the catalog, filters by tags/categories, manages a cart/wishlist, and completes checkouts.
* **Admin:** Manages inventory, tags, categories, and monitors order fulfillment.

---

## 3. Core Features & Scope

### 3.1 User Authentication & Profile

* **Sign Up / Login:** Secure authentication using email and hashed passwords.
* **Favorites (Wishlist):** Users can save books to their personal dashboard for future consideration.

### 3.2 Catalog & Discovery

* **Dynamic Categorization:** Books can belong to multiple categories and tags simultaneously (Many-to-Many).
* **Inventory Management:** Tracks book details (title, description, author, price) and real-time stock quantities.

### 3.3 Cart & Checkout Lifecycle

* **Shopping Cart:** Users add books to a persistent cart and adjust quantities.
* **Order Creation (Snapshotting):** Upon checkout, the system freezes the purchased items, their quantities, and the exact purchase prices to preserve historical sales records against future inventory or price changes.
* **Cart Lifecycle:** The user's active cart is completely cleared immediately following a successful order placement.

---

## 4. System Architecture & Data Model

The database layer follows the relational structure mapped out in `Screenshot 2026-06-22 at 1.44.16 AM.jpg`.

```
               [ User ]
                │    │
         ┌──────┘    └──────┐
         ▼                  ▼
     [ Cart ]          [ Order ] ──► [ OrderItem (Snapshot) ]
         │                  │                     │
         ▼                  ▼                     │
    [ CartItem ] ────►  [ Book ] ◄────────────────┘
                        │    │
         ┌────── Circa ─┘    └─ Many-to-Many ┐
         ▼                                   ▼
[ bookCategoryJunction ]           [ bookTagConnection ]
         │                                   │
         ▼                                   ▼
  [ bookCategory ]                       [ bookTag ]

```

### Key Schema Finalizations

* **Data Types:** Primary keys across all entities use `uuid`. Financial values utilize the `numeric` type to eliminate floating-point rounding errors.
* **Self-Correction Check:** Ensure `cartItem.quantity` is explicitly cast as an `integer` and `bookCategoryJunction.bookCategoryJunctionId` uses `uuid` during migration generation.

---

## 5. Non-Functional Requirements

* **Data Integrity:** Strict cascading rules and transactional safety during checkout (ensuring order creation and cart clearing succeed or fail together).
* **Performance:** Optimized indexing on junction tables (`bookCategoryJunction`, `bookTagConnection`) to ensure lightning-fast catalog filtering.

---

What framework stack are you planning to pair with this database for the backend?