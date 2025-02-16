import React from "react";

export default function GanttChart({ scheduledProcesses }) {
  if (!scheduledProcesses || scheduledProcesses.length === 0) {
    return <p>No processes to display.</p>;
  }

  const barHeight = 30; // Height of each bar
  const gap = 20; // Space between bars
  const textSpacing = 6; // Additional spacing for time labels
  const chartHeight = (barHeight + gap) * scheduledProcesses.length; // Total chart height

  // Calculate total time range
  const totalTime = Math.max(
    ...scheduledProcesses.map((p) => p.completionTime)
  );

  return (
    <svg width="100%" height={chartHeight}>
      {scheduledProcesses.map((process, index) => {
        const startX = (process.startTime / totalTime) * 100; // Start position based on total time
        const barWidth =
          ((process.completionTime - process.startTime) / totalTime) * 100; // Width based on process duration

        return (
          <g key={process.id}>
            {/* Bar for the process */}
            <rect
              x={`${startX}%`}
              y={index * (barHeight + gap)} // Vertical position based on index
              width={`${barWidth}%`}
              height={barHeight}
              fill="#007bff"
              stroke="black"
              strokeWidth="0.5"
            />
            {/* Label inside the bar */}
            <text
              x={`${startX + barWidth / 2}%`}
              y={index * (barHeight + gap) + barHeight / 1.5}
              textAnchor="middle"
              fill="white"
              fontSize="14"
            >
              P{process.id}
            </text>
            {/* Start time label */}
            <text
              x={`${startX}%`}
              y={index * (barHeight + gap) + barHeight + textSpacing + 15} // Add spacing for better visibility
              fontSize="12"
              fill="black"
              textAnchor="middle"
            >
              {process.startTime}
            </text>
            {/* End time label */}
            <text
              x={`${startX + barWidth}%`}
              y={index * (barHeight + gap) + barHeight + textSpacing + 15} // Add spacing for better visibility
              fontSize="12"
              fill="black"
              textAnchor="middle"
            >
              {process.completionTime}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
