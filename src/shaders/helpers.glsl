// return a value between 0 and 1 based on the given value and the min and max range
float inverseLerp(float v,float minValue,float maxValue){
  return(v-minValue)/(maxValue-minValue);
}

// remap values to a min and max range
float remap(float v,float inMin,float inMax,float outMin,float outMax){
  float t=inverseLerp(v,inMin,inMax);
  return mix(outMin,outMax,t);
}

// get random values
float random(vec2 st)
{
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}