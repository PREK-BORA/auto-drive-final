<!-- ============================================================ -->
<!-- Routes Structure Documentation -->
<!-- ============================================================ -->

# Routes Structure

This directory contains all route-related configurations and utilities for the application.

## Directory Structure

```
routes/
  ├── index.js              # Centralized exports for all route utilities
  ├── routeConfig.js        # Route definitions and configurations
  ├── routeRenderer.jsx     # Helper functions for rendering routes
  ├── ProtectedRoute.jsx    # Guard for authenticated routes
  ├── AdminRoute.jsx        # Guard for admin-only routes
  └── README.md             # This file
```

## Files Overview

### `routeConfig.js`

Centralized route definitions organized by type:

- **PUBLIC_ROUTES**: Accessible to all users (uses PublicLayout with navbar + footer)
- **AUTH_ROUTES**: Standalone auth pages (no navbar/sidebar)
- **PROTECTED_ROUTES**: User dashboard routes (requires authentication)
- **ADMIN_ROUTES**: Admin dashboard routes (requires admin privileges)

Each route object contains:

```javascript
{
  path: '/route-path',
  element: ComponentName,    // React component
  label: 'Display Label'      // Used for navigation/breadcrumbs
}
```

### `routeRenderer.jsx`

Helper functions to render routes based on configuration:

- `renderLayoutRouteGroup(Layout, routes)` - Renders routes with a layout (no guard)
- `renderGuardedRouteGroup(Guard, Layout, routes)` - Renders routes with both guard and layout

### `ProtectedRoute.jsx`

Guard component that:

- Checks if user is authenticated
- Shows loading spinner while checking auth
- Redirects to login if not authenticated
- Renders child routes if authenticated

### `AdminRoute.jsx`

Guard component that:

- Checks if user is authenticated AND has admin privileges
- Shows loading spinner while checking permissions
- Redirects to login if not authenticated
- Redirects to user dashboard if not admin
- Renders child routes if user is admin

## Usage in App.jsx

```jsx
import {
  ROUTE_GROUPS,
  renderLayoutRouteGroup,
  renderGuardedRouteGroup,
} from "./routes";

export default function App() {
  const publicGroup = ROUTE_GROUPS.public;
  const authGroup = ROUTE_GROUPS.auth;
  const protectedGroup = ROUTE_GROUPS.protected;
  const adminGroup = ROUTE_GROUPS.admin;

  return (
    <BrowserRouter>
      <Routes>
        {renderLayoutRouteGroup(publicGroup.layout, publicGroup.routes)}
        {renderGuardedRouteGroup(authGroup.guard, authGroup.layout, authGroup.routes)}
        {renderGuardedRouteGroup(
          protectedGroup.guard,
          protectedGroup.layout,
          protectedGroup.routes,
        )}
        {renderGuardedRouteGroup(
          adminGroup.guard,
          adminGroup.layout,
          adminGroup.routes,
        )}
      </Routes>
    </BrowserRouter>
  );
}
```

## Adding New Routes

### To add a new public route:

1. Add route object to `PUBLIC_ROUTES` in `routeConfig.js`:

```javascript
{
  path: '/new-page',
  element: NewPageComponent,
  label: 'New Page'
}
```

2. Import the component at the top of `routeConfig.js`
3. Routes will automatically be rendered through `renderLayoutRouteGroup()`

### To add a new dashboard route:

1. Add route object to `PROTECTED_ROUTES` in `routeConfig.js`
2. Import the component
3. Route will be protected by `ProtectedRoute` guard automatically

### To add a new admin route:

1. Add route object to `ADMIN_ROUTES` in `routeConfig.js`
2. Import the component
3. Route will be protected by `AdminRoute` guard automatically

## Benefits of This Structure

✅ **Centralized Configuration** - All routes defined in one place
✅ **DRY Code** - No repetitive route JSX in App.jsx
✅ **Easy Maintenance** - Add/remove routes without editing App.jsx
✅ **Clear Organization** - Routes grouped by type (public, auth, protected, admin)
✅ **Scalability** - Easily add new route types or guards
✅ **Consistency** - All routes use the same pattern and structure
✅ **Documentation** - Each route has a label for navigation/breadcrumbs

## Route Hierarchy

```
App
├── Public Routes (PublicLayout: navbar + footer)
│   ├── /
│   ├── /about
│   ├── /services
│   ├── /vehicles
│   ├── /vehicles/:id
│   └── /contact
├── Auth Routes (Standalone, no layout)
│   ├── /login
│   ├── /register
│   └── /forgot-password
├── ProtectedRoute (Guard)
│   └── UserDashboardLayout
│       ├── /dashboard
│       ├── /dashboard/favorites
│       ├── /dashboard/bookings
│       └── /dashboard/password
└── AdminRoute (Guard)
    └── AdminDashboardLayout
        ├── /admin
        ├── /admin/vehicles
        ├── /admin/services
        ├── /admin/users
        └── /admin/messages
```

## Notes

- **Loading States**: Both guard components show a loading spinner while checking auth/permissions
- **Redirects**: Failed auth checks automatically redirect to appropriate pages
- **Layouts**: Each route type has an associated layout (or no layout for standalone routes)
- **Route Labels**: Labels are intended for navigation menus, breadcrumbs, and sidebar navigation
