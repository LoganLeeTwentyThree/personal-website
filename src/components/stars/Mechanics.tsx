import "../../styles/global.css"

import StarPanel from "./StarPanel";

const COLOR = "#4bf0ab";

interface Props {
  onClose: () => void;
}

export default function Mechanics({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Mechanics" role="Flying, Flanking, ...Horsemanship" onClose={onClose}>
      
    <div id="body">
        <p>Mechanics is a bit of a vague term. For this article I am talking specifically about new <b>keywords</b> and <b>ability words</b> , as well as <b>keyword actions</b>.</p>        
        <h2>The Contract</h2>
        <p>Every new set inevitably comes with a suite of new mechanics. Some mechanics are amazing, some are useful for the set's draft environment, some are forgettable, and some are bad. What seperates mechanics into these categories? To understand that, we must first understand what a mechanic is.</p>
        <p>Each mechanic in Magic: the Gathering is actually a contract. The mechanic promises the player that they will be rewarded for committing its definition to memory. Knowing the shorthand of "flying" rewards players very often. Instead of "this creature can only be blocked by other creatures with flying", players get to just say "flying". Players agree to the contract by memorizing the meaning of the mechanic, and they are promised: you will have an easier and more fun time playing by knowing this.</p>
        <h2>Violating the Contract</h2>
        <p>Unfortunately, a design trend in Magic is to violate this contract. Many, many mechanics release that are never used again. Players hold up their end of the contract: they memorize the mechanic, but they aren't rewarded. The game itself violates its side of the contract. Lets look at some examples of this.</p>
        <h3>Spree and Spree-Likes</h3>
        <p>Spree is a great mechanic. When it released in Outlaws of Thunder Junction, I thought "this is a really versatile and fun mechanic, I hope it comes back." Imagine my sadness when, two years later, we still have no cards with spree. Many such mechanics face this exact fate. These are all fun mechanics with a considerable amount of design space that were created and quickly discarded, to the detriment of the game as a whole. Why should I bother with my end of the contract? Learning these mechanics will be helpful for limited, but if there's only ever one good card with Harmonize, what's the point of keywording it? Its a shame that these mechanics will likely be relegated to the past. However, there are worse cases.</p>
        <h4>Offenders</h4>
        <ul>
            <li>Plot</li>
            <li>Endure</li>
            <li>Harmonize</li>
            <li>Renew</li>
            <li>Tiered</li>
            <li>Expend</li>
            <li>Craft</li>
            <li>Battles</li>
        </ul>
        <h3>Collect Evidence and its Friends</h3>
        <p>Collect Evidence is an ok mechanic. Its a mechanic that was probably made to make the Murders at Karlov Manor limited environment work, and thats ok. Unfortunately, collect evidence will never, ever be printed on another Magic: the Gathering card due to its name (don't quote me on this). When mechanic names are tied so tightly to their set's flavor, they violate the contract by default. Just as with the spree-likes, it unneccesarily complicates gameplay with little to no reward.</p>
        <h4>Offenders</h4>
        <ul>
            <li>Earth/Air/Fire/Water bending (All good mechanics on their own...)</li>
            <li>Map/Mutagen/Blood Tokens</li>
            <li>Bargain</li>
            <li>Web-slinging (:/)</li>
            <li>Crime</li>
            <li>Revolt</li>
        </ul>
        <h3>The Worst of the Worst</h3>
        <p>Some times, the contract gets violated in a way that is particularly egregious. When a new mechanic comes out thats a "fixed" version of an older one, it shreds the contract to bits. Take Discover, which is a "fixed" version of Cascade. It has some very slight differences, but does practically the same thing. Say there is a really exciting Discover card, like Trumpeting Carnosaur, that I want to put in my Cascade deck, like Averna, the Chaos Bloom. This card specifically calls out CASCADE, and not DISCOVER. I as a player will feel betrayed. I like the mechanic, I built a deck around it, I look for cards that work well with it..... and they replace the mechanic with discover. Why bother?</p>
        <p>There is an exception to this. Sneak, from TMNT, is a "fixed" version of ninjitsu, which would have fallen into the previous category. With sneak, not only does it have some great changes, but the name is more generic too. Any set that wants it can have Sneak. Very few sets can use ninjitsu. Additionally, very few cards call out ninjitsu specifically, which helps sneak's case.</p>
        <h4>Offenders</h4>
        <ul>
            <li>Mayhem</li>
            <li>Dissapear</li>
        </ul>
        <h2>Conclusion</h2>
        <p>Mechanics should give players something to be excited about, and often times they do! So why do we dangle this carrot in front of player's faces and then throw it into the sea? Players trust the designers, but that trust gets violated when they feel lied to.</p>
    </div>
    </StarPanel>
  );
}
