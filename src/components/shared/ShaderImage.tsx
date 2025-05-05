"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import {
  proceduralVariation,
  silkMotionPath,
} from "@/utils/animations/goldenRatio";

interface ShaderImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  intensity?: number;
  variationSeed?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * Advanced WebGL-based image component with custom shaders
 * Provides luxury-level visual treatments and transitions not possible with CSS
 */
const ShaderImage: React.FC<ShaderImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  intensity = 0.5,
  variationSeed = "default",
  priority = false,
  onLoad,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureRef = useRef<HTMLImageElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const requestRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const variationX = proceduralVariation(`${variationSeed}-x`, -0.02, 0.02);
  const variationY = proceduralVariation(`${variationSeed}-y`, -0.02, 0.02);
  const variationTiming = proceduralVariation(
    `${variationSeed}-timing`,
    0.8,
    1.2
  );

  // Vertex shader - positions the quad that will display our image
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    
    uniform mat3 u_matrix;
    
    varying vec2 v_texCoord;
    
    void main() {
      // Apply transformation matrix
      vec3 position = u_matrix * vec3(a_position, 1.0);
      
      // Convert from 0->1 to clip space -1->1
      gl_Position = vec4(position.xy * 2.0 - 1.0, 0.0, 1.0);
      
      // Pass the texture coord to the fragment shader
      v_texCoord = a_texCoord;
    }
  `;

  // Fragment shader - luxury image processing with subtle variations
  const fragmentShaderSource = `
    precision mediump float;
    
    uniform sampler2D u_image;
    uniform float u_time;
    uniform float u_intensity;
    uniform vec2 u_resolution;
    uniform vec2 u_variation;
    
    varying vec2 v_texCoord;
    
    // Gold tint color - ultra-subtle warming effect
    const vec3 goldTint = vec3(1.02, 0.99, 0.95);
    
    // Vignette effect for artistic focus and luxury framing
    float vignette(vec2 uv, float intensity) {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(uv, center);
      return smoothstep(0.8, 0.2, dist * intensity);
    }
    
    // Silk-like wave distortion
    vec2 silkDistortion(vec2 uv, float time, float intensity) {
      float distortionX = sin(uv.y * 10.0 + time * 0.5) * 0.001 * intensity;
      float distortionY = cos(uv.x * 10.0 + time * 0.3) * 0.001 * intensity;
      return vec2(distortionX, distortionY);
    }
    
    void main() {
      // Apply procedural variation to texture coordinates
      vec2 texCoord = v_texCoord + u_variation * 0.3;
      
      // Apply subtle silk-like wave motion
      vec2 distortion = silkDistortion(texCoord, u_time, u_intensity);
      vec2 distortedCoord = texCoord + distortion;
      
      // Sample the texture
      vec4 color = texture2D(u_image, distortedCoord);
      
      // Apply ultra-subtle gold tint (luxury warmth)
      color.rgb *= goldTint;
      
      // Apply delicate vignette for focus and framing
      float vignetteAmount = vignette(texCoord, 1.5);
      color.rgb *= mix(0.92, 1.0, vignetteAmount);
      
      // Apply subtle vignette-based edge enhancement
      color.rgb = mix(color.rgb, color.rgb * 1.05, (1.0 - vignetteAmount) * 0.5);
      
      // Output the final color
      gl_FragColor = color;
    }
  `;

  // Initialize WebGL and shaders - memoized with useCallback
  const initGL = useCallback(
    function initGL() {
      if (
        !canvasRef.current ||
        !textureRef.current ||
        !textureRef.current.complete
      )
        return;

      const canvas = canvasRef.current;
      const gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });

      if (!gl) {
        console.error("WebGL not supported");
        return;
      }

      glRef.current = gl;

      // Compile shaders
      const vertexShader = compileShader(
        gl,
        gl.VERTEX_SHADER,
        vertexShaderSource
      );
      const fragmentShader = compileShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
      );

      if (!vertexShader || !fragmentShader) return;

      // Create and link program
      const program = gl.createProgram();
      if (!program) return;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Could not link program", gl.getProgramInfoLog(program));
        return;
      }

      programRef.current = program;

      // Set up geometry - a quad that covers the canvas
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
        gl.STATIC_DRAW
      );

      // Set up texture coordinates
      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
        gl.STATIC_DRAW
      );

      // Create and bind texture
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Set texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Upload image to texture
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textureRef.current
      );

      // Prep for rendering
      gl.useProgram(program);

      // Lookup attribute locations
      const positionLocation = gl.getAttribLocation(program, "a_position");
      const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

      // Bind position buffer and set attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Bind texCoord buffer and set attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

      // Set canvas dimensions to match image with devicePixelRatio for retina
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      setCanvasInitialized(true);
    },
    [vertexShaderSource, fragmentShaderSource, canvasRef, textureRef]
  );

  // Compile individual shaders
  const compileShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(
        `Error compiling ${
          type === gl.VERTEX_SHADER ? "vertex" : "fragment"
        } shader:`,
        gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  // Animation loop for shader - memoized with useCallback
  const animate = useCallback(
    function animate() {
      if (!canvasRef.current || !glRef.current || !programRef.current) return;

      const gl = glRef.current;
      const program = programRef.current;

      // Calculate time value for animations (adjusted with procedural variation)
      timeRef.current += 0.003 * variationTiming;
      const timeValue = timeRef.current;

      // Clear canvas and prepare for drawing
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Set uniforms
      const timeLocation = gl.getUniformLocation(program, "u_time");
      const intensityLocation = gl.getUniformLocation(program, "u_intensity");
      const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
      const variationLocation = gl.getUniformLocation(program, "u_variation");
      const matrixLocation = gl.getUniformLocation(program, "u_matrix");

      // Calculate a silk-like motion path if in view
      const [transX, transY] = isInView
        ? silkMotionPath(Math.sin(timeValue * 0.5) * 0.5 + 0.5)
        : [0, 0];

      // Create transformation matrix
      // This is a simple 2D matrix: [a c e; b d f; 0 0 1]
      // Where a,b,c,d control scaling/rotation and e,f control translation
      const matrix = [
        1.0,
        0.0,
        0.0, // a, b, e
        0.0,
        1.0,
        0.0, // c, d, f
      ];

      // Apply subtle movement if in view
      if (isInView) {
        matrix[2] = transX * 0.01 * intensity; // e: translate x
        matrix[5] = transY * 0.01 * intensity; // f: translate y
      }

      gl.uniform1f(timeLocation, timeValue);
      gl.uniform1f(intensityLocation, isInView ? intensity : 0);
      gl.uniform2f(
        resolutionLocation,
        canvasRef.current.width,
        canvasRef.current.height
      );
      gl.uniform2f(variationLocation, variationX, variationY);
      gl.uniformMatrix3fv(matrixLocation, false, matrix);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Continue animation loop
      requestRef.current = requestAnimationFrame(animate);
    },
    [
      intensity,
      isInView,
      variationTiming,
      variationX,
      variationY,
      canvasRef,
      glRef,
      programRef,
    ]
  );

  // Handle image loading
  useEffect(() => {
    const image = new window.Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      textureRef.current = image;
      setImageLoaded(true);
      if (onLoad) onLoad();
    };

    return () => {
      image.onload = null;
    };
  }, [src, onLoad]);

  // Initialize GL when image loads and canvas is ready
  useEffect(() => {
    if (imageLoaded && canvasRef.current) {
      initGL();
    }
  }, [imageLoaded, initGL]);

  // Start/stop animation loop based on in-view status
  useEffect(() => {
    if (canvasInitialized) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [canvasInitialized, isInView, animate]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && glRef.current) {
        const canvas = canvasRef.current;
        const gl = glRef.current;

        const dpr = window.devicePixelRatio || 1;
        const displayWidth = Math.floor(canvas.clientWidth * dpr);
        const displayHeight = Math.floor(canvas.clientHeight * dpr);

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
          gl.viewport(0, 0, displayWidth, displayHeight);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        aspectRatio: !height && width ? "auto" : undefined,
      }}
    >
      {/* Fallback image for non-WebGL environments - using Next/Image to resolve LCP warning */}
      <Image
        src={src}
        alt={alt}
        width={width || 1200}
        height={height || 800}
        className={`absolute inset-0 w-full h-full object-cover opacity-0 ${
          !canvasInitialized ? "opacity-100" : ""
        }`}
        style={{
          transition: "opacity 0.5s ease-in-out",
          willChange: "opacity",
          objectFit: "cover",
        }}
        priority={priority}
        unoptimized={false}
      />

      {/* WebGL canvas for advanced effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{
          opacity: canvasInitialized ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
};

export default ShaderImage;
