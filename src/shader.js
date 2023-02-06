export const FRAGMENT_SHADER = 
`
precision highp float;

// ==============
// === WINDOW ===
// ==============

uniform vec2 res;
uniform float aspect;
uniform float zoom;
uniform vec2 offset;

// ======================
// === GUI PARAMETERS ===
// ======================

uniform float a;
uniform float b;
uniform float c;
uniform float d;

// =================================
// === COMPLEX NUMBER OPERATIONS ===
// =================================

vec2 cm (vec2 a, vec2 b) {
  return vec2(a.x*b.x - a.y*b.y, a.x*b.y + b.x*a.y);
}

vec2 conj (vec2 a) {
  return vec2(a.x, -a.y);
}

// ============
// === MAIN ===
// ============

float mandelbrot(vec2 point){
    float alpha = 1.0;
    vec2 z = vec2(0.0, 0.0);
    vec2 z_0;
    vec2 z_1;

    // i < max iterations
    for (int i=0; i < 200; i++){
        z_1 = z_0;
        z_0 = z;

        float x_0_sq = z_0.x*z_0.x;
        float y_0_sq = z_0.y*z_0.y;
        vec2 z_0_sq = vec2(x_0_sq - y_0_sq, 2.0*z_0.x*z_0.y);

        float x_1_sq = z_1.x*z_1.x;
        float y_1_sq = z_1.y*z_1.y;
        vec2 z_1_sq = vec2(x_1_sq - y_1_sq, 2.0*z_1.x*z_1.y);

        // ===============================
        // ===== RECURRENCE RELATION =====
        // ===============================
        z = z_0_sq + a * conj(z_0) + b * z_0 + c * conj(z_1) + d * z_1 * conj(z_0) + point;

        float z_0_mag = x_0_sq + y_0_sq;
        float z_1_mag = x_1_sq + y_1_sq;

        if(z_0_mag > 12.0){
            float frac = (12.0 - z_1_mag) / (z_0_mag - z_1_mag);
            alpha = (float(i) - 1.0 + frac)/200.0; // should be same as max iterations
            break;
        }
    }

    return alpha;
}

// gl_FragCoord in [0,1]
void main(){
    vec2 uv = zoom * vec2(aspect, 1.0) * gl_FragCoord.xy / res + offset;
    float s = 1.0 - mandelbrot(uv);

    vec3 coord = vec3(s, s, s);
    gl_FragColor = vec4(pow(coord, vec3(5.38, 6.15, 3.85)), 1.0);
}
`