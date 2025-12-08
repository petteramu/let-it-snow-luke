#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
	float num_flakes = 100.0;
    float cr = sqrt(num_flakes);
    vec2 grid = st * vec2(cr, cr);
    vec2 frac = fract(grid);
    
	float flake_size = 0.15;
	float dist = distance(frac, vec2(0.5, 0.5));    
    float isSnow = smoothstep(flake_size + 0.05, flake_size - 0.05, dist);
    gl_FragColor = vec4(isSnow);
}