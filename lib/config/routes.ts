export type RouteAccess = 'public' | 'auth' | 'guest-only';

interface RouteConfig {
  pattern: string | RegExp;
  access: RouteAccess;
  redirectTo?: string;
}

export const routeConfig: RouteConfig[] = [
  // Public routes - anyone can access
  { pattern: '/', access: 'public' },
  { pattern: '/wiki', access: 'public' },
  { pattern: /^\/wiki\/.*/, access: 'public' },
  { pattern: '/support', access: 'public' },
  { pattern: /^\/support\/.*/, access: 'public' },

  // Auth routes - only for non-authenticated users
  { pattern: '/login', access: 'guest-only', redirectTo: '/wiki' },
  { pattern: '/signup', access: 'guest-only', redirectTo: '/wiki' },
  { pattern: '/reset-password', access: 'guest-only', redirectTo: '/wiki' },

  // Protected routes - require authentication
  { pattern: '/coach', access: 'auth', redirectTo: '/login' },
  { pattern: '/assess', access: 'auth', redirectTo: '/login' },
  { pattern: /^\/assess\/.*/, access: 'auth', redirectTo: '/login' },
  { pattern: '/progress', access: 'auth', redirectTo: '/login' },
  { pattern: '/settings', access: 'auth', redirectTo: '/login' },
  { pattern: /^\/settings\/.*/, access: 'auth', redirectTo: '/login' },
];

export function getRouteAccess(pathname: string): RouteConfig | undefined {
  return routeConfig.find(route => {
    if (typeof route.pattern === 'string') {
      return route.pattern === pathname;
    }
    return route.pattern.test(pathname);
  });
}

export function isProtectedRoute(pathname: string): boolean {
  const config = getRouteAccess(pathname);
  return config?.access === 'auth';
}

export function isGuestOnlyRoute(pathname: string): boolean {
  const config = getRouteAccess(pathname);
  return config?.access === 'guest-only';
}
