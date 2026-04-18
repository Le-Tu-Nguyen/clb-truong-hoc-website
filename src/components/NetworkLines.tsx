"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
}

export default function NetworkLines() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const BOUNDS_PADDING = 120;
    const DEPTH = 420;
    const FOCAL = 540;

    const getBounds = () => {
      const rect = svg.getBoundingClientRect();
      return {
        width: Math.max(rect.width, 320),
        height: Math.max(rect.height, 420),
      };
    };

    let { width, height } = getBounds();

    const nodeCount = width < 768 ? 26 : 42;
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * (width + BOUNDS_PADDING * 2) - BOUNDS_PADDING,
      y: Math.random() * (height + BOUNDS_PADDING * 2) - BOUNDS_PADDING,
      z: Math.random() * DEPTH - DEPTH * 0.5,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      vz: (Math.random() - 0.5) * 0.36,
      size: 0.8 + Math.random() * 2.4,
    }));

    svg.innerHTML = `
      <defs>
        <radialGradient id="networkNodeGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
          <stop offset="45%" stop-color="#74b6ff" stop-opacity="0.82" />
          <stop offset="100%" stop-color="#2f7de8" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="networkLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c6e2ff" stop-opacity="0.05" />
          <stop offset="50%" stop-color="#73b5ff" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#4a94ff" stop-opacity="0.08" />
        </linearGradient>
      </defs>
      <g class="lines-group"></g>
      <g class="nodes-group"></g>
    `;

    const nodesGroup = svg.querySelector(".nodes-group") as SVGGElement | null;
    const linesGroup = svg.querySelector(".lines-group") as SVGGElement | null;
    if (!nodesGroup || !linesGroup) return;

    const projectNode = (node: Node) => {
      const perspective = FOCAL / (FOCAL + node.z + DEPTH * 0.6);
      const px = width * 0.5 + (node.x - width * 0.5) * perspective;
      const py = height * 0.5 + (node.y - height * 0.5) * perspective;
      const pr = Math.max(0.45, node.size * perspective);
      return { px, py, pr, perspective };
    };

    const animate = () => {
      const nodes = nodesRef.current;
      const connectionDistance = width < 768 ? 108 : 146;
      const zConnectionDistance = DEPTH * 0.58;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        if (node.x < -BOUNDS_PADDING || node.x > width + BOUNDS_PADDING) {
          node.vx *= -1;
          node.x = Math.max(-BOUNDS_PADDING, Math.min(width + BOUNDS_PADDING, node.x));
        }
        if (node.y < -BOUNDS_PADDING || node.y > height + BOUNDS_PADDING) {
          node.vy *= -1;
          node.y = Math.max(-BOUNDS_PADDING, Math.min(height + BOUNDS_PADDING, node.y));
        }
        if (node.z < -DEPTH * 0.5 || node.z > DEPTH * 0.5) {
          node.vz *= -1;
          node.z = Math.max(-DEPTH * 0.5, Math.min(DEPTH * 0.5, node.z));
        }
      });

      linesGroup.innerHTML = "";
      nodesGroup.innerHTML = "";

      const projected = nodes.map((node) => ({
        ...projectNode(node),
        z: node.z,
      }));

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = projected[j].px - projected[i].px;
          const dy = projected[j].py - projected[i].py;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const zDistance = Math.abs(projected[j].z - projected[i].z);

          if (distance < connectionDistance && zDistance < zConnectionDistance) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", String(projected[i].px));
            line.setAttribute("y1", String(projected[i].py));
            line.setAttribute("x2", String(projected[j].px));
            line.setAttribute("y2", String(projected[j].py));
            const depthFactor = (projected[i].perspective + projected[j].perspective) * 0.5;
            const opacity = Math.max(0.04, (1 - distance / connectionDistance) * depthFactor * 0.95);
            line.setAttribute("stroke", "url(#networkLineGradient)");
            line.setAttribute("stroke-opacity", String(opacity));
            line.setAttribute("stroke-width", String(0.45 + depthFactor * 1.4));
            line.setAttribute("class", "network-line");
            line.style.pointerEvents = "none";
            linesGroup.appendChild(line);
          }
        }
      }

      projected.forEach((node) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", String(node.px));
        circle.setAttribute("cy", String(node.py));
        circle.setAttribute("r", String(node.pr));
        circle.setAttribute("fill", "url(#networkNodeGlow)");
        circle.setAttribute("fill-opacity", String(Math.max(0.3, Math.min(0.98, node.perspective * 1.25))));
        circle.setAttribute("class", "network-node");
        nodesGroup.appendChild(circle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const next = getBounds();
      width = next.width;
      height = next.height;

      nodesRef.current.forEach((node) => {
        node.x = Math.max(-BOUNDS_PADDING, Math.min(width + BOUNDS_PADDING, node.x));
        node.y = Math.max(-BOUNDS_PADDING, Math.min(height + BOUNDS_PADDING, node.y));
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="network-svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
    />
  );
}
