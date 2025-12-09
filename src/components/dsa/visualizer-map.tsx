import { SortingVisualizer } from "@/components/dsa/sorting-visualizer";

export const VISUALIZER_MAP: Record<string, React.ComponentType> = {
  "implement-bubble-sort": SortingVisualizer,
  // Add more mappings here as we implement them
  // "implement-binary-search": BinarySearchVisualizer,
};
