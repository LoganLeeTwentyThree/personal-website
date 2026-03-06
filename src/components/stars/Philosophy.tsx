import StarPanel, { Intro, SectionLabel, HighlightGrid, Callout, TagRow } from "./StarPanel";

const COLOR = "#faa27f";

interface Props {
  onClose: () => void;
}

export default function Philosophy({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Philosophy" role="Mind, Meta-Ethics" onClose={onClose}>
      <Intro>
        I find philosophy to be a very exciting subject area. Asking big, important questions
        with uncertain answers is profoundly meaningful to me.
      </Intro>

      <SectionLabel>Areas of interest</SectionLabel>
      <HighlightGrid color={COLOR} items={["Non-cognitivism", "Panpsychism", "Utilitarianism", "Continental"]} />

      <Callout color={COLOR}>
        For there to be doubt, there must be a doubter
      </Callout>

      <TagRow tags={["Formal Logic", "Propositions", "Communication", "Abstract Thinking"]} />
    </StarPanel>
  );
}
