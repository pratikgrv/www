import * as runtime from 'react/jsx-runtime';

// Parse compiled MDX code dynamically
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}

export const MDXContent = ({ code, components }: MDXContentProps) => {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
};
