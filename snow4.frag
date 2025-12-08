#ifdef GL_ES
precision mediump float;
#endif

#define WIND_DIR vec2(.0, .5)
#define WIND_STRENGTH .25

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float snow_layer(vec2 uv, float flake_size, float num_flakes) {
    uv += u_time * WIND_DIR * WIND_STRENGTH;
    float cr = sqrt(num_flakes);
    vec2 grid = uv * vec2(cr, cr);
    vec2 frac = fract(grid);
    
	float dist = distance(frac, vec2(0.5, 0.5));
    float isSnow = smoothstep(flake_size + 0.05, flake_size - 0.05, dist);
	return isSnow;    
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float isSnow = snow_layer(st, 0.08, 150.);
    gl_FragColor = vec4(isSnow);
}