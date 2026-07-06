import { activeVersion } from "../portfolio-data";
import HomeV1 from "../versions/v1";

const designVersions: Record<string, React.ComponentType> = {
  v1: HomeV1,
};

export default function Home() {
  const ActiveLayout = designVersions[activeVersion] || HomeV1;
  return <ActiveLayout />;
}
