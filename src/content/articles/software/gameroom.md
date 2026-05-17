---
title: Gameroom 
slug: gameroom
date: 2025-05-16
description: Building games with Durable Objects
tags: [TS, Cloudflare]
---

# MTG Duels
I made [mtgduels](https://mtgduels.loganlee.xyz) using Cloudflare Durable objects. The basic setup of the game's backend is as follows:

1. Each durable object instance is a single MTG Duels lobby that tracks the state of the game.
2. Players send messages to that durable object to try and update the state
3. If their requests are valid (e.g. its their turn, they're allowed to act, etc.), the state of the game is changed appropriately
4. When the game state is changed, all players are notified via their websocket connections

Notice how, at no point in this game flow is a mechanic specific to MTG Duels relevant. Any game can reuse this pattern. This realization led to Gameroom.

# Gameroom
## Philosophy
The core idea of gameroom is that you should only have to think about your game logic when building a game with Durable Objects. You want to build a game, not mess with web protocols! 

Gameroom is first and foremost a backend framework. It doesn't have anything to say about your frontend, as long as it communicates with the correct message types.

To accomplish this, there are many things that gameroom takes care of.  

## Hibernation
One of the features of Durable Objects is that they can hibernate when they're not actively running or receiving requests. This is really great for saving money, but it means you have to have a strategy for saving data between hibernations. (Or use the old websockets api, which prevents hibernation. Expensive!)

*Every* game built with Durable Objects needs to handle this, and *every* one of these games will likely implement it the same. Take your state (in gameroom's case, a record of JSON values), and save it in the storage backend. 
Gameroom simply does this for you. It reserializes the state whenever it changes, and retrieves it whenever it has to wake back up from hibernation. you don't even have to think about it.

## Messages
Player's need to communicate with the gameroom somehow. Again, *every* game will need to implement this. Gameroom allows you to define the various message types, and react to them when they arrive.

Sometimes, there may be players that somehow send messages that they shouldn't. To handle this, gameroom simply asks you to define when a message is valid, and then checks each message against that. Invalid messages get thrown out. Notably, you only have to think about invalid messages in the context of your game, such as actions taken out of turn. You *don't* have to worry about whether or not the message is valid JSON, which websocket it arrived on, etc.

```typescript
//Reject actions on other players' turns
validatePlayerAction(player, action) : Result {
    if(isPlayersTurn(player))
    {
        return {success: true}
    }

    return {success: false, reason: "Not your turn" }
}
```

You define what messages look like with Actions. Each action has a type and a payload. For example, in a wordle game you might have the following actions:
```typescript
type WordleActions = {
    GUESS: { word: string }
}
```
Then, in your game, you would check the word when a player makes a guess. 
## Players
Every game has players that join, leave, reconnect, act, etc. When using Durable Objects, players connect through Websockets. Without gameroom, you'd have to manually 
1. Accept HTTP requests with the `Upgrade: Websocket` header
2. Create two ends of a Websocket connection
3. Attach some sort of identity to each player's Websocket
4. Return the client's websocket

Gameroom just does this for you (noticing a theme?). You get to conceptualize your players as players in your game and not as Websocket connections. When they leave or reconnect, you get to define how your game reacts. 

## Plugins
A lot of games share functionality, especially web games (how many wordle type game have you played before?), but we can't bake specific game mechanics into gameroom. For the extremely common patterns, such as players taking turns, you can use plugins!

Plugins "plug in" to the room when its created and provide some kind of functionality. I went ahead and made some that I could foresee being useful, but the neat part is that its really easy to make your own.

Plugins can define their own implementations for the game's hooks, so that they can change their own state. 

In your own code, they're relatively simple to use.

```typescript
// Optional GameRoom method for registering plugins
getPlugins()
{
    return { turns: new TurnManager(this)}
}

validatePlayerAction(player, action)
{
    if(this.plugins.turns.getActivePlayer().id === player.id)
    {
        //more validation 
    }
}

onValidPlayerAction(player, action)
{
    // next turn!
    this.plugins.turns.advance()
}
```

## Hooks
You might have noticed some functions such as `onValidPlayerAction`. These are called hooks, and they let you respond to events that happen in the lifetime of your game. Three hooks must be implemented
1. `validatePlayertryJoin()`
2. `validatePlayerAction(player, action) : Result`
3. `onValidPlayerAction(player, action)`

These three define how your game accepts players and process actions. There's many more hooks that you can use if you want: `onPlayerJoin`, `onPlayerLeave`, etc.

# Gameroom Candidates
There's lots of games that I can see being made very simple with gameroom.

| Board/Card         |Trivia    |Party          |
|------------        |--------  |-----          |
|Chess/Checkers      |CineNerdle|Gartic Phone   |
|Battleship       |[Wordle](https://wordlevs.loganlee.xyz)|Quiplash       |
|Poker               |Crossword |Kahoot         |
|Magic The Gathering |Jeopardy  |Secret Hitler  |

You could also probably implement something like r/place or wplace, even though those aren't really games. 

## A Note on Real Time Games
Gameroom is suited very well to turn based or slower games. If you are trying to build something like a first-person shooter game, I'm not sure how well it would work. If your game needs to simulate something server side, like physics objects or enemies, it would probably be better to pick one player as the "server" which does the simulating. The "server" player then sends their updates to the gameroom, wich updates the rest of the clients. 

Besides real time games, I think the classic ".io" games like agar.io or slither.io could be done, but it's not immediately obvious to me how. 
