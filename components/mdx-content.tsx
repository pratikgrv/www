import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import { posts } from "@/.velite";

interface MDXContentProps {
  code: string;
  components?: MDXComponents;
}

// Compile trusted local posts once, outside React's render lifecycle.
const compiledPosts = new Map(
  posts.map((post) => {
    const compiled = new Function(post.body)({ ...runtime }) as {
      default: ComponentType<{ components?: MDXComponents }>;
    };
    return [post.body, compiled.default] as const;
  }),
);

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = compiledPosts.get(code);
  if (!Component) throw new Error("Post content was not compiled by Velite.");
  // This is a lookup of a stable component compiled at module scope, not a render-time factory.
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />;
}
