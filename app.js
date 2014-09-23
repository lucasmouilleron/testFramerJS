//////////////////////////////////////////////////////////////////////////
var IMAGES_PATH = "imported/Schneider_Dossiers_02";
var BLOCKS = ["01-2","02-2","03-3","04"];
//////////////////////////////////////////////////////////////////////////
var layer, layerName, layers;
layers = Framer.Importer.load(IMAGES_PATH);

console.log(layers);

for (layerName in layers) {
  layer = layers[layerName];
  if(BLOCKS.indexOf(layerName) != -1) {

    layer.draggable.enabled = true;
    layer.originalX = layer.x;
    layer.originalY = layer.y;
    layer.states.animationOptions = {
      curve: "spring(200,20,10)"
    };
    layer.shadowColor = "rgba(0, 0, 0, 0.2)";
    layer.states.add({
      drag: {
        scale: 1.1,
        shadowBlur: 10
      },
      init: {
        x:layer.originalX,
        y:layer.originalY,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        shadowBlur: 0,
        shadowX: 0,
        shadowY: 0
      }
    });
    layer.states.switch("init");
    layer.on(Events.DragStart, function(event, layer) {
      event.stopPropagation();
      layer.dragStartY = layer.y;
      layer.dragStartX = layer.x;
      layer.states.switch("drag");
    });
    layer.on(Events.DragMove, function(event, layer) {
      var layerRotationX, layerRotationY, velocity;
      velocity = layer.draggable.calculateVelocity();
      layerRotationY = Utils.modulate(velocity.x, [-2, 2], [-15, 15], true);
      layerRotationX = Utils.modulate(velocity.y, [-2, 2], [-15, 15], true);
      layer.shadowX = (layer.x - layer.dragStartX) * -0.125;
      layer.shadowY = (layer.y - layer.dragStartY) * -0.125;
      layer.animate({
        properties: {
          rotationX: -layerRotationX,
          rotationY: layerRotationY
        },
        curve: "spring(900,0,0)"
      });
    });
    layer.on(Events.DragEnd, function(event, layer) {
      layer.states.switch("init");
    });
  }
  else {

    layer.draggable.enabled = false;
    layer.on(Events.TouchStart, function(event, layer) {
      event.stopPropagation();
      layer.scale = 0.7;
      layer.animate({
        properties: {
          scale: 1.0
        },
        curve: "spring",
        curveOptions: {
          friction: 15,
          tension: 1000
        }
      });
    });
  }
}