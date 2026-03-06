import "../../styles/global.css"

import StarPanel from "./StarPanel";

const COLOR = "#78eb91"; // slightly desaturated from philosophy's #faa27f

interface Props {
  onClose: () => void;
}

export default function Ethics({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Ethics" role="What We Ought To Do" onClose={onClose}>
      <div id="body">
            <h1>Ethics</h1>
            <p>Hello. You might remember (probably not) this page had some other text long ago in the past. I have spent a lot of time thinking and learning about ethics since then and I have more informed things to say.</p>
            <p>Ethics is fundamentally the field of philosophy that tries to answer the question "What should we do?". Many people have thought very hard about this question since the beginning of time, but luckily I have come along to settle the issue. The ethical systsem I find most conforms to my moral intuitions is utilitarianism.</p>
            <p>Alright everyone, you can go home now. The issue is settled.</p>
            <h2>Ethics is Settled!</h2>
            <p>I find that many people will have the gall to disagree with me on which ethical system is the best. They might say, "It can't be utilitarianism because on utilitarianism we have a moral obligation to do this thing which I intuit as bad!".</p>
            <p>Herein lies the <i>actually interesting</i> part. Intuituions in other areas can be wrong all the time, why should ethics be any different? When I intuit that the earth seems flat, my intuition is wrong. The same can be true about when I think that abortion is wrong or right.</p>
            <h2>Meta-ethics or "What is it that we are actually Intuiting?"</h2>
            <p>In the case of the shape of the earth, there is an objective (or as philosophers say "mind-independent") fact that the earth is a certain shape. My intuitions then can be compared against this objective fact: they are wrong if they disagree, and right otherwise. Conventional wisdom, however, says that there are no objective facts in morality. The vast majority of people I've asked have agreed with this statement. So... what am I intuiting?</p>
            <p>This is the central question of meta-ethics (as I understand it).</p>
            <h2>Subjectivism</h2>
            <p>I was also once a subjectivist, but I have encountered problems with the philosophy that I find troubling.</p>
            <p>Subjectivism says that there are no objective moral facts, and that when someone says that action X is good, they are basically saying "I approve of X"  (which can be true or false, for the record). This, intuitively, seems uncontroversial actually. It explains why there is so much moral disagreement among disperate societies, and why individual people might disagree on moral things all the time.</p>
            <h3>But what are we disagreeing about?</h3>
            <p>The problem arises mainly when you consider moral disagreement, which at least <i>seems</i> to occur. If Alice says that ritual child sacrifice is good, she's just saying "I approve of ritual child sacrifice". If Bob says that ritual child sacrifice is bad, he's just saying "I disapprove of ritual child sacrifice". Bob is horrified by Alice's proposal... but how can he meaninguflly disagree with her? They've both said things that are true, which is just a report of their feelings.</p>
            <p>So when Bob tries to convince Alice that ritual child sacrifice is bad, he's simply just wrong. He's effectively trying to tell her that she doesn't approve of it, even though she does. You might think, "well, what he's trying to say is that 'You shouldn't approve of ritual child sacrifice'", but what grounds would he have to prove this, if good and bad are simply matters of personal approval/disaproval?</p>
            <h4>Shared Values</h4>
            <p>Bob could try to appeal to some values that he knows Alice holds. If she values human life, he could perhaps argue convincingly that she really shouldn't approve of ritual child sacrifice. Hooray, we've saved subjectivism.</p>
            <p>Not really. Alice doesn't value human life, or any sort of value that would say that ritual child sacrifice is bad. In fact, she has thought long and hard about the implications of the things she values, and ritual child sacrifice lines up with all of them. Yet, I can confidantly say that the vast majority of people not only would say that Alice is a bad person (they dissaprove of her), but that her values must be in some sense wrong. This isn't possible on a subjectivist viewpoint. </p>
            <h4>Alice must be using flawed logic if she approves of ritual child sacrifice</h4>
            <p>If you believe that logic (or reason, or rationality), which is much less controversially objective, leads people to a moral stance, then you must think that morality is objective! If everyone on the planet thought ritual child sacrifice was right (the moral examplars on the ISS notwithstanding), but logical reasoning says otherwise, then on this view they are making a logical error and are all objectively wrong. Not a very subjectivist viewpoint.</p>
            <h4>Yeah, I think its bad (i dissaprove of it), and theres nothing more to it</h4>
            <p>This stance (biting the bullet) is interesting to me because it goes against most people's moral intuitions, which, on subjectivism, are really all there are. Moral intuitions tend to tell us that morality is binding no matter who you are, or what you value. Unlike most other normative claims (if you want/value X, you should/shouldn't do Y), morality seems to apply no matter what it is that you value (this is what Kant called the Categorical Imperative). You <i>valuing</i> killing children doesn't make it good just as you <i>not valuing</i> letting them live doesn't make it bad. If Bob ignores this intuition and says "moral intuitions are all there is, and Alice's are just as valid as mine", then he is ignoring a moral intuition. If subjectivism is true, why would he do that?</p>
            <h2>Emotivism</h2>
            <p>This is another meta ethical theory that depends on subjective morality (this family of theories, which also includes subjectivism, is called non-cognitivism). It is more popular in philosophy as far as I can tell. Created by A. J. Ayer in his book <i>Language, Truth, and Logic</i>, it is a theory that says that moral talk is really just an expression of emotions. In emotivism, "X is bad" just means "boo X". Notice how, unlike subjectivism, this statement is not truth-apt; there is no truth value to "boo X".</p>
            <p>I used to take emotivism as the most reasonable meta ethical stance, but upon reflection it seems to fall victim to almost all of the same pitfalls as subjectivism, plus another problem called the Frege-Giech problem, which, to summarize, is a problem that arises from the emotivist claim that moral propositions have no tuth value. Basic logical reasoning on moral problems is impossible because of this. In fact this problem I find to be the real killer of all non-congitivist theories. Reasoning can, should, and is used every day to find what is good or bad. If your theory denies this, it has to have a superb reason for this, and I don't think I've seen one that does.</p>    
            <h2>So... Objectivism?</h2>
            <p>It seems to me that moral facts might be objective (that is, mind-independent). Many people, including me at first, would find this to be absurd. Some questions that need answering are:</p>
            <ul>
                <li>What would an objective moral fact even look like?</li>
                <li>Does this mean you believe in God?</li>
                <li>Why do we see so much persistent disagreement?</li>
                <li>Why do traditional sources of objective morality seem to be evil?</li>
            </ul>
            <p>Before I give my answers to these questions I think it would be helpful to survey the theories that rely on objective morality (cognitivist theories). These theories all agree on certain things: moral statements express propositions, and those propositions can be true or false based on mind-independent properties of actions.</p>
            <h3>Realism</h3>
            <p>Realism about moral facts is a set of beliefs which posits that moral facts are real. Big surprise. Non-natural realism says that moral facts are irreducible to any sort of scientific, empirical facts, while natural realism says they are. Of the two, I find non-natural realism to be more plausible. Natural realism, as I understand it, describes goodness as a "Homeostatic cluster property", which is to say that it is a collection of natural facts that are grouped together into one (i think..). An example of another thing like this is the concept of "health". Someone is said to be in good health when a myriad of natural empirical facts are aligned: well functioning organs, strong muscles, strong bones, etc. That is all health is; it is just the collection of natural facts we call healthy. The natural realist believes the same applies to goodness. While I do find the health analogy compelling, I'm not really sure what the natual facts are for goodness. So I don't really like this theory.</p>
            <p>That leaves non-natural realism, which says that goodness is a irreducible property of objects/actions. Good can't be described as "pleasure" or "flourishing" or any thing like that; its just good. There are also some problems I have with this. The first is that there is a big question about how we would access these moral facts if they are not natural facts but instead something else entirely. It seems that the only thing we have to see these facts are our intuitions, but we have no understanding of how these intuitions come about or how they could track the true moral facts. Because of this, if the facts are real, our intuitions can certainly be wrong! What recourse would we have then?</p>
        </div>

      
    </StarPanel>
  );
}
