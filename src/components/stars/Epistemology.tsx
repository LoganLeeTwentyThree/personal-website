import StarPanel, { Intro, SectionLabel, HighlightGrid, Callout, TagRow } from "./StarPanel";

const COLOR = "#e8b89a"; // slightly desaturated from philosophy's #faa27f

interface Props {
  onClose: () => void;
}

export default function Epistemology({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Epistemology" role="Theory of Knowledge" onClose={onClose}>
      <Intro>
        How do we know what we know? Epistemology is the branch of philosophy I keep
        returning to — it underpins everything from how we evaluate arguments to why
        scientific consensus matters. I find it impossible to think clearly about anything
        without some account of how beliefs get justified.
      </Intro>

      <SectionLabel>Questions I sit with</SectionLabel>
      <HighlightGrid color={COLOR} items={[
        "What counts as justification?",
        "Is knowledge just true belief?",
        "The Gettier problem",
        "Foundationalism vs. Coherentism",
      ]} />

      <Callout color={COLOR}>
        The lamp of experience is the only light we have — and yet we argue constantly
        about what it illuminates.
      </Callout>

      <TagRow tags={["Justified True Belief", "Reliabilism", "Gettier", "Skepticism"]} />
    </StarPanel>
  );
}
