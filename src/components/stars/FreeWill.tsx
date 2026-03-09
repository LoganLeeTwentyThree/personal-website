import "../../styles/global.css"

import StarPanel from "./StarPanel";

const COLOR = "#daeb78"; 
interface Props {
  onClose: () => void;
}

export default function FreeWill({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Free Will" role="Are We Really'Free'?" onClose={onClose}>
      <div id="body">
            <h1>Free Will</h1>
            <p>Free Will is a strange topic to me. It seems that most people, and society at large, take the existence of free will to be a fundamental fact of the universe, like gravity. Why? What does it even mean to have a "free" will?</p>
            <p>I was one of those people for a while, until I heard the following line somewhere:</p>
            <h2><i>When you hear an argument, it either does or doesn't make sense to you. Nowhere do you choose for it to make sense</i></h2>
            <p>How did I, a supposedly free agent, find this convincing? I certainly didn't choose to. From there, it seemed like nothing is free. If you aren't making a choice at the point where your will would be most free, taking a position on a certain argument, then how could you be free in other ways?</p>
            <p>This really wasn't enough to break my faith in free will. It was another argument I heard that truly stripped it from me. I call it the logical argument, and it goes as follows:</p>
            <ol>
                <li>Everything you do in your life, you do because you are either forced to, or because you want to.</li>
                <li>When you are forced to do something, free will isn't involved (obviously).</li>
                <li>When you want something, you never choose to want it, you just do or don't.</li>
                <li>So you didn't choose to do something when your forced to do it, and you didn't choose to do something when you want to do it, so when did you choose?</li>
            </ol>
            <p>There are some common objections that I will address here.</p>
            <h2>I don't <i>want</i> to go to the gym, but I do!</h2>
            <p>This is an objection to the first step of the argument. This seems like an action that is done neither because you wanted, or because you were forced to. But then, I ask, why did you go to the gym? Generally, its because you <i>want</i> to stay healthy. This want, for whatever reason, has more sway on you than your want to stay home and bedrot.</p>
            <p>Think about it though. Is it possible to do something you don't want do in any way? I don't think so! Even if you heard that and immediately decided to eat feces to prove me wrong, you did it because you wanted to prove me wrong! I challenge you to imagine a scenario where you do something you in no possible way want and aren't forced to do.</p>
            <h2>Maybe you can't choose your wants, but <i>I</i> can.</h2>
            <p>There are different layers of wants. A very superficial want, like wanting to buy pokemon cards, can seemingly be "chosen" to be wanted. Here is my challenge to you. If you can choose your wants so freely, choose to want to do something you don't want to do on a fundamental level. Choose right now to want to kill your parents, or run around naked in public, or eat feces. Sounds kind of hard!</p>
            <p>"Aha!", you say to me, in between mouthfuls of dung, "I chose to want to do this! You lose!". Why did you do that? Was it because you <i>wanted</i> to prove me wrong, and that want was greater than your want to not eat feces? I say yes.</p>
            <h2>I did choose to want it, just not consciously.</h2>
            <p>Some have said that their subconscious is choosing their wants, and that their subconscious is still "them", therefore, they are choosing their wants. So, consciously, you have no free will? Only your subconscious does? What even is a subconscious in this scenario? It seems like we might even agree, its just that I see "subconscious" as uncontrollable biologicial insitncts, and you don't. I want to dig into this deeper, but to do that I think we need to effectively define free will.</p>
            <h2>What actually is free will?</h2>
            <p>I see free will as "the ability to have done differently". A free agent picks option A, but rewind the scenario and the free agent might make the choice to pick option B. Here is a question I like to ask myself at this point: does anything else in the universe behave this way?</p>
            <p>No (except quantum mechanics, see later section).</p>
            <p>We live in a deterministic universe. At the very least, everything <i>except</i> humans is deterministic. The present is determined by the past. To get from the past to the present, simply apply the set of all physical laws to the past. If you read my write-up on layers of abstraction, you may be reminded of Laplace's Demon. Go read that for a summary, if you haven't already.</p>
            <p>The universe is very complicated, so lets make it simpler. I want to use Conway's Game of Life as a way to describe determinism, then I will try to tie it back to free will.</p>
            <h2>The Game of Life</h2>
            <p>Conway's Game of Life is a simple program that, given an arbitrarily large grid of empty and filled spaced, executes a set of rules on them. The specific rules aren't too important, but there are 4 of them. Here is an example of the game of life in action:</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif"/>
            <p>Look at the complexity that arrives from 4 simple rules being applied to a grid. This is a pattern called "Gosper's glider gun", and it produces those things trailing off the screen, called gliders. What is important about this is that this exact configuration is produced only and always by its specific starting point. This is why Conway's Game of Life is deterministic.</p>
            <p>How does this relate to free will? To me, it seems like a free willer would look at this and say, "ah, those funny squares, they are freely willing to work together to make gliders". Tell them about the 4 rules, and they will have no choice to back down, because they are rational humans, like us. Well that's good; we can convince a free willer that squares on a grid don't have it. Great. How come then, when the grid is three dimensional, and there are thousands of thousands of rules, they aren't convinced?</p>
            <p>We (humans) are slowly uncovering the rules of our game of life, and they still insist that one of them is free will. It is unable to make predictions, of course, and has no bearing on the outcome of situations. But it is there, because it <i>feels</i> like it.</p>
            <h2>Why does it feel like that</h2>
            <p>Imagine the year is 2000 BCE and you see a comet fly through the sky. What would you think? Would you think "Ah, due to gravity and thermodynamics, this comet appears in that spot every 12 years." Seems unlikely. What you would probably think, and what ancient people did think, was that they were a message from the gods. Ostensibly, comets were caused by the "free will" of the gods. You can't blame ancient people for this! There are so many incredibly complex factors that caused the comet to be there that it makes more intuitive sense, <i>espcecially</i> to someone before the enlightenment, that the gods put it there.</p>
            <p>Imagine showing one of those ancient people Conway's Game of Life. What would they think? Rather, what is more likely that they would think?</p>
            <ol>
                <li>A set of four rules are programatically being applied to these squares that determine what happens each frame, or</li>
                <li>The squares are alive, or inbued with some essence, that causes them to move freely</li>
            </ol>
            <p>I think option two is much more likely, because ancient peoples simply knew less about how the deterministic world worked. To be fair, I'm sure a particularly bright ancient mind could figure it out, but thats besides my point. My point is this: knowing less about how a system works, its rules, causes humans to be more likely to attribute its workings to "free will".</p>
            <p>Weather, Diseases, Creation. All of these things were once attributed to free will, and now aren't because we know more rules about the world. My position is that this will continue on, maybe indefinitely.</p>
            <h2>Yes, the natural world is deterministic, but why should humans be?</h2>
            <p>Many significant social changes have occurred in the past 100 or so years. A major one has been the relative improvement of the treatment and acceptance of people with mental illnesses, at least in the west. Why has this happened? Scientists have spent decades studying how the brain works, and have found specific patterns that we call mental illness. Now when someone has autism or adhd, we don't blame them for it. Closely following this social advancement, gay people have also found acceptance in western society. No longer are they perverts or freaks who "chose" to be that way. They simply are that way. It was out of their control.</p>
            <p>How can this be? So it is not only possible, but socially expected, that <i>some</i> people's lived experiences are completely altered, or even determined, by things outside of their control? Not only this, but why do free willers accept this? Just a short century ago, autistic people and people with adhd were seen as "choosing" to be that way. Why aren't free willers campaigning to bring <i>that</i> back? Because we have shown them the rules. We have peeled back the curtain on part of reality and found no free will, and thus free willers are forced to retreat ever further.</p>
            <p>As we peer further and further past the veil, is it really reasonable that we will find free will eventually? I don't think so. I believe that the pattern will continue: we will uncover more and more rules to the game of life, and free willers will keep having to retreat. It is very reminiscent of the "god of the gaps" fallacy. People often take something science hasn't explained and say "ah surely this is God's doing"; science explains it, and suddenly God wasn't there, she was somewhere else entirely, where science hasn't explained yet.</p>
            <h2>Does Quantum Indeterminacy Save Free Will?</h2>
            <p>I have thus far been very adamant on the deterministic nature of the universe, but there lurks a sinister undercurrent in the deepest layer of reality: Quantum Indeterminacy. At a quantum level, particles blip in and out of existence randomly! The past existence of quantum particles has no bearing on the present or future of those same particles. Could this be the mechanism of free will?</p>
            <p>Not really. Lets say that somehow, even though the randomness of quantum particles dissapears as you move up layers of reality, your brain has a mechanism for tapping into the randomness of the quantum particles to help make decisions. Free will! Sort of. This satisfies the previous definition of free will: you actually could have done differently! Yet, if your actions are randomly decided by quantum particles, what kind of freedom is that? Your actions are still being determined by the physical world, not you. It seems like we just kicked the can down the road a little bit, rather than definitively established "free" will.</p>
            <h2>Conclusion</h2>
            <p>I have sounded very confident throughout this write-up, but the truth is I don't think I actually know the absolute truth. Shocker, I know. The only hardline stance I can take is that libertarian free will is non-sensical. What remains is pure determinism, and compatibilism (determinism and free will are compatible). What I do know is this: we live in a deterministic universe, and humans are part of and composed of that universe. Therefore, humans are deterministic, and free will isn't a factor.</p>
        </div>

      
    </StarPanel>
  );
}
