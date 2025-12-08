#ifdef GL_ES
precision mediump float;
#endif

#define WIND_DIR vec2(.0, .5)
#define WIND_STRENGTH .25

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 hash2( vec2 p )
{
	return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float voronoi(in vec2 x)
{
    vec2 n = floor(x);
    vec2 f = fract(x);

	vec2 mg, mr;

    float md = 8.0;
    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2 g = vec2(i, j);
		vec2 o = hash2( n + g );
        vec2 r = g + o - f;
        float d = dot(r,r);

        if( d<md )
        {
            md = d;
            mr = r;
            mg = g;
        }
    }

    return md;
}

float snow_layer(vec2 uv, float num_flakes) {
    float wind_mod = 70. / num_flakes;
    uv += u_time * WIND_DIR * WIND_STRENGTH * wind_mod;
    float cr = sqrt(num_flakes);
    vec2 grid = uv * vec2(cr, cr);
    float d = voronoi(cr * uv);
    
    float flake_size = 0.25 / num_flakes;
    float smooth = 1.25 * flake_size;
    
	float dist = length(d);
    float isSnow = smoothstep(flake_size + smooth, flake_size - smooth, dist);
	return isSnow;    
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float isSnow = snow_layer(st, 70.);
	isSnow = max(snow_layer(st, 85.), isSnow);
	isSnow = max(snow_layer(st, 100.), isSnow);
	isSnow = max(snow_layer(st, 130.), isSnow);
	isSnow = max(snow_layer(st, 150.), isSnow);
	isSnow = max(snow_layer(st, 140.), isSnow);
	isSnow = max(snow_layer(st, 160.), isSnow);
	isSnow = max(snow_layer(st, 200.), isSnow);
	isSnow = max(snow_layer(st, 220.), isSnow);
    vec4 color = vec4(0., 0., 0., 1.);
    gl_FragColor = vec4(color + isSnow * .3);
}