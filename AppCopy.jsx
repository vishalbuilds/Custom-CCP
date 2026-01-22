import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Pause,
  Play,
  Users,
  Clock,
  UserCircle,
  Settings,
  Wifi,
  Volume2,
  MessageSquare,
  PhoneCall,
  Zap,
  Home,
  History,
  ChevronDown,
  X,
} from "lucide-react";

export default function AppCopy() {
  // --- Navigation & UI State ---
  const [activeTab, setActiveTab] = useState("home");
  const [phoneSubTab, setPhoneSubTab] = useState("dialer");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- Call Logic State ---
  const [callStatus, setCallStatus] = useState("available"); // available, connected, busy, offline, lunch, meeting
  const [isMuted, setIsMuted] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [callDuration, setCallDuration] = useState("00:00");
  const [timerInterval, setTimerInterval] = useState(null);

  // --- Input & History State ---
  const [phoneInput, setPhoneInput] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [callHistory, setCallHistory] = useState([]);
  const [isACW, setIsACW] = useState(false);

  // --- Timers State ---
  const [statusSeconds, setStatusSeconds] = useState(0);

  // --- Configuration Data ---
  const statuses = {
    available: {
      label: "Available",
      color: "bg-green-500",
      hover: "hover:bg-green-50",
    },
    offline: {
      label: "Offline",
      color: "bg-gray-500",
      hover: "hover:bg-gray-50",
    },
    lunch: {
      label: "Lunch",
      color: "bg-orange-500",
      hover: "hover:bg-orange-50",
    },
    meeting: {
      label: "Meeting",
      color: "bg-purple-500",
      hover: "hover:bg-purple-50",
    },
    busy: {
      label: "Busy (ACW)",
      color: "bg-blue-500",
      hover: "hover:bg-blue-50",
    },
  };

  const quickConnects = [
    { name: "Sales Team", number: "+1 (555) 100-0001" },
    { name: "Technical Support", number: "+1 (555) 100-0002" },
    { name: "Manager", number: "+1 (555) 100-0003" },
  ];

  // --- Effect: Status Timer ---
  useEffect(() => {
    setStatusSeconds(0);
    const interval = setInterval(() => {
      setStatusSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

  // --- Effect: Outside Click for Dropdown ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsStatusOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Call Functions ---
  const startCall = (name, number) => {
    setCallStatus("connected");
    setContactName(name);
    setContactNumber(number);
    setPhoneInput("");

    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setCallDuration(
        `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`,
      );
    }, 1000);
    setTimerInterval(interval);
  };

  const endCall = () => {
    if (timerInterval) clearInterval(timerInterval);

    const entry = {
      name: contactName || "Manual Dial",
      number: contactNumber || phoneInput,
      duration: callDuration,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setCallHistory((prev) => [entry, ...prev].slice(0, 5));

    setCallStatus("busy");
    setIsACW(true);

    setTimeout(() => {
      setIsACW(false);
      setCallStatus("available");
      setCallDuration("00:00");
      setContactName("");
      setContactNumber("");
    }, 5000);
  };

  // --- Helpers ---
  const formatTime = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen w-full bg-slate-900 font-sans text-slate-800">
      <div className="w-full h-full bg-white overflow-hidden flex flex-col relative">
        {/* ACW OVERLAY */}
        {isACW && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md z-[110] flex flex-col items-center justify-center text-white text-center">
            <Zap size={64} className="text-yellow-400 animate-pulse mb-4" />
            <h2 className="text-3xl font-bold">After Call Work</h2>
            <p className="text-slate-300 mt-2">
              Wrap up time: Syncing contact data...
            </p>
            <div className="mt-6 w-64 bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-yellow-400 h-full animate-[progress_5s_linear]"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        )}

        {/* HEADER */}
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white flex items-center justify-between shadow-lg">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Amazon Connect CCP
            </h1>
            <div className="flex items-center gap-2 text-xs opacity-80 mt-1">
              <UserCircle size={14} /> <span>Sarah Johnson • Agent</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
                Status Duration
              </p>
              <p className="text-xl font-mono">{formatTime(statusSeconds)}</p>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-all min-w-[150px]"
              >
                <div
                  className={`w-3 h-3 rounded-full ${statuses[callStatus]?.color} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                />
                <span className="font-semibold">
                  {statuses[callStatus]?.label}
                </span>
                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform ${isStatusOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isStatusOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[120] animate-in fade-in slide-in-from-top-2">
                  <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">
                    Set Your Status
                  </p>
                  {Object.entries(statuses).map(([key, val]) => (
                    <button
                      key={key}
                      disabled={key === "busy" || callStatus === "connected"}
                      onClick={() => {
                        setCallStatus(key);
                        setIsStatusOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50 ${callStatus === key ? "bg-blue-50 text-blue-700" : "text-slate-600"} ${key === "busy" || callStatus === "connected" ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${val.color}`}
                      />
                      {val.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings size={22} />
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* NAVIGATION BAR */}
          <nav className="w-20 bg-slate-50 border-r flex flex-col items-center py-6 gap-8">
            <button
              onClick={() => setActiveTab("home")}
              className={`p-3 rounded-xl transition-all ${activeTab === "home" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:bg-slate-200"}`}
            >
              <Home size={24} />
            </button>
            <button
              onClick={() => setActiveTab("phone")}
              className={`p-3 rounded-xl transition-all ${activeTab === "phone" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:bg-slate-200"}`}
            >
              <PhoneCall size={24} />
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`p-3 rounded-xl transition-all ${activeTab === "chat" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:bg-slate-200"}`}
            >
              <MessageSquare size={24} />
            </button>
          </nav>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 flex flex-col bg-white">
            {activeTab === "home" && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <UserCircle size={80} className="text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Welcome, Sarah
                </h2>
                <p className="text-slate-500 mt-2 max-w-sm">
                  You are currently <strong>{callStatus}</strong> and ready to
                  receive contacts.
                </p>
              </div>
            )}

            {activeTab === "phone" && (
              <div className="flex-1 flex flex-col">
                <div className="flex border-b">
                  <button
                    onClick={() => setPhoneSubTab("dialer")}
                    className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${phoneSubTab === "dialer" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:bg-slate-50"}`}
                  >
                    DIALPAD
                  </button>
                  <button
                    onClick={() => setPhoneSubTab("quick")}
                    className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${phoneSubTab === "quick" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:bg-slate-50"}`}
                  >
                    QUICK CONNECTS
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                  {callStatus === "connected" ? (
                    <div className="flex flex-col items-center py-10">
                      <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 animate-pulse">
                        <Phone size={40} />
                      </div>
                      <h3 className="text-2xl font-bold">{contactName}</h3>
                      <p className="text-slate-500">{contactNumber}</p>
                      <p className="text-4xl font-mono font-bold text-blue-600 mt-6">
                        {callDuration}
                      </p>

                      <div className="flex gap-6 mt-12">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-2xl w-24 transition-all ${isMuted ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                        >
                          {isMuted ? <MicOff /> : <Mic />}{" "}
                          <span className="text-xs font-bold">MUTE</span>
                        </button>
                        <button
                          onClick={() => setIsHolding(!isHolding)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-2xl w-24 transition-all ${isHolding ? "bg-orange-50 text-orange-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                        >
                          {isHolding ? <Play /> : <Pause />}{" "}
                          <span className="text-xs font-bold">
                            {isHolding ? "RESUME" : "HOLD"}
                          </span>
                        </button>
                        <button
                          onClick={endCall}
                          className="flex flex-col items-center gap-2 p-4 rounded-2xl w-24 bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-200 transition-all"
                        >
                          <PhoneOff />{" "}
                          <span className="text-xs font-bold">END</span>
                        </button>
                      </div>
                    </div>
                  ) : phoneSubTab === "dialer" ? (
                    <div className="max-w-xs mx-auto">
                      <div className="bg-slate-100 p-4 rounded-2xl mb-6 flex items-center">
                        <input
                          value={phoneInput}
                          readOnly
                          className="bg-transparent text-2xl font-mono w-full text-center outline-none placeholder:text-slate-300"
                          placeholder="000-000-0000"
                        />
                        {phoneInput && (
                          <button
                            onClick={() => setPhoneInput("")}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "*",
                          "0",
                          "#",
                        ].map((num) => (
                          <button
                            key={num}
                            onClick={() => setPhoneInput((prev) => prev + num)}
                            className="h-16 rounded-2xl bg-white border border-slate-200 text-xl font-bold hover:bg-blue-50 hover:border-blue-200 transition-all"
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => startCall("Outbound Call", phoneInput)}
                        disabled={!phoneInput}
                        className="w-full mt-6 py-4 bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-50 transition-all shadow-lg shadow-green-100"
                      >
                        <Phone size={20} /> DIAL NUMBER
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {quickConnects.map((qc) => (
                        <button
                          key={qc.name}
                          onClick={() => startCall(qc.name, qc.number)}
                          className="w-full p-4 bg-white border rounded-2xl flex items-center justify-between group hover:border-blue-600 transition-all"
                        >
                          <div className="text-left">
                            <p className="font-bold text-slate-800">
                              {qc.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {qc.number}
                            </p>
                          </div>
                          <Phone
                            size={18}
                            className="text-slate-300 group-hover:text-blue-600"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400">
                <MessageSquare size={48} className="mb-4 opacity-20" />
                <p>No active chat conversations</p>
              </div>
            )}
          </main>

          {/* SIDEBAR */}
          <aside className="w-72 bg-slate-50 border-l p-6 flex flex-col gap-8">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                Real-time Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    AHT
                  </p>
                  <p className="text-lg font-bold">04:20</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Contacts
                  </p>
                  <p className="text-lg font-bold">12</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <History size={14} className="text-slate-400" />
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Call History
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {callHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">
                    No recent activity
                  </p>
                ) : (
                  callHistory.map((h, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-xs"
                    >
                      <div className="flex justify-between font-bold">
                        <span className="truncate w-32">{h.name}</span>
                        <span className="text-slate-400 font-normal">
                          {h.time}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2 text-slate-500">
                        <span>{h.number}</span>
                        <span className="font-mono text-blue-600">
                          {h.duration}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* FOOTER */}
        <footer className="bg-slate-100 border-t px-6 py-3 flex items-center justify-between text-slate-500 text-xs font-medium">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Wifi size={14} className="text-green-500" /> Latency: 24ms
            </div>
            <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-blue-500" /> Audio: Good
            </div>
          </div>
          <div className="opacity-50">CCP v3.2.0 • Region: us-east-1</div>
        </footer>
      </div>

      {/* GLOBAL STYLES FOR ANIMATION */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
