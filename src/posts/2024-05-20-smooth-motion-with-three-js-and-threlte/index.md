---
highlight: true
path: Smooth_motion_with_threejs_and_Threlte
title: Smooth motion with three.js and Threlte
categories:
  - engineering
author: david-lange
date: 2024-05-20
intro: Creating 3D scenes in a browser is a rewarding and fun task, but it's
  also challenging. There are plenty of things to consider - lights, cameras,
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