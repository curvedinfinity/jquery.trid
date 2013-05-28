jquery.trid
===========

Welcome to Jquery.trid, a Jquery plugin which automatically converts DOM elements into a 3D scene using CSS3 Transforms. Try dragging the example around. Then drag the example while holding CTRL. Trid is designed for simplicity and a small basic app footprint.

[Live example](http://curvedinfinity.com/jquery.trid/example.html)

How to Use
----------
  
$([selector]).tridView({"useMouse":[boolean],"perspective":[number]})

Sets up the trid scene using this DOM object as the root. Returns the same selector.
  
$([selector]).trid({"x":[number],"y":[number],"z":[number],"rx":[number],"ry":[number],"rz":[number],"sx":[number],"sy":[number],"sz":[number],})

Enables 3D transformation on this DOM element. XYZ represent position translation. RxRyRz represent rotation. SxSySz represent scaling. All transformations are applied to the parent DOM element's transform matrix (IE, transforms stack from parents to children). All transformations are optional and previous transformation settings will be preserved if they are not replaced with new numbers. All calls to trid() are buffered until the frame is resolved using tridTick(). Trid() returns the selector it was called from.
  
$.tridTick()

Applies all pending trid transforms.
