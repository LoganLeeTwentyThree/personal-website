import "../../styles/global.css"

import StarPanel from "./StarPanel";

const COLOR = "#7884eb";

interface Props {
  onClose: () => void;
}

export default function NPMRegistry({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="NPM Registry" role="" onClose={onClose}>
      <div id="body">
            <p>One of my recent projects was to make a package registry server that could interface with NPM to store packages. I learned a lot from this project, and I would like to write some of the lessons I learned here.</p>
            <h1>Lesson 1: Choose the right tools for the job</h1>
            <p>When I started this project, I had just finished another project: MTG-Wordle. This project was purely front-end, so I decided to learn react and Next.js, since they are well known tools for such a job. Unfortunately, I decided to continue the momentum from that project and write the registry server using the same tech.</p>
            <p>In retrospect, this was a bad idea! Next.js is clearly designed for serverless architecture, and running it inside a docker container (with state...) is kind of silly. A specific pain point I ran into was when designing the api. Two different endpoints had the same pattern in their URL, (a/b/c), but each variable in the url meant something different in the two endpoints. Due to this, I had to fight against Next.js to make the code more readable when really this shouldn't have been a problem in the first place.</p>
            <img src="..\public\NextjsRouting.png"></img>
            <h1>Lesson 2: Think deeply about project scope and purpose</h1>
            <p>When I started the project, I had some ideas about what its purpose was, but I didn't think very hard about it. I integrated third party services like Auth0, but... why would I need that for my registry service? I built it in Next.js so that I could deploy it just like MTG Wordle, but... why would I need to deploy it to the cloud if its supposed to be private?</p>
            <p>In the end, I axed Auth0 (since it was mostly bloat), and moved the project onto a docker container because it made much more sense for its purpose. I'm still unsure about the package tarballs being stored in S3, as it makes the project less self contained. However, I do appreciate the experience I gained with AWS, so I don't regret doing cloud storage. If I was create and sell this product as an on-prem package registry, I would likely remove the cloud storage aspect too.</p>
            <h1>Lesson 3: Find things to get excited about</h1>
            <p>As development continued, I found myself getting less interested in building out a package registry server. When I noticed this, I pivoted to working on moving to docker, which I found exciting to learn. When I got tired of the backend, I moved to the front end. The moral of the story is, its important to stay invested in the project in any way you can. If development in one place feels really arduious, it is sometimes helpful to go work on some other part.</p>
            <h1>Conclusion</h1>
            <p>I learned a lot about APIs, correct tool use, planning, and motivation. Thanks to this project, I think that I will be a much more thoughtful developer in the critical first stages of any future project.</p>
      </div>

      
    </StarPanel>
  );
}
