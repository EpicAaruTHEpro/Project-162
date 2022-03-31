AFRAME.registerComponent("bowling-balls", {
    init: function() {
      this.throwBall()
    },
    throwBall: function() {
        window.addEventListener("keydown", e => {
            if (e.key === "z") {
                let ball = document.createElement("a-entity")
                ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf")
                ball.setAttribute("scale", {x: 3, y: 3, z: 3})
                let cam = document.querySelector("#camera")
                let camera = document.querySelector("#camera").object3D
                let direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                let scene = document.querySelector("#scene")
                pos = cam.getAttribute("position")
                ball.setAttribute("position", {x: pos.x, y: pos.y-1.2, z: pos.z})
                ball.setAttribute("velocity", direction.multiplyScalar(-10))
                ball.setAttribute("dynamic-body", {
                    shape: "sphere", mass: 10
                })
                ball.addEventListener("collide", this.removeBall)
                scene.appendChild(ball)
            }
        })
    },

    removeBall: function(e) {
        // this is ball entity
        let element = e.detail.target.el
        //this is any hit element
        let elementHit = e.detail.body.el
        if (elementHit.id.includes("pin")) {
          elementHit.setAttribute("material", {opacity: 1, transparent: true})
          let impulse = new CANNON.Vec3(0, 1, -15)
          let worldPoint = new CANNON.Vec3().copy(
              elementHit.getAttribute("position")
          )
          elementHit.body.applyForce(impulse, worldPoint)
        element.removeEventListener("collide", this.removeBall)
        let scene = document.querySelector("#scene")
        scene.removeChild(element)
        }
    }
  });
  