#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
	float num_flakes = 100.0;
    float cr = sqrt(num_flakes);
    vec2 grid = uv * vec2(cr, cr);
    vec2 frac = fract(grid);
    
	float flake_size = 0.15;
	float dist = distance(frac, vec2(0.5, 0.5));    
    float isSnow = smoothstep(flake_size + 0.05, flake_size - 0.05, dist);
    vec4 color = vec4(0., 0., 0., 1.);
    gl_FragColor = vec4(color + isSnow * .3);
}