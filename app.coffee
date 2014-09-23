schneider_dossiers_02Layers = Framer.Importer.load "imported/Schneider_Dossiers_02"

for layerName of schneider_dossiers_02Layers
  layer = schneider_dossiers_02Layers[layerName]
  layer.on Events.Click, (event, layer) ->
    
    layer.scale = 0.7
    
    # Animate the layer back to the original size with a spring
    layer.animate
    	properties:
        scale: 1.0
      curve: "spring"
      curveOptions:
        friction: 15
        tension: 1000

    
    # Only animate this layer, not other ones below
    event.stopPropagation()
    return
