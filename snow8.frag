#ifdef GL_ES
precision mediump float;
#endif

#define WIND_DIR vec2(.0, .5)
#define WIND_STRENGTH .25

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p )
{
	return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float voronoi(in vec2 x)
{
    vec2 cellId = floor(x);
    vec2 f = fract(x);

	vec2 mg, mr;

    float minDist = 8.0;
    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2 nabo = vec2(i, j);
		vec2 punkt = random2( cellId + nabo );
        vec2 r = nabo + punkt - f;
        float dist = dot(r,r);

        if( dist<minDist )
        {
            minDist = dist;
            mr = r;
            mg = nabo;
        }
    }

    return minDist;
}

float snow_layer(vec2 uv, float num_flakes) {
    float layer = 70. / num_flakes;
    float wind_mod = 70. / num_flakes;
    uv += 999. + u_time * WIND_DIR * WIND_STRENGTH * wind_mod;
    
    float dir_var = 1. + sin(uv.x/100.+u_time)/4.;
    uv += vec2(dir_var/5., dir_var / 100.);
    
    float cr = sqrt(num_flakes);
    vec2 grid = uv * cr;
    float d = voronoi(cr * uv);
    
    vec2 size_var = random2(vec2(floor(d))) * .25;
    float flake_size = (0.25 + length(size_var)) / num_flakes;
    float smooth = 1.0 * flake_size;
    
	float dist = length(d);
    float isSnow = smoothstep(flake_size + smooth, flake_size - smooth, dist);
	return isSnow;    
}

void main() {
    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
	uv.x *= u_resolution.x / u_resolution.y;   // apply aspect ratio correction
	float isSnow = snow_layer(uv, 70.);
	isSnow = max(snow_layer(uv, 85.), isSnow);
	isSnow = max(snow_layer(uv, 100.), isSnow);
	isSnow = max(snow_layer(uv, 130.), isSnow);
	isSnow = max(snow_layer(uv, 150.), isSnow);
	isSnow = max(snow_layer(uv, 140.), isSnow);
	isSnow = max(snow_layer(uv, 160.), isSnow);
	isSnow = max(snow_layer(uv, 200.), isSnow);
	isSnow = max(snow_layer(uv, 220.), isSnow);
    float snow = step(1., uv.y) * isSnow;
    gl_FragColor = vec4(snow * .6);
}