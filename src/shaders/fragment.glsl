varying vec2 vUv;
uniform float uStep;
uniform vec2 uResolution;

#include helpers.glsl;

vec3 WHITE=vec3(1.);
vec3 BLACK=vec3(0.);
vec3 GREEN=vec3(0.,1.,0.);

vec3 drawFunction(vec2 uv,vec3 grid){
  float linearLine=smoothstep(0.,1.,abs(uv.y-uv.x));
  
  // defines how much is 1 cycle
  vec2 pos=uv;
  float value2=sin(pos.x/10.)*20.;
  float functionLine2=smoothstep(0.,1.,abs(pos.y-value2));
  
  grid=mix(BLACK,grid,linearLine);
  grid=mix(BLACK,grid,functionLine2);
  
  return grid;
}

vec3 drawGrid(float cellDimensions){
  // center uv so when the window resize the grid resizes from the middle
  vec2 centeredUV=vUv-.5;
  // remap uv to absolute pixels
  vec2 uvPixels=centeredUV*uResolution;
  // define gridlines per cellDimensions pixels
  float horizontalLines=mod(uvPixels.x,cellDimensions);
  float verticalLines=mod(uvPixels.y,cellDimensions);
  float gridLines=min(horizontalLines,verticalLines);
  
  // draw lines of 1px
  float lines=smoothstep(0.,1.,gridLines);
  vec3 grid=vec3(lines);
  
  // define grid axis
  float axisX=smoothstep(0.,1.,abs(uvPixels.y));
  float axisY=smoothstep(0.,1.,abs(uvPixels.x));
  
  // draw axis
  grid=mix(BLACK,grid,axisX);
  grid=mix(BLACK,grid,axisY);
  
  //draw lineair line
  grid=drawFunction(uvPixels,grid);
  
  return grid;
}

vec3 getPattern(float number){
  if(number==1.01){
    return vec3(vUv.x);
  }else if(number==1.02){
    return vec3(vUv.y);
  }else if(number==1.03){
    return 1.-vec3(vUv.y);
  }else if(number==1.04){
    float strength=vUv.y*10.;
    return vec3(strength);
  }else if(number==1.05){
    float pattern=mod(vUv.y*10.,1.);
    return vec3(pattern);
  }else if(number==1.06){
    float pattern=mod(vUv.y*10.,1.);
    pattern=step(.5,pattern);
    return vec3(pattern);
  }else if(number==1.07){
    float verticalLines=step(.8,mod(vUv.x*40.,1.));
    float horizontalLines=step(.8,mod(vUv.y*40.,1.));
    float dots=verticalLines*horizontalLines;
    return vec3(dots);
  }else if(number==1.08){
    float horizontalBar=step(.4,mod(vUv.x*30.-.2,1.));
    float verticalBar=step(.8,mod(vUv.y*30.,1.));
    float xAxis=verticalBar*horizontalBar;
    
    float horizontalBarY=step(.8,mod(vUv.x*30.,1.));
    float verticalBarY=step(.4,mod(vUv.y*30.-.2,1.));
    
    float yAxis=verticalBarY*horizontalBarY;
    return vec3(yAxis+xAxis);
  }else if(number==1.09){
    float verticalLine=smoothstep(0.,.5,abs(vUv.x-.5));
    float horizontalLine=smoothstep(0.,.5,abs(vUv.y-.5));
    float crossLine=min(verticalLine,horizontalLine);
    return vec3(crossLine);
  }else if(number==1.10){
    float verticalLine=smoothstep(0.,.5,abs(vUv.x-.5));
    float horizontalLine=smoothstep(0.,.5,abs(vUv.y-.5));
    float crossLine=max(verticalLine,horizontalLine);
    return vec3(crossLine);
  }
  else if(number==1.11){
    float verticalLine=smoothstep(0.,.5,abs(vUv.x-.5));
    float horizontalLine=smoothstep(0.,.5,abs(vUv.y-.5));
    float crossLine=max(verticalLine,horizontalLine);
    float square=step(.3,crossLine);
    return vec3(square);
  }
  else if(number==1.12){
    float verticalLine=smoothstep(0.,.5,abs(vUv.x-.5));
    float horizontalLine=smoothstep(0.,.5,abs(vUv.y-.5));
    float crossLine=max(verticalLine,horizontalLine);
    float square=1.-step(.3,crossLine);
    float innerSquare=step(.2,crossLine);
    return vec3(square*innerSquare);
  }
  else if(number==1.13){
    float verticalLines=vUv.x*10.;
    float roundDownVerticalLines=floor(verticalLines);
    float remappedVerticalLines=remap(roundDownVerticalLines,0.,10.,0.,1.);
    return vec3(remappedVerticalLines);
  }
  else if(number==1.14){
    float verticalLines=vUv.x*10.;
    float roundDownVerticalLines=floor(verticalLines);
    float remappedVerticalLines=remap(roundDownVerticalLines,0.,10.,0.,1.);
    
    float horizontalLines=vUv.y*10.;
    float roundDownHorizontalLines=floor(horizontalLines);
    float remappedHorizontalLines=remap(roundDownHorizontalLines,0.,10.,0.,1.);
    
    return vec3(remappedVerticalLines*remappedHorizontalLines);
  }
  else if(number==1.15){
    float noiseUv=random(vUv);
    
    return vec3(noiseUv);
  }
  else if(number==1.16){
    float verticalLines=vUv.x*10.;
    float roundDownVerticalLines=floor(verticalLines);
    float remappedVerticalLines=remap(roundDownVerticalLines,0.,10.,0.,1.);
    
    float horizontalLines=vUv.y*10.;
    float roundDownHorizontalLines=floor(horizontalLines);
    float remappedHorizontalLines=remap(roundDownHorizontalLines,0.,10.,0.,1.);
    
    vec2 gridUv=vec2(remappedVerticalLines,remappedHorizontalLines);
    float noiseGridUv=random(gridUv);
    return vec3(noiseGridUv);
  }
  else if(number==1.17){
    float verticalLines=vUv.x*10.;
    float roundDownVerticalLines=floor(verticalLines);
    float remappedVerticalLines=remap(roundDownVerticalLines,0.,10.,0.,1.);
    
    float horizontalLines=(vUv.y+vUv.x)*10.;
    float roundDownHorizontalLines=floor(horizontalLines);
    float remappedHorizontalLines=remap(roundDownHorizontalLines,0.,10.,0.,1.);
    
    vec2 gridUv=vec2(remappedVerticalLines,remappedHorizontalLines);
    float noiseGridUv=random(gridUv);
    return vec3(noiseGridUv);
  }
  else if(number==1.18){
    return vec3(length(vUv));
  }
  else if(number==1.19){
    return vec3(distance(vUv,vec2(.5)));
  }
  else if(number==1.20){
    return vec3(.015/(distance(vUv,vec2(.5))));
  }
  else if(number==1.21){
    // in order to strech it centered you first need to center it by substracting 0.5, then apply the scale (number bigger than 1) and center it again by adding 0.5
    float horizontalElipse=.15/(distance(vec2(vUv.x,(vUv.y-.5)*10.+.5),vec2(.5)));
    float verticalEllipse=.15/(distance(vec2((vUv.x-.5)*10.+.5,vUv.y),vec2(.5)));
    return vec3(verticalEllipse*horizontalElipse);
  }
  else if(number==1.22){
    vec2 rotatedUv=rotate(vUv,PI/4.,vec2(.5));
    // in order to strech it centered you first need to center it by substracting 0.5, then apply the scale (number bigger than 1) and center it again by adding 0.5
    float horizontalElipse=.15/(distance(vec2(rotatedUv.x,(rotatedUv.y-.5)*10.+.5),vec2(.5)));
    float verticalEllipse=.15/(distance(vec2((rotatedUv.x-.5)*10.+.5,rotatedUv.y),vec2(.5)));
    return vec3(verticalEllipse*horizontalElipse);
  }
  else if(number==1.23){
    // taking the abs of vUv.y -0.5 will generate a number between 0 and 0.5 an use a smoothstep to
    // mix using the line values will use a white color for line values that are 1 and use the black color for lines values 0
    float line=smoothstep(0.,.002,abs(vUv.y-.5));
    return mix(BLACK,WHITE,line);
  }
  else if(number==1.24){
    // taking the abs of vUv.y - vUv.x will generate a straight lineair line
    float line=smoothstep(0.,.002,(abs(vUv.y-vUv.x)));
    return mix(BLACK,WHITE,line);
  }
  
  else if(number==1.25){
    // gets the angle of the vUv between -PI and PI
    return vec3(atan(vUv.x,vUv.y));
  }
  else if(number==1.26){
    // gets the angle of the vUv -PI and PI centered
    return vec3(atan(vUv.x-.5,vUv.y-.5));
  }
  else if(number==1.27){
    float angle=atan(vUv.x-.5,vUv.y-.5);
    angle=remap(angle,-PI,PI,0.,1.);
    return vec3(angle);
  }
  else if(number==1.28){
    float angle=atan(vUv.x-.5,vUv.y-.5);
    angle=remap(angle,-PI,PI,0.,1.);
    float strength=mod(angle*20.,1.);
    return vec3(strength);
  }
  
  else if(number==1.29){
    float strength=cnoise(vUv*10.);
    
    return vec3(strength);
  }
  else if(number==1.30){
    float strength=1.-abs(cnoise(vUv*10.));
    
    return vec3(strength);
  }
  
  else if(number==1.31){
    float strength=sin(cnoise(vUv*10.)*20.);
    
    return vec3(strength);
  }
  
  // section 2
  else if(number==2.01){
    // center and multiply by resolution
    vec2 pixelsUv=(vUv-.5)*uResolution;
    
    float circle=step(100.,distance(pixelsUv,vec2(0.)));
    return vec3(circle);
  }else if(number==2.02){
    // center and multiply by resolution
    vec2 pixelsUv=(vUv-.5)*uResolution;
    
    float circle=1.-smoothstep(0.,10.,abs(distance(pixelsUv,vec2(0.))-300.));
    return vec3(circle);
    
  }
  else if(number==2.03){
    // center and multiply by resolution
    vec2 distoredtedUv=vec2(vUv.x+sin(20.*vUv.y)*.1,vUv.y+sin(20.*vUv.x)*.1);
    vec2 pixelsUv=(distoredtedUv-.5)*uResolution;
    
    float circle=1.-smoothstep(0.,10.,abs(distance(pixelsUv,vec2(0.))-300.));
    return vec3(circle);
  }
  else if(number==2.04){
    vec2 pixelsUv=(vUv-.5)*uResolution;
    
    float angle=atan(pixelsUv.x,pixelsUv.y);
    angle=remap(angle,-PI,PI,0.,1.);
    float radius=100.+sin(angle*100.)*5.;
    float strength=1.-step(1.,abs(distance(pixelsUv,vec2(0.))-radius));
    
    return vec3(strength);
  }
  else if(number==2.05){
    return drawGrid(10.);
  }
  
}

void main(){
  vec2 uvs=vUv;
  vec3 color=vec3(0,uvs.x,uvs.y);
  color=getPattern(uStep);
  
  gl_FragColor=vec4(color,1.);
}