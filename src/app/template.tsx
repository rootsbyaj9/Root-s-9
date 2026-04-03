import TransitionWrapper from "@/components/layout/TransitionWrapper";

/**
 * template.tsx
 * 
 * Unlike layout.tsx which persists across routes, template.tsx creates a new instance 
 * for each of its children on navigation. This means that when a user navigates between routes,
 * a new instance of the template is mounted securely throwing the Lottie page loading transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <TransitionWrapper>{children}</TransitionWrapper>;
}
