import StarPanel, { Intro, SectionLabel, HighlightGrid, Callout, TagRow } from "./StarPanel";

const COLOR = "#aad4ff";

interface Props {
  onClose: () => void;
}

export default function MTG({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Magic: The Gathering" role="The Greatest Game" onClose={onClose}>
      <Intro>
        I spend a lot of time playing and making MTG. I fell in love with MTG because of its
        rules system; everything fits neatly into a (mostly) eloquent system. Sound familiar?
      </Intro>

      <SectionLabel>What I love about it</SectionLabel>
      <HighlightGrid color={COLOR} items={["Rules Mastery", "Commander", "Card Design", "Competitive Play"]} />

      <Callout color={COLOR}>
        It's Lightning Helix!
      </Callout>

      <TagRow tags={["Logic", "Communication", "Creativity"]} />
    </StarPanel>
  );
}
