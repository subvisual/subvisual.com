---
highlight: true
path: Smooth_motion_with_threejs_and_Threlte
title: Smooth motion with three.js and Threlte
categories:
  - engineering
author: david-lange
date: 2024-05-20
intro: >+
  Creating 3D scenes in a browser is a rewarding and fun task, but it's also
  challenging. There are plenty of things to consider - lights, cameras,
  materials, etc - just to setup a decent looking static scene. And then we have
  to decide how to add some movement to our scene.
---
Creating 3D scenes in a browser is a rewarding and fun task, but it's also challenging. There are plenty of things to consider - lights, cameras, materials, etc - just to setup a decent looking static scene. And then we have to decide how to add some movement to our scene.

![-](https://hackmd.io/_uploads/SJISJU0WC.gif "-")

Recently I've been working on [this demo](https://cubed-threlte.vercel.app/). It's a pretty good way of learning because it requires a few different types of motion:

* The cubes drift around moving infinitely at constant speeds. When they hit the scene limits, they bounce back, but still at a constant speed. When they collide with other cubes, they bounce off each other naturally in a physics-based way;
* When we click the button, the cubes' movement is fully controlled and not physics-based;
* The text moves based on mouse movement.

There's quite a lot going on here, so I'll try to cover the main topics, especially regarding motion. You can check out the [repo on GitHub](https://github.com/davelange/cubed/) for the full code.

### Under the hood

I used [three.js](https://threejs.org/), one of the most common JS WebGL libraries. As this was a Svelte project, I used [Threlte](https://threlte.xyz/docs), a three.js renderer and component library. If you're using React, I recommend [React-three-fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction).

Another big part is the physics engine, which basically simulates a world where objects act like they’re physical - they have mass, friction, etc, and are affected by gravity and collisions. I used [Rapier](https://rapier.rs/) - a fast physics engine written in Rust which can be easily used both in React and Svelte projects through wrapper libraries.

I won't go into much detail here on how to use Threlte, and hopefuly it should be more or less clear what's going on if you've never used it. Either way, I recommend you check out [three.js](https://threejs.org/docs/) and [Threlte](https://threlte.xyz/docs) documentation.

### Getting started

Let's start with the simpler parts of the project - in this scene the camera and lights are nothing special.

```
// Scene.svelte
 <World gravity={[0, 0, 0]}>
  <T.PerspectiveCamera
    position={[0, 0, 25]}
    fov={50}
    near={0.1}
    far={1000}
    makeDefault
  />
  <T.DirectionalLight
    color="#f8f1ed"
    position={[0, 0, 15]}
    intensity={0.5}
  />
  <T.PointLight
    color="#f8f1ed"
    intensity={2}
    position={[-5, 10, 0]}
  />
        
  <Debug />  
</World>
```

`World` is a component provided by `@threlte/rapier` that creates the physics world. Note that we're setting the gravity to 0, as we don't want our objects to fall.

Next, we can add a single cube to this scene:

```
// Cube.svelte

<T.Mesh>
  <RoundedBoxGeometry args={[1, 1, 1]} />
  <T.MeshPhongMaterial
    color='#ed7a5f'
    specular='#ed7a5f'
    emissive='#ed7a5f'
    shininess={40}
    reflectivity={0.5}
  />
</T.Mesh>
```

![](https://hackmd.io/_uploads/HyQVeICWC.png)

It should show up in the center of the scene. So how to make it "drift"? First we need to make the physics engine aware that this object even exists. We can do this by attaching it to a `RigidBody`.

```
<RigidBody
  type="dynamic"
  angularVelocity={[0, 0, 0]}
  linearVelocity={[0, -4, 0]} 
/>
  <Collider shape="cuboid" mass={1} args={[1, 1, 1]}>
    <T.Mesh>
      <RoundedBoxGeometry args={[1, 1, 1]} />
      <T.MeshPhongMaterial
        color='#ed7a5f'
        specular='#ed7a5f'
        emissive='#ed7a5f'
        shininess={40}
        reflectivity={0.5}
      />
    </T.Mesh>
  </Collider>
</RigidBody>
```

The `RigidBody` component simulates the dynamics of a solid object, whereas the `Collider` or `AutoColliders` components simulate the actual shape and collisions. Both are provided by `@threlte/rapier`.

![](https://hackmd.io/_uploads/S1ot9S6WR.gif)

### Setting boundaries

If all goes well you should now see the cube happily drifting away into the void. The `linearVelocity` property defines the movement’s velocity on each axis, and you can tweak the `angularVelocity` to make it spin. As you've probably guessed, the `Collider` component will handle collision detections, but we'll get there in a moment. First, how do we prevent the Cube from disappearing into space?

Basically, we need to box our cubes in with some boundaries. We can do this simply by placing 6 invisible planes around our scene. When the cubes hit these invisible limits, they bounce back, thus staying in view.

Each limit in our box can be achieved using a [PlaneGeometry](https://threejs.org/docs/index.html?q=plane#api/en/geometries/PlaneGeometry). The following code would get you the front and back limits, and the remaining ones need only the appropriate position and rotation values:

```
<RigidBody type="fixed" userData={{name: "end"}}> // <- the planes won't move anywhere, so the RigidBody can be fixed
  <AutoColliders shape="cuboid">
    <T.Mesh position={[0, 0, EDGE_Z]} rotation={[0, degToRad(180), 0]}>
      <T.PlaneGeometry args={[27, 27]} />
      <T.MeshBasicMaterial transparent opacity={0} />
    </T.Mesh>
  </AutoColliders>
</RigidBody>


<RigidBody type="fixed" userData={{name: "start"}}>
  <AutoColliders shape="cuboid">
    <T.Mesh position={[0, 0, -EDGE_Z]} rotation={[0,0,0]}>
      <T.PlaneGeometry args={[27, 27]} />
      <T.MeshBasicMaterial transparent opacity={0} />
    </T.Mesh>
  </AutoColliders>
</RigidBody>
```

Note: `userData` can be anything, and will be useful later on when we deal with collisions. Also, the Debug component provided by `@threlte/rapier` is very useful to compose our scene, as otherwise we want the boundaries to be invisible.

![](https://hackmd.io/_uploads/B1QMz8T-A.gif)

### Reacting to collisions

Great! We've prevented our cubes from drifting out of the scene, but you may have noticed that the cubes' movement isn't constant - after the initial collision with a limit, they slow down to a standstill. We need to tell the rigid bodies to keep the same linear velocity after colliding with the limits, just change direction.

One way to do this is through the `collisionenter` event. This event fires whenever there is a collision with another RigidBody, and tells us who that RigidBody was. This allows us to do something like this:

```
// Cube.svelte
function handleCollision(event) {
    const limitName = event.targetRigidBody.userData.name; // <- identifies limit: start, end, left, right, etc 
    const linvel = rigidBody.linvel(); // <- linvel = linear velocity

    if (['top', 'bottom'].includes(limitName)) {
      linvel.y *= -1;
    } else if (['right', 'left'].includes(limitName)) {
      linvel.x *= -1;
    } else if (['start', 'end'].includes(limitName)) {
      linvel.z *= -1;
    } else {
      return;
    }

    rigidBody.setLinvel(linvel, true);
}

// ...
<Collider
  shape="cuboid"
  on:collisionenter={handleCollision}
>
```



In the `handleCollision` function, we use the `userData` prop to check if our cube hit a limit, and if so which limit. We then invert the linear velocity on one of the axes, depending on what limit was hit. This basically reflects the movement, leading to a steady infinite movement.

![](https://hackmd.io/_uploads/SyIwtIabA.gif)

What about collisions between cubes? Well, the physics engine has you covered - the cubes will simply react based on their properties (mass, friction, restitution, etc).

### Manual movement

The next step is to make our cubes move in a specific way whenever we click a button. For these "click" interactions we could use the [`click` event handlers](https://threlte.xyz/docs/reference/extras/interactivity) provided by Threlte, or just add a regular HTML button outside the canvas. Our components can then subscribe to these events and react accordingly. I won't go into the details here as I'm focusing on the 3D aspect, but in this case I used Svelte stores.

Basically what happens is the following:

```
// page.svelte
<button type="button" on:click={toggle}>Click here</button>    

// Cube.svelte
store.on('stopDrifting', () => {
    // stop drifting and move to a specific position
})

store.on('startDrifting', () => {
    // move back out and start drifting again
})
```

So how do we control the Cube's movement? There are a couple ways to move things around in a physics engine - we could use real physical events like [forces and impulses](https://rapier.rs/docs/user_guides/javascript/rigid_bodies/#forces-and-impulses). This is great for "real" looking movements, but that's not what we need here. Instead, we need to directly set the cubes' position, with a good old `rigidBody.setTranslation(x, y, z)`.

The problem now, however, is that `setTranslation` will simply teleport the object from point A to point B, with no actual animation in between. One way around this is to translate the object 1 little bit per frame, so that after n frames, it reaches its destination smoothly. A very simple implementation might look like this:

```
// Cube.svelte
let rigidBody: RapierRigidBody;
let animation;

config.on('driftingStop', () => {    
  // Disable collisions
  rigidBody.collider(0).setEnabled(false);

  // Get current translation
  let current = rigidBody.translation();

  animation = {
    // Get distance to center
    force: {
      x: current.x * -1,
      y: current.y * -1,
      z: current.z * -1
    },
    // Home many frames it should take
    duration: 100,
    progress: 0
  };
});

// Runs on every frame
useTask(() => {
  if (animation) {
    let current = rigidBody.translation();

    for (const axis of ['x', 'y', 'z']) {
      current[axis] +=
        animation.force[axis] / animation.duration;
    }

    rigidBody.setTranslation(current);

    if (animation.progress < animation.duration) { 
      animation.progress++;
    } else {
      animation = undefined;  
    }
  }
});

<RigidBody
  bind:rigidBody
  type="dynamic"
  linearVelocity={$config.drifting ? linearVelocity : [0, 0, 0]}
  angularVelocity={$config.drifting ? angularVelocity : [0, 0, 0]}
>
// ...
```

There are a few things going on here:

* We create a `rigidBody` variable that is bound to the `RigidBody` component. This allows us to directly call its methods.
* On the `RigidBody` component we set linear and angular velocity to 0 if drifting is disabled, otherwise that would interfere with our animation.
* When drifting is disabled we create an animation object, which describes how our cube will be moving. We also disable collisions.
* We use the provided `useTask` hook to progress our animation on each frame. On every run, we increment the rigid body translation by a fraction of the animation's total force. \
  When the animation `progress` is equal to it's `duration` we set `animation` back to undefined, as it is complete.

That leaves us with something like this:

![](https://hackmd.io/_uploads/HJyf2iR-R.gif)

At this point there's still a lot of room for improvement - we need to add easing to the movement, allow for multiple animations at once, run code when they end, or even add options for delaying or looping animations - but at it's core this is the idea: work out how much force needs to be applied, then apply a fraction of that amount over a given number of frames.

Here I ended up creating a custom store for dealing with these animations easily, allowing me to call it like this:

```
// Cube.svelte
let travel = createTravel();

config.on('floatingStop', () => {
  rigidBody.collider(0).setEnabled(false);

  $travel
    .translate({
      to: getCubeEndPosition(),
      duration: 80,
      easing: 'bounceOut',
      onEnd: () => {
        $travel.rotate({
          by: { x: degToRad(180) },
          duration: 90,
          delay: 10,
          loop: true,
          easing: 'linear'
        });
      }
    })
    .rotate({
      to: {
        y: degToRad(180),
        x: degToRad(180),
        z: degToRad(180)
      },
      duration: 80,
      easing: 'linear'
    });
});
```

That leaves us with an easy way to imperatively tell our objects how to move. If you're looking for a more fully fledged solution for more complex scenes though, you could give [Theatre.js](https://www.theatrejs.com/) a try.

### Adding the text

Adding the text to our scene can be done in a couple of ways:

* Regular HTML. This is the simpler way of getting things done, but doesn't allow interaction with our scene - the cubes won't collide with the text, or pass behind and in front of it.
* The `@threlte/extras` package provides both a Text and Text3DGeometry component to render text in our scene.

Adding the text itself is pretty simple, what about movement? For that, I'm using a store to keep track of the mouse position:

```
import { writable } from "svelte/store";

export const mouse = writable({x: 0, y: 0})
```

Then on `mousemove`, we udpate it with the distance from the mouse position to the center of the window:

```
function handleMousemove(event: MouseEvent) {
    mouse.set({
      x: event.clientX - window.innerWidth / 2,
      y: event.clientY - window.innerHeight / 2
    });
}
```

We can then use these values on our Text component:

```
// Text.svelte

<T.Group
  position={[0, 0, 0]}
  rotation={[
    degToRad($mouse.y / 100),
    degToRad($mouse.x / 100), 
    0
  ]}
>
  <T.Mesh>
    <Text3DGeometry
      font={'/fonts/InterExtraBold.json'}
      text="floating cubes"
      size={2}
      height={0.5}
      depth={1}
    />
    <T.MeshBasicMaterial color="red" />
  </T.Mesh>
</T.Group>
```

We divide the `$mouse.x` and `y` values by 100 to make the rotation more subtle, though this really depends on the effect you want. This is what it would look like if we only divided it by 10:

![](https://hackmd.io/_uploads/SJiGozZzR.gif)

Finally, we need to make our text "collidable", so the cubes can interact with it. For this we need only wrap the text in a collider, and specify an appropriate size:

```
<Collider shape="cuboid" args={[10, 1, 0.2]}>
    // The text
</Collider>
```

Our text now interacts both with the user actions, and also with other elements of the 3D scene.

### Conclusion

And with that, we have an overview of the scene. As you can see, we can combine different types of motion in a single scene to create something pretty interesting.

When it comes to 3D apps there's a lot to learn and a lot of potential, and fortunately a lot of tools that can help you on your learning journey. Hopefully this sparked your interest and gave you an idea of how to get started. As ever, the best way of learning is to try building things and, of course, reading the docs