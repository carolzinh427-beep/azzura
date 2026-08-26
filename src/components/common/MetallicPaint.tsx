import React, { useEffect, useRef, useState, useCallback } from 'react';
import './MetallicPaint.css';

const vertexShader = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 vP;
void main(){vP=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`;

const fragmentShader = `#version 300 es
precision highp float;
in vec2 vP;
out vec4 oC;
uniform sampler2D u_tex;
uniform float u_time,u_ratio,u_imgRatio,u_seed,u_scale,u_refract,u_blur,u_liquid;
uniform float u_bright,u_contrast,u_angle,u_fresnel,u_sharp,u_wave,u_noise,u_chroma;
uniform float u_distort,u_contour;
uniform vec3 u_lightColor,u_darkColor,u_tint;

vec3 sC,sM;

vec3 pW(vec3 v){
  vec3 i=floor(v),f=fract(v),s=sign(fract(v*.5)-.5),h=fract(sM*i+i.yzx),c=f*(f-1.);
  return s*c*((h*16.-4.)*c-1.);
}

vec3 aF(vec3 b,vec3 c){return pW(b+c.zxy-pW(b.zxy+c.yzx)+pW(b.yzx+c.xyz));}
vec3 lM(vec3 s,vec3 p){return(p+aF(s,p))*.5;}

vec2 fA(){
  vec2 c=vP-.5;
  c.x*=u_ratio>u_imgRatio?u_ratio/u_imgRatio:1.;
  c.y*=u_ratio>u_imgRatio?1.:u_imgRatio/u_ratio;
  return vec2(c.x+.5,.5-c.y);
}

vec2 rot(vec2 p,float r){float c=cos(r),s=sin(r);return vec2(p.x*c+p.y*s,p.y*c-p.x*s);}

float bM(vec2 c,float t){
  vec2 l=smoothstep(vec2(0.),vec2(t),c),u=smoothstep(vec2(0.),vec2(t),1.-c);
  return l.x*l.y*u.x*u.y;
}

void main(){
  sC=fract(vec3(.7548,.5698,.4154)*(u_seed+17.31))+.5;
  sM=fract(sC.zxy-sC.yzx*1.618);
  vec2 sc=vec2(vP.x*u_ratio,1.-vP.y);
  float angleRad=u_angle*3.14159/180.;
  sc=rot(sc-.5,angleRad)+.5;
  sc=clamp(sc,0.,1.);
  float sl=sc.x-sc.y,an=u_time*.001;
  vec2 iC=fA();
  vec4 texSample=texture(u_tex,iC);
  float dp=texSample.r;
  float shapeMask=texSample.a;
  vec3 hi=u_lightColor*u_bright;
  vec3 lo=u_darkColor*(2.-u_bright);
  lo.b+=smoothstep(.6,1.4,sc.x+sc.y)*.08;
  vec2 fC=sc-.5;
  float rd=length(fC+vec2(0.,sl*.15));
  float cv=1.-pow(rd*1.65,1.15);
  cv*=pow(sc.y,.35);
  float vs=shapeMask;
  vs*=bM(iC,.01);
  float fr=pow(1.-cv,u_fresnel)*.3;
  vs=min(vs+fr*vs,1.);
  float mT=an*.0625;
  vec3 wO=vec3(-1.05,1.35,1.55);
  vec3 wA=aF(vec3(31.,73.,56.),mT+wO)*.22*u_wave;
  vec3 wB=aF(vec3(24.,64.,42.),mT-wO.yzx)*.22*u_wave;
  vec2 nC=sc*45.*u_noise;
  nC+=aF(sC.zxy,an*.17*sC.yzx-sc.yxy*.35).xy*18.*u_wave;
  vec3 tC=vec3(.00041,.00053,.00076)*mT+wB*nC.x+wA*nC.y;
  tC=lM(sC,tC);
  tC=lM(sC+1.618,tC);
  float tb=sin(tC.x*3.14159)*.5+.5;
  tb=tb*2.-1.;
  float noiseVal=pW(vec3(sc*8.+an,an*.5)).x;
  float edgeFactor=smoothstep(0.,.5,dp)*smoothstep(1.,.5,dp);
  float lD=dp+(1.-dp)*u_liquid*tb;
  lD+=noiseVal*u_distort*.15*edgeFactor;
  float rB=clamp(1.-cv,0.,1.);
  float bO=u_blur*rB;
  float vR=lD+sin(an*2.5)*bO*.03;
  float vG=lD+sin(an*2.5+2.094)*bO*.03;
  float vB=lD+sin(an*2.5+4.188)*bO*.03;
  float cOff=u_chroma*.02*(1.-dp);
  vR+=cOff;
  vB-=cOff;
  float cR=mix(lo.r,hi.r,smoothstep(0.,1.,vR));
  float cG=mix(lo.g,hi.g,smoothstep(0.,1.,vG));
  float cB=mix(lo.b,hi.b,smoothstep(0.,1.,vB));
  vec3 c=vec3(cR,cG,cB);
  c+=u_tint*.12*smoothstep(.3,.7,dp);
  c=mix(c,c*c*(3.-2.*c),u_contrast*.5);
  oC=vec4(c*vs,vs);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [1, 1, 1];
}

export interface MetallicPaintProps {
  imageSrc?: string;
  seed?: number;
  scale?: number;
  refraction?: number;
  blur?: number;
  liquid?: number;
  speed?: number;
  brightness?: number;
  contrast?: number;
  angle?: number;
  fresnel?: number;
  lightColor?: string;
  darkColor?: string;
  tintColor?: string;
  patternSharpness?: number;
  waveAmplitude?: number;
  noiseScale?: number;
  chromaticSpread?: number;
  distortion?: number;
  contour?: number;
  mouseAnimation?: boolean;
  className?: string;
}

export const MetallicPaint: React.FC<MetallicPaintProps> = ({
  imageSrc = '/azzura-emblem.svg',
  seed = 42,
  scale = 3.2,
  refraction = 0.015,
  blur = 0.012,
  liquid = 0.65,
  speed = 0.35,
  brightness = 1.8,
  contrast = 0.6,
  angle = 15,
  fresnel = 1.2,
  lightColor = '#FFFFFF',
  darkColor = '#050505',
  tintColor = '#A855F7',
  patternSharpness = 1.2,
  waveAmplitude = 0.9,
  noiseScale = 0.6,
  chromaticSpread = 1.8,
  distortion = 0.8,
  contour = 0.25,
  mouseAnimation = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animTimeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const mouseAnimRef = useRef(mouseAnimation);
  mouseAnimRef.current = mouseAnimation;

  const [ready, setReady] = useState(false);
  const [textureReady, setTextureReady] = useState(false);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    if (!gl) return false;
    glRef.current = gl;

    const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertShader, vertexShader);
    gl.compileShader(vertShader);

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragShader, fragmentShader);
    gl.compileShader(fragShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    const uNames = [
      'u_tex', 'u_time', 'u_ratio', 'u_imgRatio', 'u_seed', 'u_scale',
      'u_refract', 'u_blur', 'u_liquid', 'u_bright', 'u_contrast', 'u_angle',
      'u_fresnel', 'u_sharp', 'u_wave', 'u_noise', 'u_chroma', 'u_distort',
      'u_contour', 'u_lightColor', 'u_darkColor', 'u_tint'
    ];
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    uNames.forEach(name => {
      uniforms[name] = gl.getUniformLocation(program, name);
    });
    uniformsRef.current = uniforms;

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    return true;
  }, []);

  const processImage = (img: HTMLImageElement) => {
    const c = document.createElement('canvas');
    c.width = img.naturalWidth || img.width;
    c.height = img.naturalHeight || img.height;
    const ctx = c.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, c.width, c.height);
  };

  const uploadTexture = useCallback((imgData: ImageData) => {
    const gl = glRef.current;
    const uniforms = uniformsRef.current;
    if (!gl) return;

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgData);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const ratio = imgData.width / imgData.height;
    if (uniforms.u_imgRatio) gl.uniform1f(uniforms.u_imgRatio, ratio);
    if (uniforms.u_ratio) gl.uniform1f(uniforms.u_ratio, 1);

    textureRef.current = tex;
  }, []);

  useEffect(() => {
    if (!initGL()) return;

    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (canvas && gl) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, isMobile ? 1.0 : 1.5);
      const side = Math.round((isMobile ? 320 : 480) * dpr);
      canvas.width = side;
      canvas.height = side;
      gl.viewport(0, 0, side, side);
    }

    setReady(true);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (textureRef.current && glRef.current) {
        glRef.current.deleteTexture(textureRef.current);
      }
    };
  }, [initGL]);

  useEffect(() => {
    if (!ready || !imageSrc) return;

    setTextureReady(false);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const imgData = processImage(img);
      uploadTexture(imgData);
      setTextureReady(true);
    };
    img.src = imageSrc;
  }, [ready, imageSrc, uploadTexture]);

  useEffect(() => {
    const gl = glRef.current;
    const u = uniformsRef.current;
    if (!gl || !ready) return;

    if (u.u_seed) gl.uniform1f(u.u_seed, seed);
    if (u.u_scale) gl.uniform1f(u.u_scale, scale);
    if (u.u_refract) gl.uniform1f(u.u_refract, refraction);
    if (u.u_blur) gl.uniform1f(u.u_blur, blur);
    if (u.u_liquid) gl.uniform1f(u.u_liquid, liquid);
    if (u.u_bright) gl.uniform1f(u.u_bright, brightness);
    if (u.u_contrast) gl.uniform1f(u.u_contrast, contrast);
    if (u.u_angle) gl.uniform1f(u.u_angle, angle);
    if (u.u_fresnel) gl.uniform1f(u.u_fresnel, fresnel);

    const light = hexToRgb(lightColor);
    const dark = hexToRgb(darkColor);
    const tint = hexToRgb(tintColor);
    if (u.u_lightColor) gl.uniform3f(u.u_lightColor, light[0], light[1], light[2]);
    if (u.u_darkColor) gl.uniform3f(u.u_darkColor, dark[0], dark[1], dark[2]);
    if (u.u_sharp) gl.uniform1f(u.u_sharp, patternSharpness);
    if (u.u_wave) gl.uniform1f(u.u_wave, waveAmplitude);
    if (u.u_noise) gl.uniform1f(u.u_noise, noiseScale);
    if (u.u_chroma) gl.uniform1f(u.u_chroma, chromaticSpread);
    if (u.u_distort) gl.uniform1f(u.u_distort, distortion);
    if (u.u_contour) gl.uniform1f(u.u_contour, contour);
    if (u.u_tint) gl.uniform3f(u.u_tint, tint[0], tint[1], tint[2]);
  }, [
    ready,
    seed,
    scale,
    refraction,
    blur,
    liquid,
    brightness,
    contrast,
    angle,
    fresnel,
    lightColor,
    darkColor,
    patternSharpness,
    waveAmplitude,
    noiseScale,
    chromaticSpread,
    distortion,
    contour,
    tintColor
  ]);

  useEffect(() => {
    if (!ready || !textureReady) return;

    const gl = glRef.current;
    const u = uniformsRef.current;
    const canvas = canvasRef.current;
    if (!gl || !canvas) return;
    const mouse = mouseRef.current;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / rect.width;
      mouse.targetY = (e.clientY - rect.top) / rect.height;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = (time: number) => {
      if (!isVisible) {
        rafRef.current = null;
        return;
      }
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (mouseAnimRef.current) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
        animTimeRef.current = mouse.x * 3000 + mouse.y * 1500;
      } else {
        animTimeRef.current += delta * speedRef.current;
      }

      if (u.u_time) gl.uniform1f(u.u_time, animTimeRef.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause loop when out of viewport
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !rafRef.current) {
        lastTimeRef.current = performance.now();
        rafRef.current = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });
    io.observe(canvas);

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ready, textureReady]);

  return <canvas ref={canvasRef} className={`paint-container ${className}`.trim()} />;
};

export default MetallicPaint;
