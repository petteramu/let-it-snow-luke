#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    // gl_FragColor.xy er posisjonen til pikselen me skal teikna i bildet.
    // Dette er to tall, x og y, med verdi mellom 0 og 1.
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    // Så rekner me ut distansen til sentrum av bildet: (0.5, 0.5)
	float dist = distance(uv, vec2(0.5, 0.5));    
    
    // I shadere bruker man ofte step funksjonen for å bestemme om noe skal være av/på
    // Det fungerer ofte som en if setning, men hvor hver piksel som kalkuleres bruker akkurat like mange instrukser, kontra en vanlig if 
    // step() funksjonen tar 2 argumenter, det første er terskelen, mens det andre er verdien man sjekker mot terskelen.
    // Verdier som er under terskelen returnerer 0, mens verdier som er like eller over returnerer 1.
    // Dette kan vi for eksempel bruke til å lage en sirkel, ved å sjekke om distansen til sentrum er mindre enn størrelsen vi vil ha på sirkelen.

    // Her har vi derimot brukt smoothstep, som er veldig lik. Den tar i mot eit ekstra argument
    // og interpolerer mellom 0 og 1 mens verdien er mellom disse to argumentene. Dette bruker vi
    // her til å lage en sirkel som har en mykere kant, enn dersom man hadde brukt step funksjonen.
    float isSnow = smoothstep(0.05, 0.045, dist);

    // Sett fargen til svart så vi ser snøen
    vec4 color = vec4(0., 0., 0., 1.);
    // Pluss på isSnow, som nå er 1. dersom det skal være snø og 0 om ikke.
    // Multipliser med 0.3 for å få litt grå farge
    gl_FragColor = vec4(color + isSnow * .3);
}