import React, { useState, useEffect, useRef } from "react";

const chips = [
  { id: 1, label: "Scope AI integration", col: 0, row: 0, mx: "6%", my: 24, mr: -8, status: "planned" },
  { id: 2, label: "Resource planning", col: 0, row: 1, mx: "40%", my: 160, mr: 6, status: "planned" },
  { id: 3, label: "Set tech milestones", col: 0, row: 2, mx: "68%", my: 34, mr: 10, status: "planned" },
  { id: 4, label: "Manage daily sprints", col: 1, row: 0, mx: "18%", my: 214, mr: 5, status: "in-progress" },
  { id: 5, label: "Cross-team syncs", col: 1, row: 1, mx: "54%", my: 92, mr: -6, status: "in-progress" },
  { id: 6, label: "Oversee AI integration", col: 1, row: 2, mx: "66%", my: 206, mr: -10, status: "in-progress" },
  { id: 7, label: "QA & sign-off", col: 2, row: 0, mx: "2%", my: 112, mr: 12, status: "delivered" },
  { id: 8, label: "Product launch", col: 2, row: 1, mx: "33%", my: 44, mr: -4, status: "delivered" },
  { id: 9, label: "Client handover", col: 2, row: 2, mx: "36%", my: 222, mr: -7, status: "delivered" },
];

const statusColors: Record<string, string> = {
  "planned": "#a3acc8",
  "in-progress": "#fbbf24",
  "delivered": "#4ade80",
};

export function TaskStage() {
  const [isManaged, setIsManaged] = useState(false);
  const userToggled = useRef(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsManaged(true);
      return;
    }

    const timer = setTimeout(() => {
      if (!userToggled.current) {
        setIsManaged(true);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (state: boolean) => {
    userToggled.current = true;
    setIsManaged(state);
  };

  const css = `
    .task-stage-root {
      font-family: "Hanken Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --line: rgba(160, 180, 255, 0.18);
      --muted: #a3acc8;
      --accent: #3b82f6;
      --stage-bg: rgba(8, 14, 38, 0.55);
      --toggle-bg: rgba(10, 18, 48, 0.6);
      --chip-bg: #101b45;
      max-width: 1080px;
      margin: 0 auto;
      width: 100%;
    }
    
    .task-stage-toggle-btn {
      padding: 7px 18px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 500;
      color: var(--muted);
      transition: all 0.2s;
    }
    .task-stage-toggle-btn[aria-pressed="true"] {
      background-color: var(--accent);
      color: #ffffff;
    }
    .task-stage-toggle-btn:focus-visible {
      outline: 2px solid #8db6fb;
      outline-offset: 3px;
    }

    .task-stage-board {
      position: relative;
      height: 340px;
      border-radius: 20px;
      border: 1px solid var(--line);
      background-color: var(--stage-bg);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      overflow: hidden;
      margin: 24px 0;
    }
    @media (max-width: 719px) {
      .task-stage-board {
        height: 270px;
      }
    }

    .task-stage-col-header {
      position: absolute;
      top: 18px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--muted);
      opacity: 0;
      transition: opacity 0.5s ease;
      transition-delay: 0s;
      pointer-events: none;
    }
    .task-stage-board.managed .task-stage-col-header {
      opacity: 1;
      transition-delay: 0.5s;
    }
    .col-0 { left: 3%; }
    .col-1 { left: 35.5%; }
    .col-2 { left: 68%; }

    .task-stage-chip {
      position: absolute;
      width: 29%;
      height: 48px;
      border-radius: 12px;
      border: 1px solid var(--line);
      background-color: var(--chip-bg);
      display: flex;
      align-items: center;
      padding: 0 12px;
      gap: 8px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 13.5px;
      font-weight: 500;
      white-space: nowrap;
      
      /* Base transitions (respects reduced motion implicitly via media query logic, 
         but we'll add standard CSS media query for safety) */
      transition: left 0.95s, top 0.95s, transform 0.95s, box-shadow 0.95s;
      transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    
    .task-stage-chip span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media (prefers-reduced-motion: reduce) {
      .task-stage-chip, .task-stage-col-header {
        transition: none !important;
      }
    }

    @media (max-width: 719px) {
      .task-stage-chip {
        height: 40px;
        font-size: 12px;
        padding: 0 8px;
        gap: 6px;
      }
    }

    /* Messy State */
    .task-stage-board.messy .task-stage-chip {
      left: var(--mx);
      top: var(--my);
      transform: rotate(var(--mr));
      box-shadow: 0 10px 24px -12px rgba(0,0,0,0.7);
    }

    /* Managed State */
    .task-stage-board.managed .task-stage-chip {
      left: var(--col-x);
      top: var(--col-y);
      transform: rotate(0deg);
      box-shadow: none;
    }

    ${chips.map((c, i) => `
      .chip-${c.id} {
        --mx: ${c.mx};
        --my: ${c.my}px;
        --mr: ${c.mr}deg;
        --col-x: calc(3% + ${c.col * 32.5}%);
        --col-y: calc(64px + ${c.row * 74}px);
        transition-delay: ${i * 55}ms;
      }
      @media (max-width: 719px) {
        .chip-${c.id} {
          --col-y: calc(48px + ${c.row * 56}px);
        }
      }
    `).join('\n')}
  `;

  return (
    <div className="task-stage-root">
      <style>{css}</style>
      
      {/* Toggle Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[var(--muted)] text-sm">
          Same nine tasks, two ways to run them
        </div>
        <div 
          className="inline-flex p-1 rounded-full border border-[var(--line)] bg-[var(--toggle-bg)]"
          role="group" 
          aria-label="Task board state"
        >
          <button
            type="button"
            className="task-stage-toggle-btn"
            aria-pressed={!isManaged}
            onClick={() => handleToggle(false)}
          >
            Messy
          </button>
          <button
            type="button"
            className="task-stage-toggle-btn"
            aria-pressed={isManaged}
            onClick={() => handleToggle(true)}
          >
            Managed
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className={`task-stage-board ${isManaged ? 'managed' : 'messy'}`}>
        {/* Column Headers */}
        <div className="task-stage-col-header col-0">Planned</div>
        <div className="task-stage-col-header col-1">In progress</div>
        <div className="task-stage-col-header col-2">Delivered</div>

        {/* Chips */}
        {chips.map((chip) => (
          <div key={chip.id} className={`task-stage-chip chip-${chip.id}`}>
            <div 
              className="w-2 h-2 rounded-full shrink-0" 
              style={{ backgroundColor: statusColors[chip.status] }} 
            />
            <span>{chip.label}</span>
          </div>
        ))}
      </div>

      {/* Caption */}
      <div 
        className="text-center text-[var(--muted)] text-sm transition-opacity duration-300"
        aria-live="polite"
      >
        {isManaged 
          ? "Every task has an owner, a lane and a next step." 
          : "Everyone's busy, nobody's sure what comes next."}
      </div>
    </div>
  );
}
