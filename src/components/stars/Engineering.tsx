import StarPanel, { Intro, SectionLabel, HighlightGrid, Callout, TagRow } from "./StarPanel";

const COLOR = "#97d0f9";

interface Props {
  onClose: () => void;
}

export default function Engineering({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Software Engineering" role="Full-Stack Development" onClose={onClose}>
      <Intro>
        I strive to write code that is both easily maintainable and extensible.
        I want to create systems that account for future problems.
      </Intro>

      <SectionLabel>What I focus on</SectionLabel>
      <HighlightGrid color={COLOR} items={["React / TypeScript", "Node & APIs", "System Architecture", "Performance"]} />

      <Callout color={COLOR}>
        A user with this password already exists!
      </Callout>

      <TagRow tags={["React", "Node.js", "MongoDB", "AWS", "Typescript", "AI", "Next.js", "Tailwind"]} />
    </StarPanel>
  );
}
