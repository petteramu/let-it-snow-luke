#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float dist = distance(st, vec2(0.5, 0.5));    
    float isSnow = smoothstep(0.05, 0.045, dist);
    vec4 color = vec4(0., 0., 0., 1.);
    gl_FragColor = vec4(color + isSnow * .3);
}