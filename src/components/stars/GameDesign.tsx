import StarPanel, { Intro, SectionLabel, HighlightGrid, Callout, TagRow } from "./StarPanel";

const COLOR = "#ffb877";

interface Props {
  onClose: () => void;
}

export default function GameDesign({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Game Design" role="Game Development" onClose={onClose}>
      <Intro>
        Games have been a huge part of my life. From Magic: the Gathering to League of Legends,
        I love the challenges that playing them presents. That love has led me to build several
        games myself.
      </Intro>

      <SectionLabel>What I focus on</SectionLabel>
      <HighlightGrid color={COLOR} items={["Card Games", "Prototyping", "Rogue-lites", "Extensible Systems"]} />

      <Callout color={COLOR}>
        Make games you want to play. The rest will follow.
      </Callout>

      <TagRow tags={["Unity", "C#", "Web Games", "Typescript"]} />
    </StarPanel>
  );
}
