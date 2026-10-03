import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { projects, ProjectItem } from "@/lib/data";
import { CaseStudy } from "@/components/CaseStudy";



export function Projects() {
  const [active, setActive] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bluePathRef = useRef<SVGPathElement>(null);

  const [pathD, setPathD] = useState("");
  const [nodes, setNodes] = useState<{x: number, y: number, side: number, cardX: number}[]>([]);
  const [pathLength, setPathLength] = useState(0);
  const [currentL, setCurrentL] = useState(0);
  const [headPos, setHeadPos] = useState({ x: 0, y: 0 });
  
  const [hitNodes, setHitNodes] = useState<boolean[]>(Array(projects.length).fill(false));
  const [seenRows, setSeenRows] = useState<boolean[]>(Array(projects.length).fill(false));

  const [sampledPoints, setSampledPoints] = useState<{l: number, y: number}[]>([]);

  // 1. Measure and rebuild SVG path on resize/load
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const rows = container.querySelectorAll('.project-row');
      const isMobile = window.innerWidth <= 860;
      const centerX = isMobile ? 14 : container.clientWidth / 2;
      
      const newNodes: typeof nodes = [];
      const containerTop = container.getBoundingClientRect().top;

      let d = `M ${centerX} 0 `;

      rows.forEach((row, idx) => {
        const card = row.querySelector('.project-card');
        if (!card) return;
        
                        const rect = card.getBoundingClientRect();
        // Place the node exactly at the bottom border of the card
        const cardY = rect.bottom - containerTop + 32; 
        
        let side = 1; // right
        if (!isMobile) {
          side = (idx % 2 === 0) ? -1 : 1; // zig-zag
        }
        
        const x = isMobile ? 14 : centerX;
        
        // Make the line run along the top border of the card
        let cardX = 0;
        const containerLeft = container.getBoundingClientRect().left;
        if (isMobile) {
          cardX = rect.right - containerLeft - 16; // stop at border radius
        } else {
          if (side === -1) {
            cardX = rect.left - containerLeft + 16; // left card
          } else {
            cardX = rect.right - containerLeft - 16; // right card
          }
        }
        
        newNodes.push({ x, y: cardY, side, cardX });

                if (idx === 0) {
          d += `L ${centerX} ${cardY} `;
        } else {
          d += `L ${centerX} ${cardY} `;
        }
      });

      if (newNodes.length > 0) {
        d += `L ${newNodes[newNodes.length - 1].x} ${newNodes[newNodes.length - 1].y + 120}`;
      }

      setNodes(newNodes);
      setPathD(d);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener('resize', measure);
    
    // Slight delay to ensure fonts/layout settled
    const t = setTimeout(measure, 150);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, []);

  // 2. Sample path length once path is drawn
  useLayoutEffect(() => {
    if (bluePathRef.current && pathD) {
      const len = bluePathRef.current.getTotalLength();
      setPathLength(len);
      
      const samples = 600;
      const points = [];
      for (let i = 0; i < samples; i++) {
        const l = (i / (samples - 1)) * len;
        points.push({ l, y: bluePathRef.current.getPointAtLength(l).y });
      }
      setSampledPoints(points);
    }
  }, [pathD]);

  // 3. Scroll logic
  useLayoutEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (!container || sampledPoints.length === 0) {
            ticking = false;
            return;
          }

          const readingLine = window.innerHeight * 0.6;
          const targetY = readingLine - container.getBoundingClientRect().top;
          
          let L = 0;
          if (targetY <= 0) {
            L = 0;
          } else if (targetY >= sampledPoints[sampledPoints.length - 1].y) {
            L = pathLength;
          } else {
            // Binary search to find L where y ~ targetY
            let min = 0, max = sampledPoints.length - 1;
            while (min <= max) {
              const mid = Math.floor((min + max) / 2);
              if (sampledPoints[mid].y < targetY) {
                L = sampledPoints[mid].l;
                min = mid + 1;
              } else {
                max = mid - 1;
              }
            }
          }
          
          setCurrentL(L);
          if (bluePathRef.current && L > 0 && L < pathLength) {
            const pt = bluePathRef.current.getPointAtLength(L);
            setHeadPos({ x: pt.x, y: pt.y });
          }

          // Hit logic
          const newHit = nodes.map(n => targetY >= n.y);
          setHitNodes(newHit);

          // Seen logic (fade in rows earlier than the hit)
          const rows = container.querySelectorAll('.project-row');
          const newSeen = Array.from(rows).map(row => {
            const rowTop = row.getBoundingClientRect().top;
            return rowTop < (readingLine + 120);
          });
          setSeenRows(newSeen);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, [nodes, pathLength, sampledPoints]);

  return (
    <section id="projects" className="relative bg-[#050816] py-16 md:py-32 overflow-hidden" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
      
      {/* Header */}
      <div className="mx-auto max-w-[620px] text-center mb-24 px-6">
        <h2 
          className="text-text mb-4 tracking-tight" 
          style={{ fontFamily: '"Fraunces", serif', fontWeight: 400, fontSize: 'clamp(2.2rem, 4.6vw, 3.3rem)' }}
        >
          Projects I've delivered
        </h2>
        <p className="text-muted text-lg max-w-[500px] mx-auto">
          A selection of products and platforms I've managed from initial concept through to final deployment.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="timeline-container w-full" ref={containerRef}>
        
        {/* SVG Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" aria-hidden="true" style={{ zIndex: 0 }}>
          {/* Base dim path */}
          {pathD && <path d={pathD} stroke="rgba(160,180,255,.16)" strokeWidth="2" fill="none" />}
          
          {/* Active blue path */}
          {pathD && (
            <path 
              ref={bluePathRef}
              className="blue-path"
              d={pathD} 
              stroke="#3b82f6" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              fill="none" 
              style={{ filter: 'drop-shadow(0 0 6px rgba(59,130,246,.75))' }}
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength - currentL}
            />
          )}

          {nodes.map((n, i) => (
            <g key={i}>
              <line 
                 x1={n.x} y1={n.y} x2={n.cardX} y2={n.y} 
                 stroke="rgba(160,180,255,.16)" strokeWidth="2" 
              />
              <line 
                 className="blue-branch transition-all ease-[cubic-bezier(.2,.8,.2,1)] duration-800"
                 x1={n.x} y1={n.y} x2={n.cardX} y2={n.y} 
                 stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"
                 strokeDasharray="1"
                 pathLength="1"
                 strokeDashoffset={hitNodes[i] ? 0 : 1}
                 style={{ filter: 'drop-shadow(0 0 6px rgba(59,130,246,.75))' }}
              />
              <circle 
                className="node-circle transition-all duration-300"
                cx={n.x} cy={n.y} r="9" 
                fill={hitNodes[i] ? "#3b82f6" : "#050816"}
                stroke={hitNodes[i] ? "#fff" : "#5b6794"}
                strokeWidth="2"
                style={{ filter: hitNodes[i] ? 'drop-shadow(0 0 6px rgba(59,130,246,.75))' : 'none' }}
              />
            </g>
          ))}

          {/* Glowing head dot */}
          {currentL > 0 && currentL < pathLength && (
             <circle className="head-dot" cx={headPos.x} cy={headPos.y} r="4" fill="#fff" style={{ filter: 'drop-shadow(0 0 8px #fff)' }} />
          )}
        </svg>

        {/* Project Rows */}
        <div className="relative z-10 w-full px-6 md:px-12">
          {projects.map((p, i) => (
            <div className={`project-row ${seenRows[i] ? 'seen' : ''}`} key={p.id}>
              
              <div className="project-card flex flex-col p-6 md:p-8">
                <div className="text-[0.85rem] text-muted font-medium mb-3">{p.duration}</div>
                <h3 style={{ fontFamily: '"Fraunces", serif' }} className="text-[1.7rem] font-bold text-text leading-tight tracking-tight mb-4">
                  {p.name}
                </h3>
                <p className="text-body text-[1.05rem] leading-relaxed mb-6">
                  {p.description}
                </p>
                <div className="flex items-start gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue mt-2 flex-shrink-0"></div>
                  <span className="text-white font-medium text-[0.95rem]">{p.result}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {p.tools.map((t, idx) => (
                    <span key={idx} className="px-4 py-1.5 rounded-full border border-line bg-line text-muted text-[0.85rem] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-info flex flex-col pt-6 md:pt-8 transform transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] translate-x-0">
                 <h4 className="text-blue-soft font-semibold text-[15px] mb-3">About the project</h4>
                 <p className="text-body text-[1.02rem] leading-[1.6] mb-[20px] max-w-[400px]">
                   A detailed overview of how I transformed a raw concept into a fully functional product, managing stakeholders and aligning the technical team throughout the entire lifecycle.
                 </p>
                 <div className="flex items-center gap-[22px] actions-row flex-wrap">
                   <a 
                     href={p.url} 
                     target="_blank" 
                     rel="noopener" 
                     className="text-blue-soft font-medium underline hover:text-white transition-colors focus-visible:outline-none"
                     style={{ textUnderlineOffset: '5px', textDecorationColor: 'rgba(141,182,251,.4)' }}
                   >
                     Live link ↗
                   </a>
                   <button 
                     onClick={() => setActive(p)}
                     className="bg-blue text-white font-semibold text-[0.92rem] rounded-full px-[20px] py-[10px] hover:bg-blue-soft hover:-translate-y-px transition-all focus-visible:outline-none"
                   >
                     Read more
                   </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .timeline-container { max-width: 1120px; margin: 0 auto; position: relative; }
        .project-row { 
            display: grid; 
            grid-template-columns: 1fr 208px 1fr; 
            align-items: center; 
            gap: 0;
            padding-bottom: 32px;
            margin-bottom: 72px; 
          }
        .project-row:last-child { margin-bottom: 0; }
        
        .project-card {
            grid-row: 1;
            position: relative;
            z-index: 1;
            border: 1px solid rgba(160,180,255,.16);
          border-radius: 16px;
          padding: 12px 12px 18px;
          background: linear-gradient(to bottom, rgba(20,32,80,.45), rgba(10,16,44,.55));
          max-width: 440px;
          width: 100%;
        }
        .project-info {
            max-width: 380px;
            width: 100%;
            grid-row: 1;
          }
        
        /* Desktop zig-zag */
        .project-row:nth-child(odd) .project-card { grid-column: 1; justify-self: end; }
        .project-row:nth-child(odd) .project-info { grid-column: 3; justify-self: start; text-align: left; }
        
        .project-row:nth-child(even) .project-info { grid-column: 1; justify-self: end; text-align: right; }
        .project-row:nth-child(even) .project-card { grid-column: 3; justify-self: start; }
        
        .project-row:nth-child(even) .project-info .actions-row { justify-content: flex-end; }
        
        .fake-browser {
          width: 100%; aspect-ratio: 16/10; border-radius: 10px; margin-bottom: 18px;
          position: relative; overflow: hidden;
        }
        
        /* Fade up logic */
        .project-card, .project-info {
          opacity: 0.22;
          transition: opacity 0.7s ease;
        }
        .project-info {
          transition-delay: 0.15s;
        }
        .project-row.seen .project-card, .project-row.seen .project-info {
          opacity: 1;
        }
        
        
        /* Info block starting positions */
        .project-row:nth-child(odd) .project-info {
           transform: translateX(18px);
        }
        .project-row:nth-child(even) .project-info {
           transform: translateX(-18px);
        }
        .project-row.seen .project-info {
           transform: translateX(0);
        }
        
        @media (max-width: 860px) {
          .project-row {
             display: flex;
             flex-direction: column;
             align-items: flex-start;
             padding-left: 0;
             padding-right: 0;
             gap: 20px;
             margin-bottom: 48px;
          }
          .project-card, .project-info { justify-self: stretch; max-width: 100%; text-align: left !important; grid-row: auto; }
          .project-row:nth-child(even) .project-info { order: 2; }
          .project-row:nth-child(even) .project-card { order: 1; }
          .project-row:nth-child(even) .project-info .actions-row { justify-content: flex-start; }
          .svg-timeline { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .blue-path, .blue-branch { stroke-dashoffset: 0 !important; transition: none !important; }
          .project-card, .project-info { opacity: 1 !important; transition: none !important; }
          .node-circle { fill: #3b82f6 !important; stroke: #fff !important; filter: drop-shadow(0 0 6px rgba(59,130,246,.75)) !important; transition: none !important; }
          .head-dot { display: none !important; }
        }
      `}} />
      <CaseStudy project={active} onClose={() => setActive(null)} />
    </section>
  );
}
