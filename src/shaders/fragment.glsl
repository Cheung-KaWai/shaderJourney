varying vec2 vUv;
uniform float uStep;

vec3 getPattern(float number,vec2 uv){
  if(number==0.){
    // simple line in the middle
    float line=smoothstep(0.,.01,abs(vUv.y-.5));
    return mix(vec3(0.),vec3(1.),line);
  }else if(number==1.){
    float wave=.5+sin(2.*3.14159*vUv.x*10.);// Adjust the frequency by multiplying vUv.x by a factor
    float line=smoothstep(.4,.6,abs(vUv.y-wave));
    // Set the color based on the line
    return mix(vec3(0.),vec3(1.,0.,0.),line);
  }
}

void main(){
  vec2 uvs=vUv;
  vec3 color=getPattern(uStep,uvs);
  
  gl_FragColor=vec4(color,1.);
}