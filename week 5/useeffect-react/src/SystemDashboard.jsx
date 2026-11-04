import { useEffect, useState } from "react";

function SystemDashboard() {
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [network, setNetwork] = useState(0);

  // CPU MONITOR
  useEffect(() => {
    const cpuInterval = setInterval(() => {
      const usage = Math.floor(Math.random() * 100);

      setCpu(usage);

      if (usage > 80) {
        alert("⚠️ CPU usage too high!");
      }
    }, 2000);

    return () => {
      clearInterval(cpuInterval);
      console.log("🧹 CPU monitor stopped.");
    };
  }, []);

  // MEMORY MONITOR
  useEffect(() => {
    const memoryInterval = setInterval(() => {
      const usage = Math.floor(Math.random() * 100);

      setMemory(usage);
    }, 2500);

    return () => {
      clearInterval(memoryInterval);
      console.log("🧹 Memory monitor stopped.");
    };
  }, []);

  // NETWORK MONITOR
  useEffect(() => {
    const networkInterval = setInterval(() => {
      const usage = Math.floor(Math.random() * 100);

      setNetwork(usage);

      localStorage.setItem("networkUsage", usage);
    }, 3000);

    return () => {
      clearInterval(networkInterval);
      console.log("🧹 Network monitor stopped.");
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="small-title">LIVE MONITORING</p>
          <h2>System Monitor</h2>
        </div>

        <div className="live">
          <span></span>
          LIVE
        </div>
      </div>

      <div className="cards">

        {/* CPU */}
        <div className="monitor-card">
          <div className="icon">⚡</div>

          <p>CPU USAGE</p>

          <h2>{cpu}%</h2>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${cpu}%` }}
            ></div>
          </div>

          <small>
            {cpu > 80 ? "⚠️ High usage" : "System normal"}
          </small>
        </div>

        {/* MEMORY */}
        <div className="monitor-card">
          <div className="icon">▣</div>

          <p>MEMORY USAGE</p>

          <h2>{memory}%</h2>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${memory}%` }}
            ></div>
          </div>

          <small>Memory monitoring</small>
        </div>

        {/* NETWORK */}
        <div className="monitor-card">
          <div className="icon">⌁</div>

          <p>NETWORK USAGE</p>

          <h2>{network}%</h2>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${network}%` }}
            ></div>
          </div>

          <small>Network activity</small>
        </div>

      </div>

      <div className="info">
        <span className="green-dot"></span>
        All monitoring services are running
      </div>
    </div>
  );
}

export default SystemDashboard;