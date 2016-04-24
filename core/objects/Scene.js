function Scene()
{
	THREE.Scene.call(this);

	this.name = "scene";

	//Disable auto matrix updates
	this.rotationAutoUpdate = false;
	this.matrixAutoUpdate = false;

	//Create cannon world
	this.world = new CANNON.World();
	this.world.broadphase = new CANNON.NaiveBroadphase();
	this.world.gravity.set(0,-9.82,0);
	this.world.solver.iterations = 10;

	//Initialization variables
	this.initial_camera = null;

	//Runtime variables
	this.camera = null;
}

//Function Prototype
Scene.prototype = Object.create(THREE.Scene.prototype);
Scene.prototype.icon = "editor/files/icons/models/models.png";

//Runtime functions
Scene.prototype.initialize = initialize;
Scene.prototype.update = update;
Scene.prototype.toJSON = toJSON;

//Initialize
function initialize()
{
	//Initialize children and select camera
	for(var i = 0; i < this.children.length; i++)
	{
		if(this.initial_camera === this.children[i].uuid)
		{
			this.camera = this.children[i];
		}

		if(this.children[i].initialize !== undefined)
		{
			this.children[i].initialize();
		}
	}
}

//Update scene
function update()
{
	this.world.step(1/60);
	
	for(var i = 0; i < this.children.length; i++)
	{
		if(this.children[i].update !== undefined)
		{
			this.children[i].update();
		}
	}
}

//Create JSON for object
function toJSON(meta)
{
	var data = THREE.Scene.prototype.toJSON.call(this, meta);

	if(this.initial_camera !== null)
	{
		data.object.initial_camera = this.initial_camera;
	}

	return data;
}