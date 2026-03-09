import "../../styles/global.css"

import StarPanel from "./StarPanel";

const COLOR = "#eb78ae"; 

interface Props {
  onClose: () => void;
}

export default function Layers({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Layers" role="Objectvitiy" onClose={onClose}>
      <div id="body">
            <h1>Layers of Abstraction</h1>
            <p>This is a topic I've been thinking about recently. Basically, the universe seems to be created in such a way that different layers of abstraction (or maybe complexity?) are layered on top of each other.</p> 
            <p>Start with something simple, like an apple. Let's say the apple exists in layer 0 of existence. This would be the realm of physical objects and their properties, like hardness, transparency, weight, etc. If you zoom into the apple enough, you get to the next layer, layer 1. This layer would have to be something smaller than layer 0, and would make up the entirety of layer 0.</p>
            <p>For the apple, I guess this would be the microscopic layer: The cells that compose the apple. At this point, some things seem obvious:</p>
            <ol>
                <li>Layer 0 is entirely composed of layer 1.</li>
                <li>Effects (in the isolated system of the apple) in layer 0 have their causes in either layer 1 or layer 0</li>
            </ol>
            <p>This doesn't bother me, but here is the question that I tend to come to: Can something in layer 0 cause an effect in layer 1?</p>
            <p>It seems like an inane question. I can scratch the apple with my fingernail and see that my fingernail (L0) fucked up not only the apple (L0), but also the cells of the apple (L1). But here's the problem I have with it: was it not my fingernail cells, in layer 1, that caused the deformity? At what point does a single layer of reality not explain enough about an interaction to where one needs to move up a layer?</p>
            <p>Currently, I'm not sure.</p>
            <p>I think it can be divided into two camps: Reductionism, and not-Reductionism (:p)</p>
            <h2>Reductionism</h2>
            <p>In my mind, reductionism is simple. Any interaction can be understood in terms of its component parts. To fully understand the interaction of my fingernail scratching the apple, all you need to know is how the cells in fingernail worked to cause that scratch. To understand the cells, you need to understand what they are composed of, and so on. A concept that I think plays in this space is Laplace's Demon, which is the idea that if a being (the demon) knew the exact location and motion of every particle in the universe, it would know everything that can be derived from that information, which is everything there is to know. It would be omniscient.</p>
            <h2>Non-Reductionism</h2>
            <p>This is the more complex take to me. Non-reductionism doesn't argue that interactions can't be understood in terms of their component parts, but that they can't be <i>meaningfully</i> understood. Doug Hofstatder explains this view in I am a Strange Loop with a thought experiment. I will try to roughly paraphrase what he says, but you should probably read the book to get the full idea.</p>
            <h3>The Domino Machine</h3>
            <p>Imagine a complex system of dominoes which does something quite marvelous: given any number as input (how an input is given i will leave as an exercise to the reader), the domino machine will tell you whether or not that number is prime. A single domino at the end will either fall or not, denoting the number's primeness. When that domino falls, you might ask yourself: "Why did that domino fall?". A reductionist would say, "Because the one before it did". While a non-reductionist would say "Because the input number is prime!". The Non-reductionist doesn't even need to know the exact mechanism of the dominoes to make this claim.</p>
            <p>Thus, the two camps seem a little less equal to me! The reductionist can only ever tell you what happens in a single layer (the dominoes) without looking at the bigger, conceptual picture, while the non-reductionist can. Hofstatder takes it a step further in the book by asking a thought provoking question: Was the input number's "primeness" the cause of the last domino falling? Surely, the reductionist would find this absurd, but the non-reductionist already came to that conclusion independently.</p>
            <h2>My take</h2>
            <p>Not-reductionism seems to appeal to me more. I have recently come to this conclusion (thanks in no small part to Hofstatder) because of a thought I had. I call it the hard drive analogy.</p>
            <h2>The Hard Drive Analogy</h2>
            <p>Imagine Laplace's demon was looking at a hardrive and it knew everything about the particles of that hard drive. It would know exactly where the magentic charges on the disk are and in what order they appear. Does that mean it would know what's on the disk?</p>
            <p>My answer is no. To know whats on the disk, you need to understand how to decode binary, then what the binary you recieve means, and all the way up the layers of abstraction until you reach some meaning. "But wait!" the reductionist might say, "Laplace's demon would know this, because it knows everything derived from the particles that made up the person who described binary encoding!".</p>
            <p>This is interesting to me. For the demon to understand the encoding of the hard drive, which is ostensibly something an omniscient entity should be able to do, it needs to understand something with no physical form! Is this not exactly what the non-reductionists would argue? In my understanding. the reductionist would be forced to take one of two not very favorable positions:</p>
            <ol>
                <li>The demon doesn't need to know what the information on the disk actually means, or</li>
                <li>The demon does need to know, and it would know how the encoding works because the encoding is derived from a lower layer of reality</li>
            </ol>
            <p>I hope we can both agree that position 1 isn't very satisfying. If there is a truth that a being doesn't know, then it surely isn't omniscient. A reductionist might make the argument that ideas like binary encodings aren't "things" or "truths", but surely an omnsicient being would know them still. Imagine meeting god and she can't read a hard drive!</p>
            <p>So we are left with position 2, which says the encoding, an idea, can be derived from the component parts of the universe. This is also very interesting to me. Ideas, at least to me, have no existence in the physical world. If Laplace's demon knew every neuron in your brain and how it fired, would it know the ideas you had? Its hard for me to say... but my hunch is no. I want to take it back to the domino analogy here, because its simpler than the brain. Laplace's demon, knowing everything that will ever happen in the physical world, knows that the domino machine will be built. But does she know its purpose? Does she know what the last domino falling means?</p>
            <h2>Yes!</h2>
            <p>So, she does know. How could she know? Perhaps she knows about prime numbers, and she observes that the input number has to be prime for the output domino to fall. But hold on! She has to know something that doesn't "exist" in the form of particles! How could she learn this then? Here lies my central qualm: I don't think she can. Maybe that is just my limited mind talking, but it doesn't seem possible to me to find a meaningful description of a layer above by using a layer below.</p>
            <h2>No...</h2>
            <p>So what does this mean? To me, it seems like it means that there are things that can't be understood in terms of their component parts. Things like meaning or purpose are used as the example here in the domino machine / hard drive analogy, but I suspect that there are other things too. In fact, it leads me to believe that <i>ideas</i> are in fact just as real as anything else, they just exist in a layer above the physical world. Maybe it sounds a little platonic, but it makes sense to me. Another example that Hofstatder uses that I think fits here is the example of trying to understand a war. Understanding the war does not come from understanding the particles that make up the guns and the bombs, and it doesnt even come from understanding individuals. It comes from understanding the ideas and the feelings that <i>caused</i> the war.</p>
            <p>Now, if ideas are a layer of reality, above the physical world, and they can be said to have caused something in the physical world, the layer below them, does that mean I was wrong at the very start when I said "Effects (in the isolated system of the apple) in layer 0 have their causes in either layer 1 or layer 0"? Should I have included layer -1, the ideas layer? I think so. Lets go back to the scratching analogy. Can you understand the interaction of me scratching the apple without understanding why I did it? or why I didn't do something else? Understanding why I scratched the apple seems to be a much more satisfying way to look at the scenario than understanding how the cells interact.</p>
        
            <h2>Conclusion... for now</h2>
            <p>At this point, there are two reasonable (to me!) positions that can be taken.</p>
            <ol>
                <li>It is in fact possible to extrapolate thoughts/ideas from the physical world, we just aren't able to (yet?)</li>
                <li>It isn't!</li>
            </ol>
            <p>What I find very interesting here is that either, way, it seems that there is an admission that thoughts/ideas exist in a layer of reality above the physical world. I'm not sure what to make of that, and it definitely sounds like some sort of dualism, but I don't think it is.</p>
            <p>Perhaps that is what makes humans special! We live, most of the time, in the world of ideas, while non-humans are forced to live in the physical world only. A cat can never ever understand the domino machine, but a human can.</p>
        </div>

      
    </StarPanel>
  );
}
